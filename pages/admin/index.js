import { Box } from "@mui/system";
import PackageHistoryTable from "../../components/DeliveryHistory/PackageHistoryTable";
import RequestsTable from "../../components/DeliveryRequests/RequestsTable";
import AdminMap from "../../components/AdminMap/AdminMap";
import NavBar from "../../components/Navbar/Navbar";
import { Typography } from "@mui/material";
import ActiveDeliveries from "../../components/ActiveDeliveries/ActiveDeliveries";

const AdminHome = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "white",
      }}
    >
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
      <Box sx={{ display: "flex", flexDirection: "row", marginBottom: "5px" }}>
        <AdminMap />

        <RequestsTable />
      </Box>
      <ActiveDeliveries />
      <PackageHistoryTable />
    </Box>
  );
};

export default AdminHome;
