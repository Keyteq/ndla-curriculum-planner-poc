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
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div data-portal-root />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default NDLADoc;
