import { IndexLayout } from "</components/layout/Layout>";
import { wrapper } from "</store/store>";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/globals.css";

const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <IndexLayout>
        <Component {...pageProps} />
      </IndexLayout>
    </Provider>
  );
};
export default MyApp;
