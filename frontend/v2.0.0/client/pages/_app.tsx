import React, { useEffect } from "react";
import { AppProps } from "next/app";
import "../styles/global.scss";
import { RecoilRoot } from "recoil";
import { Footer } from "../components/Footer";

/**
 * Next.jsでstyled-componentsとMaterialUIがうまく表示されるようにする
 * 全体のラップ
 */
export default function App({ Component, pageProps }: AppProps) {
  // Remove the server-side injected CSS.(https://material-ui.com/guides/server-rendering/)
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <RecoilRoot>
      <h1>栄養診断App v2.0.0</h1>
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  );
}
