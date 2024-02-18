import { ReactNode, useEffect } from "react";
import { Box, Grid } from "./mui-component";
import SideBar from "./sidebar";
import { useDispatch } from "react-redux";
import { checkNotifTime } from "@/slices/task";
import { checkNotifTimer } from "@/slices/timer";
import { checkNotifCalendar } from "@/slices/calendar";
type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(checkNotifTime());
      dispatch(checkNotifTimer());
      dispatch(checkNotifCalendar());
    }, 60000);

    return () => clearInterval(intervalId);
  }, [dispatch]);
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
              <Grid item xs={12} sx={{ height: "60px" }}></Grid>
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
