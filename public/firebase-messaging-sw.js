importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAsGPRwTKtGrYg2O21-apEQyU3GduLVle0",
  authDomain: "gc-webathon-29ee0.firebaseapp.com",
  databaseURL:
    "https://gc-webathon-29ee0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gc-webathon-29ee0",
  storageBucket: "gc-webathon-29ee0.appspot.com",
  messagingSenderId: "514479106884",
  appId: "1:514479106884:web:814ba3af70a62180994511",
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
