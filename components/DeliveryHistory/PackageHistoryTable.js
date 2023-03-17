import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { firestore as db } from "../../firebase/clientApp";

const PackageHistoryTable = () => {
  const [activeHistory, setActiveHistory] = useState([]);
  const [pastHistory, setPastHistory] = useState([]);

  const fetchActiveHistory = async () => {
    const querySnapshot = await getDocs(collection(db, "active-deliveries"));
    const activeHistoryArray = [];
    querySnapshot.forEach((doc) => {
      activeHistoryArray.push({
        id: doc.id,
        package: doc.id.slice(0, 5),
        name: doc.data().name,
        address: doc.data().destinationCity,
        status: "Processing",
      });
    });
    setActiveHistory(activeHistoryArray);
  };

  const fetchPastHistory = async () => {
    const querySnapshot = await getDocs(collection(db, "past-deliveries"));
    const pastHistoryArray = [];
    querySnapshot.forEach((doc) => {
      pastHistoryArray.push({
        id: doc.id.slice(0, 5),
        package: doc.id.slice(0, 5),
        name: doc.data().name,
        address: doc.data().destinationCity,
        status: "Delivered",
      });
    });
    setPastHistory(pastHistoryArray);
  };

  useEffect(() => {
    fetchActiveHistory();
    fetchPastHistory();
  }, []);

  const history = [...activeHistory, ...pastHistory];

  const columns = [
    {
      field: "id",
      headerName: "Package Number",
      flex: 2,
    },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "address", headerName: "Address", flex: 3 },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];

  const rows = history;

  return (
    <div id="history">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: 600,
          marginTop: "15px",
          marginLeft: "20px",
          marginRight: "20px",
          marginBottom: "15px",
          width: "97.2vw",
          paddingTop: 2,
          borderRadius: 5,
          backgroundColor: "black",
        }}
      >
        <Typography
          style={{
            textAlign: "center",
            fontSize: 30,
            color: "white",
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Package History
        </Typography>
        <Paper
          elevation={4}
          style={{
            height: 600,
            width: "100%",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </Paper>
      </Box>
    </div>
  );
};

export default PackageHistoryTable;
