import Head from "next/head";
import RequestsTable from "../components/RequestsTable";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/user");
    }, 1000);

    return () => {
      clearTimeout();
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "white",
      }}
    >
      <Head>
        <title>Drone Delivery</title>
        <meta
          name="description"
          content="Drone Delivery App for Webathon GC'23"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>Redirecting to Home Page...</main>
    </div>
  );
}
