import { firestore, messaging } from "./clientApp";
import { doc, setDoc } from "firebase/firestore";
import { getToken, onMessage } from "firebase/messaging";

export const FCM_TOKEN_COLLECTION = "fcmTokens";
export const FCM_TOKEN_KEY = "fcmToken";
const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

const requestPermission = async (uid) => {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  } else {
    await saveMessagingDeviceToken(uid);
  }
};

const saveMessagingDeviceToken = async (uid) => {
  try {
    const msg = await messaging();
    const fcmToken = await getToken(msg, { vapidKey: VAPID_KEY });
    if (fcmToken) {
      console.log("fcmToken", fcmToken);
      const fcmTokenRef = doc(firestore, FCM_TOKEN_COLLECTION, uid);
      await setDoc(fcmTokenRef, { fcmToken });
    } else {
      requestPermission(uid);
    }
  } catch (error) {
    console.log(error);
  }
};

export default saveMessagingDeviceToken;
