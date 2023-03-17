import { Box } from "@mui/system";
import PackageHistoryTable from "../../components/DeliveryHistory/PackageHistoryTable";
import RequestsTable from "../../components/DeliveryRequests/RequestsTable";
import AdminMap from "../../components/AdminMap/AdminMap";
import NavBar from "../../components/Navbar/Navbar";
import { Typography } from "@mui/material";
import ActiveDeliveries from "../../components/ActiveDeliveries/ActiveDeliveries";

const AdminHome = () => {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          backgroundColor: "#232323",
        }}
      >
        <Typography
          sx={{
            // fontSize: "24pt",
            // fontWeight: 600,
            // // color: "black",
            // color:"#efefef",
            fontFamily: "inherit",
            marginTop: "40px",
            marginLeft: "20px",
            marginRight: "20px",

            fontWeight: "400",
            fontSize: "50px",
            letterSpacing: "-0.01em",
            lineHeight: "75px",
            textAlign: "left",
            color: "#efefef",
            borderBottom: "1px solid #efefef98",
          }}
        >
          Dashboard
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "row", marginBottom: "5px" }}
        >
          <AdminMap />

          <ActiveDeliveries />
        </Box>
        <PackageHistoryTable />
        <RequestsTable />
      </Box>
    </>
  );
};

export default AdminHome;
