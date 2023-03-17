import { Box } from "@mui/system";
import PackageHistoryTable from "../../components/DeliveryHistory/PackageHistoryTable";
import RequestsTable from "../../components/DeliveryRequests/RequestsTable";
import AdminMap from "../../components/AdminMap/AdminMap";
import { Typography } from "@mui/material";

const AdminHome = () => {
  return (
  <>
      <NavBar />
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
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <AdminMap />

        <RequestsTable />
      </Box>

      <PackageHistoryTable />
    </Box>
    </>
  );
};

export default AdminHome;
