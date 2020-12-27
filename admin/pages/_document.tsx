import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <html>
                <Head>
                    <meta name="theme-color" content="#ff0000" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="viewport" content="width=device-width,initial-scale=1" />
                    <style>{`html,body { margin: 0; padding: 0; }`}</style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}