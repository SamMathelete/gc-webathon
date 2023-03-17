import { useContext, useRef } from "react";
import { GrMapLocation } from "react-icons/gr";
import style from "../../styles/Request.module.css";
import Script from "next/script";
import { LocationContext } from "../../store/location-context";
import { AuthContext } from "../../store/auth-context";
import { setDoc, doc, GeoPoint } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";

export default function Fetch() {
  const mapCtx = useContext(LocationContext);
  const authCtx = useContext(AuthContext);
  console.log(mapCtx);

  const fullNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const pickUpRef = useRef();
  const dropOffRef = useRef();
  const sourceCityRef = useRef();
  const destinationCityRef = useRef();
  const weightRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = fullNameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPhone = phoneRef.current.value;
    const enteredPickUpCity = sourceCityRef.current.value;
    const enteredDropOffCity = destinationCityRef.current.value;
    const enteredWeight = weightRef.current.value;

    const data = {
      name: enteredName,
      email: enteredEmail,
      phone: enteredPhone,
      source: new GeoPoint(
        mapCtx.pickupLocation.latitude,
        mapCtx.pickupLocation.longitude
      ),
      sourceCity: enteredPickUpCity,
      destinationCity: enteredDropOffCity,
      destination: new GeoPoint(
        mapCtx.dropoffLocation.latitude,
        mapCtx.dropoffLocation.longitude
      ),
      uid: authCtx.user.uid,
      weight: enteredWeight,
    };

    await setDoc(doc(firestore, "delivery-requests", authCtx.user.uid), data);

    fullNameRef.current.value = "";
    emailRef.current.value = "";
    phoneRef.current.value = "";
    pickUpRef.current.value = "";
    dropOffRef.current.value = "";

    alert("Your request has been submitted!");
  };

  return (
    <>
      <Script src="/components/UserRequest/location.js" strategy="worker" />
      <div className={style.container}>
        <div className={style.formWrapper}>
          <div className={style.formIntroduction}>
            <h1>Delivery Details</h1>
          </div>

          <section className={style.formcarryContainer}>
            <form onSubmit={submitHandler}>
              <div className={style.formcarryBlock}>
                <label for="fc-generated-1-name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  ref={fullNameRef}
                  id="fc-generated-1-name"
                  placeholder="Your first and last name"
                />
              </div>

              <div className={style.formcarryBlock}>
                <label for="fc-generated-1-email">Your Email Address</label>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  id="fc-generated-1-email"
                  placeholder="john@doe.com"
                />
              </div>

              <div className={style.formcarryBlock}>
                <label for="fc-generated-1-phone">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  ref={phoneRef}
                  id="fc-generated-1-phone"
                  placeholder="Enter your phone number..."
                />
              </div>

              <div className={style.formcarryBlock}>
                <label for="fc-generated-1-phone">Pickup City</label>
                <input
                  type="tel"
                  name="sourceCity"
                  ref={sourceCityRef}
                  id="fc-generated-1-phone"
                  placeholder="Enter the source city..."
                />
              </div>

              <div className={style.formcarryBlock}>
                <label for="fc-generated-1-phone">Dropoff City</label>
                <input
                  type="tel"
                  name="destinationCity"
                  ref={destinationCityRef}
                  id="fc-generated-1-phone"
                  placeholder="Enter the destination city..."
                />
              </div>

              <div className={style.formcarryBlock}>
                <label for="fc-generated-1-phone">Weight</label>
                <input
                  type="tel"
                  name="weight"
                  ref={weightRef}
                  id="fc-generated-1-phone"
                  placeholder="Enter the weight..."
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
                  ref={pickUpRef}
                  placeholder="Enter your location..."
                  onFocus={() => mapCtx.setIsPickup(true)}
                  value={`${mapCtx.pickupLocation.latitude}, ${mapCtx.pickupLocation.longitude}`}
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
                  ref={dropOffRef}
                  id="fc-generated-1-location"
                  placeholder="Enter your location..."
                  onFocus={() => mapCtx.setIsPickup(false)}
                  value={`${mapCtx.dropoffLocation.latitude}, ${mapCtx.dropoffLocation.longitude}`}
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
