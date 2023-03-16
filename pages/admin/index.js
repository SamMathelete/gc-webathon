import { Box } from "@mui/system";
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
    </Box>
  );
};

export default AdminHome;
