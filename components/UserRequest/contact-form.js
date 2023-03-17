import { useState } from "react";
import Image from "next/image";
import { GrMapLocation } from "react-icons/gr";
import Icon from "@mdi/react";
import { mdiQuadcopter } from "@mdi/js";
import style from "../../styles/Request.module.css";
import Script from "next/script";

export default function Fetch() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    // This will prevent page refresh
    e.preventDefault();

    // replace this with your own unique endpoint URL
    fetch("https://formcarry.com/s/V4vJoJx6AM", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: email, message: message }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          setSubmitted(true);
        } else {
          setError(res.message);
        }
      })
      .catch((error) => setError(error));
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (submitted) {
    return <p>We have received your message, thank you for contacting us!</p>;
  }

  return (
    <>
      <Script src="/components/UserRequest/location.js" strategy="worker" />
      <div className={style.container}>
        <div className={style.formWrapper}>
          <div className={style.formIntroduction}>
            <h1>Delivery Details</h1>
          </div>

          <section className={style.formcarryContainer}>
            <form
              action="https://formcarry.com/s/V4vJoJx6AM"
              method="POST"
              target="_blank"
              enctype="multipart/form-data"
            >
              <div className={style.formcarryBlock}>
                <label for="fc-generated-1-name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="fc-generated-1-name"
                  placeholder="Your first and last name"
                />
              </div>

              <div className={style.formcarryBlock}>
                <label for="fc-generated-1-email">Your Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="fc-generated-1-email"
                  placeholder="john@doe.com"
                />
              </div>

              <div className={style.formcarryBlock}>
                <label for="fc-generated-1-phone">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  id="fc-generated-1-phone"
                  placeholder="Enter your phone number..."
                />
              </div>

              <div className={style.formcarryBlock}>
                <label for="fc-generated-1-location">
                  Pickup Location{" "}
                  <a
                    className={style.setLocation}
                    title="Set location on map"
                    href="#"
                  >
                    <GrMapLocation />
                  </a>
                </label>
                <input
                  type="text"
                  name="location"
                  id="fc-generated-1-location"
                  placeholder="Enter your location..."
                />
                {/* <button type="button" onclick="getLocation()">Try It</button> */}
              </div>

              <div className={style.formcarryBlock}>
                <label for="fc-generated-1-location">
                  Destination Location{" "}
                  <a
                    className={style.setLocation}
                    title="Set location on map"
                    href="#"
                  >
                    <GrMapLocation />
                  </a>
                </label>
                <input
                  type="text"
                  name="location"
                  id="fc-generated-1-location"
                  placeholder="Enter your location..."
                />
                {/* <button type="button" onclick="getLocation()">Try It</button> */}
              </div>

              {/* <div className={style.formcarryBlock}>
                <label for="fc-generated-1-message">Your message</label>
                <textarea
                  name="message"
                  id="fc-generated-1-message"
                  placeholder="Enter your message..."
                ></textarea>
              </div> */}

              <div className={style.formcarryBlock}>
                <button type="submit">Request</button>
              </div>

              {/* <a id={style.fcNotice} href="https://formcarry.com/">
                <span>Forms by</span>
                <img
                  src="https://carrier.formcarry.com/templates/common/formcarry_footer_logo.svg"
                  width="113"
                  height="20"
                />
              </a> */}
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
