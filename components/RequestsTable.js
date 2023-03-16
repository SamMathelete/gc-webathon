import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const RequestsTable = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests([
      {
        id: "1",
        name: "John Doe",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        phone: "123-456-7890",
      },
    ]);
  }, []);

  const approveRequest = (id) => {
    console.log("Approve request with id: " + id);
  };

  const rejectRequest = (id) => {
    console.log("Reject request with id: " + id);
  };

  const ApproveButton = (params) => {
    return (
      <Button
        variant="contained"
        color="success"
        onClick={approveRequest(params.id)}
      >
        Approve
      </Button>
    );
  };

  const RejectButton = (params) => {
    return (
      <Button
        variant="contained"
        color="error"
        onClick={rejectRequest(params.id)}
      >
        Reject
      </Button>
    );
  };

  const columns = [
    { field: "id", headerName: "Sl. No.", width: 80 },
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
      field: "approve",
      headerName: "Approve",
      width: 120,
      renderCell: ApproveButton,
    },
    {
      field: "reject",
      headerName: "Reject",
      width: 120,
      renderCell: RejectButton,
    },
  ];

  const rows = requests;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 670,
        margin: 10,
        width: "80vw",
        paddingTop: 5,
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
        Delivery Requests
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

export default RequestsTable;
