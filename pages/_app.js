import "../styles/normalize.css";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {

    

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration:2000
        }}
      />

      
      <Component {...pageProps} />;
    </>
  );
}
