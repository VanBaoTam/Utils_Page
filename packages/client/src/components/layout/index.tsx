import { ReactNode } from "react";
import { Box, Grid } from "./mui-component";
import SideBar from "./sidebar";
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
            height: "100vh",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <Box>
            <Grid container>
              <Grid item xs={12} sx={{ height: "60px" }}>
                TEST
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
