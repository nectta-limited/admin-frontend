import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import { Kanit } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "@/store";

const kanit = Kanit({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <style jsx global>
        {`
          :root {
            --font-kanit: ${kanit.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <ToastContainer />
      </ChakraProvider>
    </Provider>
  );
}
