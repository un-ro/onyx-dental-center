// ponytail: inline script is the only per-route <html lang> override without splitting root layouts
export default function HtmlLang({ lang }: { lang: string }) {
  return <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang=${JSON.stringify(lang)}` }} />;
}
