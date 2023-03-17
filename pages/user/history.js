import { Box } from "@mui/system";
import PackageHistoryUser from "../../components/DeliveryHistory/PackageHistoryUser";
import RequestsTable from "../../components/DeliveryRequests/RequestsTable";
import AdminMap from "../../components/AdminMap/AdminMap";
import NavBar from "../../components/Navbar/Navbar";
import { Typography } from "@mui/material";
import ActiveDeliveries from "../../components/ActiveDeliveries/ActiveDeliveries";

const History = () => {
  return (
    <>
    <NavBar />
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "#1f1f1f",
      }}
    >
      <Typography
        sx={{
          fontSize: "24pt",
          fontWeight: 600,
          color: "white",
          marginTop: "40px",
          marginLeft: "20px",
          alignSelf: "center",
        }}
      >
        Packages History
      </Typography>
      <PackageHistoryUser />
    </Box>
    </>
  );
};

export default History;
