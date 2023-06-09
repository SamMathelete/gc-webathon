import { Box } from "@mui/system";
import NavBar from "../../components/Navbar/UserNavbar";
import { Typography } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Modal from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import { AuthContext } from "../../store/auth-context";
import { getDocs, collection, where } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";

const History = () => {
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const [activeHistory, setActiveHistory] = useState([]);
  const [pastHistory, setPastHistory] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleOrder = (orderpackage) => {
    // Add your code here to handle the tracking functionality
    console.log(`Tracking order ${orderpackage}`);
  };

  const fetchActiveHistory = async () => {
    const querySnapshot = await getDocs(
      collection(firestore, "active-deliveries")
    );
    const activeHistoryArray = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === user.uid) {
        activeHistoryArray.push({
          id: doc.id,
          package: doc.id.slice(0, 5),
          name: doc.data().name,
          address: doc.data().destinationCity,
          status: "Processing",
        });
      }
    });
    setActiveHistory(activeHistoryArray);
  };

  const fetchPastHistory = async () => {
    const querySnapshot = await getDocs(
      collection(firestore, "past-deliveries")
    );
    const pastHistoryArray = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === user.uid) {
        pastHistoryArray.push({
          id: doc.id,
          package: doc.id.slice(0, 5),
          name: doc.data().name,
          address: doc.data().destinationCity,
          status: "Delivered",
        });
      }
    });
    setPastHistory(pastHistoryArray);
  };

  useEffect(() => {
    fetchActiveHistory();
    fetchPastHistory();
  }, []);

  const allOrders = [...activeHistory, ...pastHistory];

  const [orders, setOrders] = useState([
    {
      id: "1",
      package: "12345",
      name: "John Doe",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      phone: "123-456-7890",
      status: "Delivered",
    },
    {
      id: "2",
      package: "67890",
      name: "Jane Smith",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      phone: "123-456-7890",
      status: "Processing",
    },
    {
      id: "3",
      package: "24680",
      name: "Bob Johnson",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      phone: "123-456-7890",
      status: "Processing",
    },
    {
      id: "4",
      package: "13579",
      name: "Alice Brown",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      phone: "123-456-7890",
      status: "Delivered",
    },
    {
      id: "5",
      package: "86420",
      name: "Mark Davis",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      phone: "123-456-7890",
      status: "Processing",
    },
    {
      id: "5",
      package: "86420",
      name: "Martin luther",
      address: "728 san suiden street",
      city: "San Francisco",
      state: "CA",
      zip: "12345",
      phone: "123-456-7890",
      status: "Processing",
    },
  ]);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          backgroundColor: "#232323",
          borderRadius: "15px",
        }}
      >
        <Typography
          sx={{
            fontSize: "24pt",
            fontWeight: 600,
            color: "white",
            marginTop: "40px",
            marginLeft: "20px",
            alignSelf: "center",
          }}
        >
          Packages History
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            backgroundColor: "#000000",
            borderRadius: "20px",
            marginY: "20px",
            marginX: "40px",
            paddingTop: "15px",
            paddingBottom: "7px",
            paddingX: "7px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              marginX: "25px",
            }}
          >
            <Typography
              variant="h6"
              sx={{ flex: "0 0 20%", color: "#ffffff", fontWeight: "bold" }}
            >
              Order No.
            </Typography>
            <Typography
              variant="h6"
              sx={{ flex: "0 0 40%", color: "#ffffff", fontWeight: "bold" }}
            >
              Name
            </Typography>
            <Typography
              variant="h6"
              sx={{ flex: "0 0 20%", color: "#ffffff", fontWeight: "bold" }}
            >
              Address
            </Typography>
            <Typography
              variant="h6"
              sx={{
                flex: "0 0 20%",
                color: "#ffffff",
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              Status
            </Typography>
          </Box>
          <List
            sx={{
              bgcolor: "#ffffff",
              borderRadius: "17px",
              overflow: "hidden",
            }}
          >
            {allOrders.map((order) => (
              <ListItemButton
                key={order.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  borderRadius: "15px",
                }}
                onClick={() => {
                  console.log(order.package);
                }}
                divider={true}
              >
                <Box sx={{ flex: "0 0 20%" }}>
                  <ListItemText
                    primary={`Order No. ${order.package}`}
                    primaryTypographyProps={{ fontWeight: "600" }}
                  />
                </Box>
                <Box sx={{ flex: "0 0 40%" }}>
                  <ListItemText
                    primary={order.name}
                    primaryTypographyProps={{
                      fontWeight: "900",
                      fontSize: "20px",
                    }}
                  />
                </Box>
                <Box sx={{ flex: "0 0 20%" }}>
                  <ListItemText
                    primary={order.address}
                    secondary={order.city}
                    primaryTypographyProps={{ fontWeight: "600" }}
                  />
                </Box>
                <Box sx={{ flex: "0 0 20%", textAlign: "right" }}>
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      px: 1,
                      py: "2px",
                      borderRadius: "20px",
                      color: "white",
                      paddingX: "20px",
                      bgcolor:
                        order.status === "Delivered" ? "#54B435" : "#FDB100",
                    }}
                  >
                    <ListItemText
                      primary={order.status}
                      primaryTypographyProps={{ fontWeight: "600" }}
                    />
                  </Box>
                </Box>
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default History;
