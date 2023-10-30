"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
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
  // const router = useRouter();

  // useEffect(() => {
  //   const unsubscribe = router.subscribe(
  //     "routeChangeComplete",
  //     ({ url }: any) => {
  //       ga.pageview(url);
  //     }
  //   );
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [router]);

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

        {/* Google Analytics */}
        {/* {ga.GA_TRACKING_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${ga.GA_TRACKING_ID}`}
            ></script>
            <script>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga.GA_TRACKING_ID}');
              `}
            </script>
          </>
        )} */}
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
