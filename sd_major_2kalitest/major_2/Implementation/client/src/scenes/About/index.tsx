import React from "react";
import { Typography, useTheme } from "@mui/material";
import CreatorsImagePath from "@/scenes/About/Creators.gif";

const AboutSection = () => {
  const theme = useTheme();

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
    textAlign: "center",
  };

  {/*
  const headingStyle: React.CSSProperties = {
    marginBottom: "1rem",
    alignSelf: "flex-start",
  };*/}

  const sectionStyle: React.CSSProperties = {
    marginTop: "2rem",
  };

  const gifContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1rem",
    width: "100%",
  };

  const gifContentStyle: React.CSSProperties = {
    maxWidth: "38%",
    height: "auto",
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: "45%",
    textAlign: "justify",
    marginLeft: "1rem",
    marginBottom: "1rem", // Adjusted margin-bottom to shift the content above
  };

  return (
    <div style={containerStyle}>
      {/* HEADING */}
      <Typography
        variant="h1"
        style={{ color: '#45bb94', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
        gutterBottom
        sx={{ fontFamily: 'Roboto Slab, sans-serif' }}
      >
        ABOUT US
      </Typography>

      {/* 1ST PARA HEADING - PROJECT CREATORS */}
      <div style={{ ...sectionStyle, marginBottom: "2rem" }}>
        <Typography
          variant="h2"
          color={theme.palette.secondary.main}
          gutterBottom
          sx={{ fontFamily: 'Calibri, sans-serif', marginLeft: '70px', textAlign: 'left', color: '#9B79D6', fontWeight: 'bold' }}
        >
          PROJECT CREATORS
        </Typography>

        {/* 1ST PARA - PROJECT CREATORS */}
        <div style={gifContainerStyle}>
          <div style={{...contentStyle, marginLeft: '70px'}}>
            <Typography variant="body1" color={theme.palette.grey[500]}>
              We are a vibrant five-member team from Kalinga Institute of Industrial Technology in our last year. Meet Sai Anupama Mulupuri, Debalina Saha, Kali Johari, Meghna, and Swati Das, the creative minds behind the revolutionary finance tracker application shown above. With a similar enthusiasm for technology and finance, we worked together to create a comprehensive solution that enables organisations to successfully manage their financial data. Our diversified experiences and expertise in frontend and backend programming, data visualisation, and machine learning have allowed us to design a user-friendly interface with advanced features. Through dedication and effort, we seek to offer significant solutions that match the changing demands of organisations. Join us on this adventure as we continue to innovate.
            </Typography>
          </div>
          <img src={CreatorsImagePath} alt="Creators Image" style={{...gifContentStyle, marginRight: '7%'}} />
        </div>
      </div>

      {/* 2ND PARA HEADING - OUR VISION */}
      <div style={{ ...sectionStyle, marginTop: "2rem" }}>
        <Typography
          variant="h2"
          color={theme.palette.secondary.main}
          gutterBottom
          sx={{ fontFamily: 'Calibri, sans-serif', marginLeft: '70px', textAlign: 'left', color: '#9B79D6', fontWeight: 'bold' }}
        >
          OUR VISION FOR THE PROJECT
        </Typography>

        {/* 2ND PARA- OUR VISION */}
        <div style={{ ...gifContainerStyle, flexDirection: "row-reverse" }}>
          <div style={{ ...contentStyle, marginRight: '7%' }}>
            <Typography variant="body1" color={theme.palette.grey[500]}>
              Our project was initiated to fulfill the growing demand for comprehensive financial management solutions in businesses. We aimed to empower organisations to track their financial data and important performance measures more efficiently by prioritising user-friendly interface design and leveraging modern technology. Our technology provides critical insights and enables informed decision-making by combining features like data visualisation, predictive analytics, and anomaly detection. We collaborate and innovate to help businesses optimise their financial processes and achieve long-term success.Our mission is driven by the desire to help our clients achieve long-term success. We are dedicated to providing cutting-edge solutions that help businesses survive in today's competitive environment, fostering innovation and sustainability across industries.
            </Typography>
          </div>
          <img
            src="https://www.geckoboard.com/blog/content/images/size/w2000/2020/01/gb-launch-blog-white.gif"
            alt="Second Gif"
            style={{ ...gifContentStyle, marginLeft: '70px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
