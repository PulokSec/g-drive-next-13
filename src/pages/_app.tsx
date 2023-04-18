
import { wrapper } from "</store/store>";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import '../styles/globals.css';
import Header from "</components/layout/Header>";

const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Header/>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;