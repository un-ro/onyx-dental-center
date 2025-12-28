// next-sitemap.config.mjs
export default {
    siteUrl: 'https://onyxdentalcenter.id',
    generateRobotsTxt: true,
    additionalPaths: async () => {
        // Helper function for retry logic
        const fetchWithRetry = async (url, options, maxRetries = 3) => {
            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout per attempt

                    const response = await fetch(url, {
                        ...options,
                        signal: controller.signal,
                    });

                    clearTimeout(timeoutId);
                    return response;
                } catch (error) {
                    console.warn(`Attempt ${attempt}/${maxRetries} failed:`, error.message);
                    
                    if (attempt === maxRetries) {
                        throw error;
                    }
                    
                    // Exponential backoff: wait 1s, 2s, 4s between retries
                    const delay = Math.pow(2, attempt - 1) * 1000;
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        };

        try {
            console.log('Fetching blog posts for sitemap generation...');
            
            const response = await fetchWithRetry('https://api.onydentalcenter.id/api/public/posts?status=published', {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'next-sitemap/1.0',
                },
            });

            if (!response.ok) {
                console.warn(`API returned ${response.status}: ${response.statusText}. Continuing without dynamic blog paths.`);
                return [];
            }

            const blogs = await response.json();

            if (!blogs?.data?.length) {
                console.log('No published blogs found, continuing without dynamic blog paths.');
                return [];
            }

            console.log(`Successfully fetched ${blogs.data.length} blog posts for sitemap.`);
            
            return blogs.data.map(blog => ({
                loc: `/blogs/${blog.slug}`,
                lastmod: blog.updatedAt,
                changefreq: 'daily',
                priority: 0.7,
            }));
        } catch (error) {
            if (error.name === 'AbortError') {
                console.warn('Blog fetch timed out after all retry attempts. Continuing without dynamic blog paths.');
            } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
                console.warn('Network connectivity issue during sitemap generation. Continuing without dynamic blog paths.');
            } else {
                console.warn('Unexpected error fetching blogs for sitemap:', error.message, 'Continuing without dynamic blog paths.');
            }
            return [];
        }
    },
};
