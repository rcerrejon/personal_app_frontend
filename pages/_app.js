import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../src/store';
import Layout from '../src/App'

export default withRedux(initStore, { debug: false })(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {})
        }
      };
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
      );
    }
  }
);
