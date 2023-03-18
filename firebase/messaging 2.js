import { doc, setDoc } from "firebase/firestore";
import { getToken } from "firebase/messaging";
import { firestore, messaging } from "./clientApp";

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
const fcmTokensCollection = "fcmTokens";

export const requestPermission = async (uid) => {
  const permit = await Notification.requestPermission();
  if (permit === "granted") {
    await saveMessagingDeviceToken(uid);
  }
  console.log("Unable to get permission to notify.");
};

export const saveMessagingDeviceToken = async (uid) => {
  const msg = await messaging();
  const fcmToken = await getToken(msg, {
    vapidKey: VAPID_KEY,
  });
  if (fcmToken) {
    console.log("token", fcmToken);
    const tokenRef = doc(firestore, fcmTokensCollection, uid);
    await setDoc(tokenRef, { fcmToken });
  } else {
    requestPermission(uid);
  }
};
