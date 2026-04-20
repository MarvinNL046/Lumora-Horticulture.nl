import Script from 'next/script'

export default function MicrosoftClarity() {
  return (
    // lazyOnload: Clarity's session recording is non-critical for first paint.
    // Deferring frees ~200–400ms of main-thread work which was tanking INP
    // (Clarity showed 2276ms; target <200ms).
    <Script id="microsoft-clarity" strategy="lazyOnload">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "ud6vynhzpy");
      `}
    </Script>
  )
}
