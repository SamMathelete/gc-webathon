import Head from "next/head";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div>
      <Head>
        <title>Drone Delivery</title>
        <meta
          name="description"
          content="Drone Delivery App for Webathon GC'23"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </div>
  );
}
