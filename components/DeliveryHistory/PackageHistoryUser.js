import {  Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const PackageHistoryUser = () => {
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

  const rows = history;

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
        <DataGrid rows={rows} columns={columns} pageSize={5} style={{alignSelf: "center"}}/>
      </Paper>
    </Box>
  );
};

export default PackageHistoryUser;