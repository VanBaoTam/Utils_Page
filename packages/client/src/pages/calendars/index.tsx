import { timers, DAYS } from "@/constants";
import { ETimerStatus, TTimers } from "@/types";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  MobileTimePicker,
  TextField,
  Typography,
} from "@components/layout/mui-component";
import { Checkbox, MenuItem, Select } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";

function Calendars() {
  const [timer, setTimer] = useState<TTimers>();
  const [notingTime, setNotingTime] = useState<Dayjs>(dayjs());
  const [days, setDays] = useState<string[]>([]);
  const handleDayToggle = (day: string) => {
    setDays((prevDays) => {
      if (prevDays.includes(day)) {
        return prevDays.filter((selectedDay) => selectedDay !== day);
      } else {
        return [...prevDays, day];
      }
    });
  };
  const handleRepeaterChange = (event: any) => {
    console.log(event.target.value);
  };

  useEffect(() => {
    if (timer) {
      const convertedTime = dayjs(timer.noting_time, "HH:mm");
      setNotingTime(convertedTime);
      setDays(timer.choosen_days);
    }
  }, [timer]);
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
            CALENDARS
          </Typography>
          <Button variant="contained">ADD </Button>
        </Box>
        <Box
          sx={{
            borderRight: "3px solid #eee",
            height: "100%",
          }}
        >
          {/* {timers.map((element) => (
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
          ))} */}
        </Box>
      </Grid>
      <Grid item xs={9} sx={{ height: "100%", p: 1, pl: 3 }}>
        <Box sx={{ height: "100%", p: 2 }}></Box>
      </Grid>
    </Grid>
  );
}

export default Calendars;
