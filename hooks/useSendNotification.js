const useSendNotification = () => {
  const sendNotification = async (to, title, body) => {
    const res = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=${process.env.NEXT_PUBLIC_FIREBASE_SERVER_KEY}`,
      },
      body: JSON.stringify({
        to,
        notification: {
          title,
          body,
        },
      }),
    });

    console.log("Notification sent", res);
  };

  return sendNotification;
};

export default useSendNotification;
