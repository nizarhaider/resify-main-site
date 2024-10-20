import type { AppProps } from "next/app";
import "../styles/globals.css";
import PlausibleProvider from "next-plausible";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <PlausibleProvider domain="resify.xyz" />
    </>
  );
}

export default MyApp;
