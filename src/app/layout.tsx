import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Script from "next/script";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import * as ga from "../utils/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgentInsights",
  description: ".",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, 'clarity', 'script', "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
        `,
          }}
        ></script>
        {/* Google Tag Manager - Global base code */}
        <Script
          id="google-tag-manager" // An ID is required for scripts with the `dangerouslySetInnerHTML` prop.
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      (function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-WRH23H6W');
    `,
          }}
        />

        {/* Google tag (gtag.js) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID}',{
                  page_path: window.location.pathname,
                });
                `,
          }}
        />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id='${process.env.NEXT_PUBLIC_GOOGLE_ADS_ANALYTICS_ID}'}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ANALYTICS_ID}'}',{
                  page_path: window.location.pathname,
                });
                `,
          }}
        />
      </head>
      <body className={inter.className}>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WRH23H6W"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
