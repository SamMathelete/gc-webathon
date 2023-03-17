import style from "../../styles/User.module.css";
import Link from "next/link";
import { Box } from "@mui/system";
import NavBar from "../../components/Navbar/UserNavbar";
import UserMap from "../../components/DeliveryHistory/UserMap/UserMap";
import ContactForm from "../../components/UserRequest/contact-form";

const RequestDelivery = () => {
  return (
    <>
      <NavBar />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <UserMap />

        <ContactForm />
      </Box>
    </>
  );
};

export default RequestDelivery;
