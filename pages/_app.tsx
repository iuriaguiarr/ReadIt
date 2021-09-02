import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import * as gtag from "@lib/gtag";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "@styles/global/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
