import { Modal, Box, IconButton, Icon, Typography, Grid, Paper } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { historyModalState } from "../../../atoms/historyModalAtom";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import { LocationContext } from "../../../store/location-context";

const HistoryModal = ({order}) => {
  const [modalState, setModalState] = useRecoilState(historyModalState);
  const handleClose = () => {
    setModalState((state) => ({ ...state, open: false }));
  };
  return (
    <Modal
      open={modalState.open}
      onClose={handleClose}
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        margin: "50px",
        width: "60%",
      }}
    >
      
      <Grid container>
      <Grid item xs={12}>
        <Typography variant="h3" component="h1" align="center" sx={{fontWeight: "700", textAlign: "center", fontSize: "20 px", color:"black", background: "#FFC600", borderTopLeftRadius: "15px", borderTopRightRadius: "15px", paddingY: "10px"}}>
            Order Details
        </Typography>
        <Paper elevation={3} sx={{borderTopLeftRadius: "0px", borderTopRightRadius: "0px", borderBottomLeftRadius: "15px", borderBottomRightRadius: "15px", padding: "10px"}}>
          <Typography variant="h4" component="h5" gutterBottom sx={{fontWeight: "800", fontSize: "28px"}}>
            Order : {order.package}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{fontWeight: "bold", fontSize: "20px"}}>
            Name: {order.name}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{fontWeight: "bold", fontSize: "20px"}}>
            Address: {order.address}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{fontWeight: "bold", fontSize: "20px"}}>
            City: {order.city}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{fontWeight: "bold", fontSize: "20px"}}>
            State/Zip: {order.stateZip}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{fontWeight: "bold", fontSize: "20px"}}>
            Phone: {order.phone}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{fontWeight: "bold", fontSize: "20px"}}>
            Status:
          </Typography>
          <Box
            component="span"
            sx={{
                  display: 'inline-block',
                  px: 1,
                  py: '2px',
                  borderRadius: '20px',
                  color: 'white',
                  paddingX: '20px',
                  bgcolor: order.status === 'Delivered' ? '#54B435' : '#FDB100'
                
                }}
          >
            <Typography variant="body1" sx={{fontSize: "20px"}}>
            {order.status}
          </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
    </Modal>
  );
};

export default HistoryModal;
