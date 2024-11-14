import Link from "next/link";
import Github from "./GitHub";
import Script from "next/script";

export default function Header() {
  return (
    <header className="flex justify-center items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-NJXE71TQ9Z`}
        />

        <Script strategy="lazyOnload">
          {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-NJXE71TQ9Z', {
                      page_path: window.location.pathname,
                      });
                  `}
        </Script>
      <Link href="/" className="flex space-x-3 items-center">
        <img
          alt="header text"
          src="/write.svg"
          className="sm:w-9 sm:h-9 w-8 h-8"
        />
        <h1 className="sm:text-3xl text-2xl font-bold ml-2 tracking-tight">
          Resify.ai
        </h1>
      </Link>
    </header>
  );
}
