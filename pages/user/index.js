import style from "../../styles/User.module.css";
import Image from "next/image";
import Drone from "../../assets/DroneDelivery-pana.svg";
import NavBar from "../../components/NavBar/UserNavbar";

const UserHome = () => {
  return (
    <>
      <NavBar />
      <div className={style.heroSection}>
        <div className={style.containerHero}>
          <div className={style.contentHero}>
            <div className={style.leftSide}>
              <h1>Experience the future of delivery with our drone fleet</h1>
              <p>
                Enjoy lightning-fast delivery times that can have your goods at
                your doorstep in a matter of minutes. Our drones travel at high
                speeds, providing rapid and efficient delivery to almost
                anywhere, even hard-to-reach locations. Plus, our service is
                incredibly cost-effective, allowing us to pass on the savings to
                you. So why wait? Experience the future of delivery today with
                our drone delivery service!
              </p>
              <form>
                <div className={style.formGroup}>
                  <input type="email" placeholder="Have a question?" />
                  <button type="submit">Request Delivery</button>
                </div>
              </form>
            </div>

            <div className={style.rightSide}>
              <Image src={Drone} layout="fill" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
