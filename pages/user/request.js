import style from "../../styles/User.module.css";
import Link from "next/link";
import { Box } from "@mui/system";
import NavBar from "../../components/Navbar/UserNavbar";
import AdminMap from "../../components/AdminMap/AdminMap";
import ContactForm from "../../components/UserRequest/contact-form";

const RequestDelivery = () => {
  return (
    <>
      <NavBar />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <AdminMap />

        <ContactForm />
      </Box>
    </>
  );
};

export default RequestDelivery;
