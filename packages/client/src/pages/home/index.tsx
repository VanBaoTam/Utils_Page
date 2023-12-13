import { Box, Typography, Button } from "@components/layout/mui-component";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to Utils Page!
      </Typography>
      <Typography variant="body1" paragraph>
        Organize your work effortlessly with features like task management, note
        management, timers, and calendars.
      </Typography>
      <Typography variant="body1" paragraph>
        Enjoy the flexibility of using our web app as a guest without the need
        for login. For added convenience, sync your data with our cloud database
        and securely store your information in the cloud.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Log In
          </Button>
        </Link>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Sign Up
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Home;
