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
    justifyContent: "space-between"
  };

  const gifContentStyle: React.CSSProperties = {
    maxWidth: "45%",
    height: "45%",
    margin: "1rem",
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: "45%",
    textAlign: "left",
    margin:"1rem",
    textAlign: "justify",
  };

  return (
    <div style={containerStyle}>
       <Typography
        variant="h1"
        style={{ color: '#45bb94', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
        gutterBottom
        sx={{ fontFamily: 'Roboto Slab, sans-serif', fontSize: '35px', marginTop:'1.5%' }}
      >
        HANDBOOK
      </Typography>

      <div style={gifContainerStyle}>
        <img src="https://www.fastcapital360.com/wp-content/uploads/2020/02/graphic_01-2.gif" alt="First Gif" style={{ ...gifContentStyle, marginLeft: '70px'}} />
        <div style={{...contentStyle, marginRight: '7%', marginLeft:'4%'}}>
          <Typography variant="body1" color={theme.palette.grey[500]}>
          Our project is a comprehensive finance tracker application designed to assist small bussiness owners in managing financial data and key performance indicators (KPIs) effectively. It offers a user-friendly interface equipped with various visualization tools such as area charts, line charts, bar charts, pie charts, and scatter plots. Leveraging technologies like TypeScript, Vite, Recharts, Redux Toolkit, React Router, Node.js, Express.js, Mongoose, and regression.js, the application ensures robust functionality both on the frontend and backend. Additionally, we've incorporated features like grid expansion, expense tracking with a balanced graphical representation, a tax calculator, an invoice system, and support for light and dark mode. Furthermore, users can benefit from real-time exchange rate graphs for USD, GBP, EUR, and AUD, facilitating better financial decision-making.
          </Typography>
        </div>
      </div>

      <div style={{ ...gifContainerStyle, flexDirection: "row-reverse" }}>
        <img src="https://media.licdn.com/dms/image/D4D12AQEMPxc9PgKDoA/article-cover_image-shrink_720_1280/0/1687870267070?e=1712793600&v=beta&t=nFJkb9cOEwwkICHyJgNdbBaS22w9uRHF4vi2f0I1A6k" alt="Second Gif" style={gifContentStyle} />
        <div style={{...contentStyle, marginLeft: '70px'}}>
          <Typography variant="body1" color={theme.palette.grey[500]}>
            The application also has a prediction graph feature that uses genuine machine learning techniques, specifically regression.js, to provide predicted insights based on historical data, allowing businesses to make more informed revenue forecasting decisions. The prediction graph feature in the financial tracker application uses advanced machine learning algorithms to provide organizations with important insights into future revenue trends. Using regression.js, the application creates prediction models based on historical financial data, allowing businesses to project income with precision and confidence. By analyzing historical performance and detecting underlying patterns, the prediction graph enables firms to make educated decisions, optimize resource allocation, and effectively strategize for future growth and sustainability.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default HandbookContent;
