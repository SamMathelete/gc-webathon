import { Box } from "@mui/system";
import PackageHistoryTable from "../../components/PackageHistoryTable";
import RequestsTable from "../../components/RequestsTable";

const AdminHome = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#acfae3",
      }}
    >
      <RequestsTable />
      <PackageHistoryTable />
    </Box>
  );
};

export default AdminHome;
