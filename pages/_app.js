import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import LocationContextProvider from "../store/location-context";
import { messaging } from "../firebase/clientApp";
import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import AuthContextProvider from "../store/auth-context";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const check = async () => {
      const msg = await messaging();
      onMessage(msg, (payload) => {
        console.log("Message received. ", payload);
        new Notification(payload.notification.title, {
          body: payload.notification.body,
        });
      });
    };
    check();
  }, []);
  return (
    <AuthContextProvider>
      <LocationContextProvider>
        <RecoilRoot>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </LocationContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
