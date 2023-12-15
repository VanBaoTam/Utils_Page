import { Box, Button } from "../mui-component";
import NavBar from "./navbar";
function Header() {
  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: "2px solid #ddd",
        display: "flex",
      }}
    >
      <NavBar />
    </Box>
  );
}

export default Header;
