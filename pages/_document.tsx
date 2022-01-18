import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "@lib/gtag";
import { ColorModeScript, theme } from "@chakra-ui/react";
import { useEffect } from "react";

export default class MyDocument extends Document {
  render() {
    useEffect(() => {
      (function (I, n, f, o, b, i, p) {
        I[b] =
          I[b] ||
          function () {
            (I[b].q = I[b].q || []).push(arguments);
          };
        I[b].t = 1 * new Date();
        i = n.createElement(f);
        i.async = 1;
        i.src = o;
        p = n.getElementsByTagName(f)[0];
        p.parentNode.insertBefore(i, p);
      })(
        window,
        document,
        "script",
        "https://webpush.infobip.com/bundle-latest.js",
        "infobipWebPush"
      );

      infobipWebPush("init", {
        applicationCode:
          "589d52734db72e41f906aa7e12c1f147-0d5c1765-674a-4a84-b62c-1743bded5ebf",
        vapidPublicKey:
          "BDSma6xB8OWVcqSFG1RfO1tnEnuBqb1N0uysBMjCvs0dIbV4vQdQq76yUaGstlLs9kjKcS8s4dJMWHXmC61gIYU=",
        optIn: {
          autostart: true,
        },
      });

      (function (e, t, n, o) {
        e.PeopleEventsObject = o;
        e[o] = e[o] || {
          init: function (t) {
            e[o].apiKey = t;
          },
          setPerson: function (t, n) {
            e[o].person = t;
            e[o].personTtl = n;
          },
          forgetPerson: function () {
            e[o].toForgetPerson = true;
          },
          track: function () {
            (e[o].q = e[o].q || []).push(arguments);
          },
          updatePerson: function (t) {
            e[o].personToUpdate = { person: t };
          },
          appendToList: function (t, n) {
            e[o].attributeToAppend = { attributeName: t, attribute: n };
          },
        };
        var r = t.createElement("script");
        var s = t.getElementsByTagName("script")[0];
        r.async = 1;
        r.src = n;
        s.parentNode.insertBefore(r, s);
      })(
        window,
        document,
        "https://s3.eu-central-1.amazonaws.com/portal-cdn-production/people-events-sdk/pe.latest-2.js",
        "pe"
      );

      pe.init(
        "1b08d04cc472a1ba91664979dfab89a0-ae18afc2-c8ce-4f27-a323-af8e11b371cf"
      );

      pe.setPerson({ email: "iuri.aguiar@tld.com.br" }, 2000);
    }, []);

    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-PPCCJZ8');`,
            }}
          ></script>
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
