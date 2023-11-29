import { ReactNode } from "react";
import { Box, Grid } from "./mui-component";
import Header from "./header";
import SideBar from "./sidebar";
import Footer from "./footer";

type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            height: "100vh", // Adjusted height
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <Box>
            <Grid container>
              <Grid item xs={12}>
                <Header />
              </Grid>
              <Grid item xs={12} sx={{ height: "100%", width: "100%" }}>
                <SideBar>{children}</SideBar>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainLayout;
