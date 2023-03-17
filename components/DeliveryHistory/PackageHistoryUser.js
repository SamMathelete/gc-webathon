import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { getDocs, collection, where } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";

const PackageHistoryUser = () => {
  const [activeHistory, setActiveHistory] = useState([]);
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;

  const fetchDeliveryHistory = async () => {
    const querySnapshot = await getDocs(
      collection(firestore, "active-deliveries")
    );
    const activeHistoryArray = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === user.uid) {
        activeHistoryArray.push({
          id: doc.id,
          name: doc.data().name,
          address: doc.data().destinationCity,
          status: "Processing",
        });
      }
    });
    setActiveHistory(historyArray);
  };

  useEffect(() => {
    setHistory([
      {
        id: "1",
        package: "1A334423",
        name: "John Doe",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        phone: "123-456-7890",
        status: "Delivered",
        uid: "123",
      },
    ]);
  }, []);

  const columns = [
    {
      field: "package",
      headerName: "Package Number",
      width: 400,
    },
    { field: "name", headerName: "Name", width: 400 },
    // { field: "address", headerName: "Address", width: 180 },
    // { field: "city", headerName: "City", width: 120 },
    // { field: "state", headerName: "State", width: 120 },
    // { field: "zip", headerName: "Zip", width: 100 },
    // {
    //   field: "phone",
    //   headerName: "Phone",
    //   width: 130,
    // },
    {
      field: "status",
      headerName: "Status",
      width: 400,
    },
  ];

  const rows = history.filter((item) => item.uid === user.uid);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
        width: "80",
        borderRadius: 5,
        backgroundColor: "#1f1f1f",
        border: "7px solid #FFC600",
      }}
    >
      <Paper
        elevation={4}
        style={{
          height: 600,
          width: "100%",
          borderRadius: 10,
          overflow: "hidden",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          style={{ alignSelf: "center" }}
        />
      </Paper>
    </Box>
  );
};

export default PackageHistoryUser;
