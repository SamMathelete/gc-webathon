import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const PackageHistoryTable = () => {
  const [history, setHistory] = useState([]);

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
      },
    ]);
  }, []);

  const columns = [
    { field: "id", headerName: "Sl. No.", width: 80 },
    {
      field: "package",
      headerName: "Package Number",
      width: 150,
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "address", headerName: "Address", width: 180 },
    { field: "city", headerName: "City", width: 120 },
    { field: "state", headerName: "State", width: 120 },
    { field: "zip", headerName: "Zip", width: 100 },
    {
      field: "phone",
      headerName: "Phone",
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
  ];

  const rows = history;

  return (
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
        width: "80vw",
        paddingTop: 2,
        borderRadius: 5,
        backgroundColor: "#79e3f7",
      }}
    >
      <Typography
        style={{
          textAlign: "center",
          fontSize: 30,
          color: "black",
          marginBottom: 10,
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
  );
};

export default PackageHistoryTable;
