import { Box } from "@mui/system";
import Image from "next/image";
import Admin from "../../assets/Admin-rafiki.svg";
import style from "../../styles/User.module.css";
import PackageHistoryTable from "../../components/DeliveryHistory/PackageHistoryTable";
import RequestsTable from "../../components/DeliveryRequests/RequestsTable";
import AdminMap from "../../components/AdminMap/AdminMap";
import NavBar from "../../components/Navbar/Navbar";
import { Typography } from "@mui/material";
import ActiveDeliveries from "../../components/ActiveDeliveries/ActiveDeliveries";

import { auth } from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const AdminHome = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      <NavBar />
      <div style={{ flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            backgroundColor: "#232323",
            flex: 1,
          }}
        >
          {!user && (
            <>
              <div className={style.heroSection}>
                <div className={style.containerHero}>
                  <div className={style.contentHero}>
                    <div className={style.leftSide}>
                      <h1>Hello there Admin!</h1>
                      <p>
                        Login with your official email address or username and
                        password to access the admin dashboard. Let us control
                        the drones!
                      </p>
                    </div>

                    <div className={style.rightSide}>
                      <Image src={Admin} layout="fill" />
                    </div>
                  </div>
                </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          backgroundColor: "white",
        }}
      >
        {!user && (
          <>
            <div className={style.heroSection}>
              <div className={style.containerHero}>
                <div className={style.contentHero}>
                  <div className={style.leftSide}>
                    <h1>Hello there Admin!</h1>
                    <p>
                      Login with your official email address or username and
                      password to access the admin dashboard. Let us control the
                      drones!
                    </p>
                  </div>

                  <div className={style.rightSide}>
                    <Image src={Admin} layout="fill" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {user && (
          <>
            <Typography
              sx={{
                fontSize: "24pt",
                fontWeight: 600,
                color: "black",
                marginTop: "40px",
                marginLeft: "20px",
              }}
            >
              Dashboard
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "5px",
              }}
            >
              <AdminMap />

              <RequestsTable />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "5px",
              }}
            >
              <ActiveDeliveries />
              <PackageHistoryTable />
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default AdminHome;
