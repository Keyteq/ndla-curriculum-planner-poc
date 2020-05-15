import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class NDLADoc extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const globals = `window.__GLOBALS__ = JSON.parse('${JSON.stringify({
      API_URL: process.env.API_URL,
    })}')`;

    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div data-portal-root />
          <NextScript />
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: globals }} />
        </body>
      </Html>
    );
  }
}

export default NDLADoc;
