import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Generate your next Website portfolio in seconds."
          />
          <meta property="og:site_name" content="resify.ai" />
          <meta
            property="og:description"
            content="Generate your next Website portfolio in seconds."
          />
          <meta property="og:title" content="Resume to Website Converter" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Resume to Website Converter" />
          <meta
            name="twitter:description"
            content="Generate your next Website portfolio in seconds."
          />
          <meta
            property="og:image"
            content="https://twitterbio.io/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://twitterbio.io/og-image.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
