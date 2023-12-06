import { timers } from "@/constants";
import { TTimers } from "@/types";
import {
  Box,
  Button,
  Grid,
  MobileTimePicker,
  Typography,
} from "@components/layout/mui-component";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

function Timers() {
  const [timer, setTimer] = useState<TTimers>();
  const [notingTime, setNotingTime] = useState<Dayjs>(dayjs());

  useEffect(() => {
    if (timer) {
      const convertedTime = dayjs(timer.noting_time, "HH:mm");
      setNotingTime(convertedTime);
    }
  }, [timer]);

  useEffect(() => {
    console.log(notingTime.format("HH:mm"));
  }, [notingTime]);

  //------------------------------------
  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item xs={3} sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingLeft: 2,
            paddingRight: 4,
            paddingBottom: 2,
            borderBottom: "2px solid #eee",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", flexGrow: 1, display: "inline-block" }}
          >
            TIMERS
          </Typography>
          <Button variant="contained">ADD </Button>
        </Box>
        <Box
          sx={{
            borderRight: "3px solid #eee",
            height: "100%",
          }}
        >
          {timers.map((element) => (
            <Box
              key={element.id}
              onClick={() => {
                setTimer(element);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                paddingLeft: 2,
                paddingRight: 4,
                paddingBottom: 2,
                paddingTop: 2,
                overflow: "hidden",
                borderBottom: "2px solid gray",
              }}
            >
              <Box sx={{ display: "flex", flexFlow: "column", width: "100%" }}>
                <Typography
                  variant="inherit"
                  sx={{
                    fontWeight: "bold",
                    flexGrow: 1,
                    display: "inline-block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {element.title}
                </Typography>
                <Typography
                  variant="inherit"
                  sx={{
                    fontWeight: "bold",
                    flexGrow: 1,
                    display: "inline-block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {element.noting_time}
                </Typography>
              </Box>
              <Button
                variant="text"
                sx={{
                  bgcolor: "#D63214",
                  color: "white",
                  "&:hover": {
                    bgcolor: "tomato",
                  },
                }}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid item xs={9} sx={{ height: "100%", p: 1 }}>
        <Box sx={{ height: "100%" }}>
          <MobileTimePicker
            label="Noting Time"
            value={notingTime.toDate()}
            onChange={(value: Date | null, _context: any) => {
              if (value) {
                setNotingTime(dayjs(value));
              }
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Timers;
