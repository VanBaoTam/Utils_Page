import { Box, Grid } from "@components/layout/mui-component";

function Notes() {
  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item xs={2} sx={{ height: "100%" }}>
        <Box sx={{ borderRight: "3px solid #eee", height: "100%" }}>
          TEST LIST
        </Box>
      </Grid>
      <Grid item xs={10} sx={{ height: "100%", pl: 2 }}>
        <Box sx={{ borderRight: "3px solid #eee", height: "100%" }}>
          TEST COMPONENTS
        </Box>
      </Grid>
    </Grid>
  );
}

export default Notes;
