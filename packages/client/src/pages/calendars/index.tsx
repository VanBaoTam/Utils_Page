import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  createCalendar,
  deleteCalendar,
  updateCalendar,
} from "@/slices/calendar";
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
  const dispatch = useAppDispatch();
  const calendarSelector = useAppSelector((store) => store.calendar);
  const [calendar, setCalendar] = useState<TCalendars | null>(null);
  const [notingTime, setNotingTime] = useState<Dayjs>(dayjs());
  const [notification, setNotification] = useState<string>("Unknown");

  const handleCreateCalendar = () => {
    const newCalendar: TCalendars = {
      id: calendarSelector.length + 1,
      user_id: 1,
      choosen_date: dayjs().format("DD / MM / YYYY"),
      notification: "Unknown",
      noting_time: dayjs().format("HH:mm"),
    };
    dispatch(createCalendar(newCalendar));
    setCalendar(null);
  };
  const handleUpdateCalendar = () => {
    const updatedCalendar: TCalendars = {
      id: calendar?.id || 1,
      user_id: calendar?.user_id || 1,
      choosen_date: notingTime.format("DD / MM / YYYY"),
      notification: notification,
      noting_time: notingTime.format("HH:mm"),
    };
    dispatch(updateCalendar(updatedCalendar));
  };
  const handleDeleteCalendar = (id: number) => {
    setCalendar(null);
    dispatch(deleteCalendar(id));
  };

  useEffect(() => {
    if (calendar) {
      const formattedDate = dayjs(calendar.choosen_date, "DD / MM / YYYY");
      const formattedTime = dayjs(calendar.noting_time, "HH:mm");
      setNotingTime(
        formattedDate
          .add(formattedTime.hour(), "hour")
          .add(formattedTime.minute(), "minute")
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
          <Button variant="contained" onClick={handleCreateCalendar}>
            ADD
          </Button>
        </Box>
        <Box
          sx={{
            borderRight: "3px solid #eee",
            maxHeight: "82vh",
            overflow: "auto",
          }}
        >
          {calendarSelector.map((element) => (
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
                  {dayjs(element.choosen_date, "DD / MM / YYYY").format(
                    "DD / MM / YYYY"
                  )}
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
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteCalendar(element.id);
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
                minDateTime={dayjs().subtract(3, "minute") as any}
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
                <Button variant="contained" onClick={handleUpdateCalendar}>
                  CONFIRM
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Calendars;
