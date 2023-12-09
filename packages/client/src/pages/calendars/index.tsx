import { calendars } from "@/constants";
import { TCalendars } from "@/types";
import {
  Box,
  Button,
  Grid,
  MobileDateTimePicker,
  Typography,
} from "@components/layout/mui-component";
import { TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";

function Calendars() {
  const [calendar, setCalendar] = useState<TCalendars>();
  const [notingTime, setNotingTime] = useState<Dayjs>(dayjs());
  const [notification, setNotification] = useState<string>("Unknown");
  useEffect(() => {
    if (calendar) {
      setNotingTime(
        dayjs(
          calendar.choosen_date + "T" + calendar.noting_time,
          "YYYY-MM-DDTHH:mm"
        )
      );
      setNotification(calendar.notification);
    }
  }, [calendar]);
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
          {calendars.map((element) => (
            <Box
              key={element.id}
              onClick={() => {
                setCalendar(element);
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
                  {dayjs(element.choosen_date).format("DD / MM / YYYY")}
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
                  {"Noting time: " + element.noting_time}
                </Typography>
                <Typography
                  variant="inherit"
                  sx={{
                    flexGrow: 1,
                    display: "inline-block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {element.notification}
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
      <Grid item xs={9} sx={{ height: "100%", p: 1, pl: 3 }}>
        <Box sx={{ height: "100%", p: 2 }}>
          {calendar && (
            <React.Fragment>
              <Typography variant="h6">Selected Timer:</Typography>
              <br />
              <MobileDateTimePicker
                sx={{ m: 1 }}
                label="Choosen Date Time:"
                minDateTime={dayjs() as any}
                value={notingTime as any}
                onChange={(value: Date | null, _context: any) => {
                  if (value) {
                    setNotingTime(dayjs(value));
                  }
                }}
              />
              <Box sx={{ m: 1, py: 2 }}>
                <TextField
                  sx={{ minWidth: "32rem" }}
                  label="Notification"
                  variant="outlined"
                  value={notification}
                  onChange={(event) => {
                    setNotification(event.target.value);
                  }}
                />
              </Box>
              <Box sx={{ m: 1, py: 2 }}>
                <Button variant="contained">CONFIRM</Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Calendars;
