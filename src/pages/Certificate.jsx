import { Button, Typography, Box } from "@mui/material";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import certificateBg from "../assets/certificate/certificate.png";
import signatureImg from "../assets/certificate/signature.svg";
import { format } from "date-fns";
import { useRef } from "react";

export default function Certificate() {
  const buttonRef = useRef(null);

  const downloadPDF = async () => {
    // Hide the button
    if (buttonRef.current) {
      buttonRef.current.style.display = "none";
    }

    const input = document.getElementById("certificate");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 0, imgWidth, imgHeight);
    pdf.save("certificate.pdf");

    // Show the button again
    if (buttonRef.current) {
      buttonRef.current.style.display = "block";
    }
  };

  const formattedDate = format(new Date(), "yyyy/MM/dd");

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${certificateBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        color: "black",
        fontFamily: "Arial, sans-serif",
      }}
      id="certificate"
    >
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "38%",
          color: "#333",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "3rem",
          }}
        >
          This Certificate is Proudly Presented To
        </Typography>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            fontSize: "4rem",
            my: 3,
          }}
        >
          {name || "John Doe"}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            textAlign: "center",
            fontSize: "2.1rem",
            width: "80%",
            margin: "auto",
            my: 5,
          }}
        >
          Congratulations on your outstanding achievement! We wish you continued
          success and all the best in your future endeavors.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", px: 10 }}>
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "2.1rem", direction: "ltr" }}
            >
              Signature:
            </Typography>
            <img
              src={signatureImg}
              alt="Signature"
              style={{ width: "100px", height: "auto", marginBottom: "20px" }}
            />
          </Box>
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "2.1rem", direction: "ltr" }}
            >
              Date:
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: "2.1rem", direction: "ltr" }}
            >
              {formattedDate}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={downloadPDF}
        ref={buttonRef} // Assign the ref to the button
        sx={{
          position: "absolute",
          bottom: 20,
          right: 400,
          fontFamily: "Arial, sans-serif",
          fontSize: "1.5rem",
        }}
      >
        Download as PDF
      </Button>
    </Box>
  );
}
