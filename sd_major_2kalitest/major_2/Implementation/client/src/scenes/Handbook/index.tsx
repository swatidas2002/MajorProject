import { Typography, useTheme } from "@mui/material";

const HandbookContent = () => {
  const theme = useTheme();

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
    textAlign: "center",
  };

  const gifContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1rem",
    width: "100%",
  };

  const gifContentStyle: React.CSSProperties = {
    maxWidth: "45%",
    height: "45%",
    margin: "1rem",
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: "45%",
    textAlign: "justify",
    margin:"1rem",
  };

  return (
    <div style={containerStyle}>
      <Typography
        variant="h1"
        style={{ color: '#45bb94', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
        gutterBottom
        sx={{ fontFamily: 'Roboto Slab, sans-serif',  }}
      >
        FINANCE FRIEND HANDBOOK
      </Typography>

      <div style={gifContainerStyle}>
        <img src="https://www.fastcapital360.com/wp-content/uploads/2020/02/graphic_01-2.gif" alt="First Gif" style={{...gifContentStyle, marginLeft: '70px'}} />
        <div style={{...contentStyle, marginRight: '7%', marginLeft: '6%'}}>
          <Typography variant="body1" color={theme.palette.grey[500]}>
            The finance tracker application is a comprehensive solution developed to help organisations manage their financial data and key performance indicators (KPIs). The application provides a user-friendly interface for tracking various financial metrics by leveraging a stack of technologies such as TypeScript, Vite, Recharts, Redux Toolkit, and React Router for front-end development and Node.js, Express.js, Mongoose, and regression.js for backend functionality. It includes a variety of visualization features like area charts, line charts, bar charts, pie charts, and scatter plots, as well as data grids for presenting comprehensive information about products and orders. The addition of features such as grid expansion, customer segmentation, buyer behavior research, expense anomaly detection, and report generation increases its value to enterprises.
          </Typography>
        </div>
      </div>

      <div style={{ ...gifContainerStyle, flexDirection: "row-reverse" }}>
  <img
    src="https://cdn.dribbble.com/users/1523313/screenshots/13671653/media/7c52f9d4b1117aa12f3bf9f9c3b9e1aa.gif"
    alt="Second Gif"
    style={{ ...gifContentStyle, width: "40%", height: "auto", marginRight: '7%', marginLeft: '6%'}} // Adjust the width and height accordingly
  />
  <div style={{ ...contentStyle, marginLeft: '70px' }}>
    <Typography variant="body1" color={theme.palette.grey[500]}>
      The application also has a prediction graph feature that uses genuine machine learning techniques, specifically regression.js, to provide predicted insights based on historical data, allowing businesses to make more informed revenue forecasting decisions. The prediction graph feature in the financial tracker application uses advanced machine learning algorithms to provide organizations with important insights into future revenue trends. Using regression.js, the application creates prediction models based on historical financial data, allowing businesses to project income with precision and confidence. By analyzing historical performance and detecting underlying patterns, the prediction graph enables firms to make educated decisions, optimize resource allocation, and effectively strategize for future growth and sustainability.
    </Typography>
  </div>
</div>

    </div>
  );
};

export default HandbookContent;
