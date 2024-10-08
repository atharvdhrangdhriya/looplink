import React, { useState, useEffect } from "react";

export default function ProfileScreen({ userData }) {
  const [qrCodeUrl, setqrCodeUrl] = useState("");

  useEffect(() => {
    // Function to generate the QR code
    const generateQRCode = async () => {
      try {
        const url = `http://localhost:3000/vcard/?firstName=${userData.first_name}&lastName=${userData.last_name}&phone=${userData.phone_no}&email=${userData.email}`;
        const response = await fetch("http://localhost:5000/api/generate-qr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: url,
            config: {
              body: "rounded-pointed",
              eye: "frame13",
              bodyColor: "#4c9da8",
              eye1Color: "#4c9da8",
              eye2Color: "#4c9da8",
              eye3Color: "#4c9da8",
              eyeBall1Color: "#4c9da8",
              eyeBall2Color: "#4c9da8",
              eyeBall3Color: "#4c9da8",
              gradientType: "linear",
              gradientOnEyes: "true",
              eyeBall: "ball14",
              colorDark: "#2b7a78",
              colorLight: "#ffffff",
              logo: "https://raw.githubusercontent.com/Aryan-Darji-07/Contact-Information-QR-Code-Generator/main/images/logo_no_bg.png",
              logoMode: "default",
            },
            size: 150,
            download: false,
            file: "png",
          }),
        });

        if (response.ok) {
          const qrCodeBlob = await response.blob();
          setqrCodeUrl(URL.createObjectURL(qrCodeBlob));
        } else {
          console.error("Error fetching QR code:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    generateQRCode();
  }, [userData]);

  return (
    <div
      style={{
        border: "1px solid rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        width: "800px",
        borderRadius: "8px",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <div
        className="images"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <img
          src="/images/avatar.jpg"
          alt="Avatar"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "500px",
          }}
        />

        <img
          src={qrCodeUrl}
          alt="QR Code"
          style={{
            width: "130px",
            height: "130px",
            borderRadius: "0px",
            cursor: "pointer",
          }}
        />
      </div>
      <div
        className="info-container"
        style={{
          paddingTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 15,
        }}
      >
        <div
          className="information"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 15,
          }}
        >
          <span style={{ color: "white", fontSize: "20px" }}>
            Username: {userData.username}
          </span>
          <span style={{ color: "white", fontSize: "20px" }}>
            Name: {userData.first_name + " " + userData.last_name}
          </span>
        </div>
        <div
          className="information"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 15,
          }}
        >
          <span style={{ color: "white", fontSize: "20px" }}>
            Birthdate:{" "}
            {new Date(userData.birthdate).toISOString().split("T")[0]}
          </span>
          <span style={{ color: "white", fontSize: "20px" }}>
            Gender: {userData.gender}
          </span>
        </div>
        <div
          className="information"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 15,
          }}
        >
          <span style={{ color: "white", fontSize: "20px" }}>
            Email: {userData.email}
          </span>
          <span style={{ color: "white", fontSize: "20px" }}>
            Phone: {userData.phone_no}
          </span>
        </div>
      </div>
    </div>
  );
}
