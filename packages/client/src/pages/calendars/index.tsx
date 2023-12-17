import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { useDataProvider } from "@/hooks/useProvider";
import {
  createCalendar,
  deleteCalendar,
  loadCalendarsContents,
  updateCalendar,
} from "@/slices/calendar";
import { TCalendars } from "@/types";
import { displayToast } from "@/utils/toast";
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
  const accountSelector = useAppSelector((store) => store.account);
  const provider = useDataProvider();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notingTime, setNotingTime] = useState<Dayjs>(dayjs());
  const [notification, setNotification] = useState<string>("Unknown");
  const [title, setTitle] = useState<string>("Untitled");
  const handleCreateCalendar = () => {
    const newCalendar: TCalendars = {
      id: calendarSelector.length + 1,
      user_id: 1,
      name: "Untitled",
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
      name: title || "Untitled",
      choosen_date: notingTime.format("DD / MM / YYYY"),
      notification: notification || "Unknown",
      noting_time: notingTime.format("HH:mm"),
    };
    dispatch(updateCalendar(updatedCalendar));
  };
  const handleDeleteCalendar = (id: number) => {
    setCalendar(null);
    dispatch(deleteCalendar(id));
  };
  const handleLoadCalendars = async () => {
    setIsLoading(true);
    if (!accountSelector.isLogged) {
      displayToast("You should log in to load your data!", "info");
      setIsLoading(false);
      return;
    }
    try {
      const token = sessionStorage.getItem("Bearer");
      if (!token) {
        displayToast(
          "Invalid account's credentials, please log in again!",
          "error"
        );
        setIsLoading(false);
        return;
      }
      const resp = await provider.get({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        path: "calendars/load-content",
      });
      if (resp.status === 200) {
        console.log(resp);
        displayToast(resp.data.message, "success");
        dispatch(loadCalendarsContents(resp.data.calendars));
        setIsLoading(false);
      } else {
        displayToast(resp.data, "error");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error.response.data.error);
      displayToast(error.response.data.error, "error");
      setIsLoading(false);
    }
  };
  const handleSaveCalendars = async () => {
    if (!accountSelector.isLogged) {
      displayToast("You should log in to store your data!", "info");
      setIsSaving(false);
      return;
    }
    if (calendarSelector.length <= 0) {
      displayToast("Please create at least 1 day to store!!!", "info");
    } else {
      setIsSaving(true);
      try {
        const token = sessionStorage.getItem("Bearer");
        if (!token) {
          displayToast(
            "Invalid account's credentials, please log in again!",
            "error"
          );
          setIsSaving(false);
          return;
        }
        const resp = await provider.post({
          headers: {
            Authorization: `Bearer ${token}`,
          },
          path: "calendars/save-content",
          body: { data: calendarSelector },
        });
        if (resp.status === 200) {
          displayToast(resp.data.message, "success");
          setIsSaving(false);
        } else {
          displayToast(resp.data, "error");
          setIsSaving(false);
        }
      } catch (error: any) {
        console.log(error.response.data.error);
        displayToast(error.response.data.error, "error");
        setIsSaving(false);
      }
    }
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
            paddingBottom: 2,
            borderBottom: "2px solid #eee",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", flexGrow: 1, display: "inline-block" }}
          >
            CALENDAR
          </Typography>
          <Button
            variant="contained"
            onClick={handleCreateCalendar}
            sx={{ marginLeft: "1rem" }}
          >
            ADD
          </Button>
          <Box sx={{ paddingLeft: "1rem" }}>
            <Button
              disabled={isLoading}
              variant="contained"
              onClick={handleLoadCalendars}
              sx={{
                bgcolor: "#4CAF50",
                marginBottom: "1rem",
                "&:hover": {
                  bgcolor: "#45a049",
                },
              }}
            >
              Load Days
            </Button>
            <Button
              disabled={isSaving}
              variant="contained"
              onClick={handleSaveCalendars}
              sx={{
                bgcolor: "#4CAF50",

                "&:hover": {
                  bgcolor: "#45a049",
                },
              }}
            >
              Save Days
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            borderRight: "3px solid #eee",
            maxHeight: "72vh",
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
              <Box
                sx={{
                  display: "flex",
                  flexFlow: "column",
                  width: "100%",
                  maxWidth: "15rem",
                }}
              >
                <Typography
                  variant="inherit"
                  sx={{
                    flexGrow: 1,
                    fontWeight: "bold",
                    display: "inline-block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {element.name}
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
                  Days:{" "}
                  {dayjs(element.choosen_date, "DD / MM / YYYY").format(
                    "DD/MM/YYYY"
                  )}
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
                  Notification: {element.notification}
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
        <Box
          sx={{
            height: "100%",

            display: "flex",
            flexFlow: "column",
            width: "38rem",
          }}
        >
          {calendar && (
            <React.Fragment>
              <Typography variant="h6">Selected Days:</Typography>
              <br />
              <TextField
                sx={{ minWidth: "32rem" }}
                label="Title"
                variant="outlined"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
              <MobileDateTimePicker
                sx={{ my: 3 }}
                label="Choosen Date Time:"
                minDateTime={dayjs().subtract(3, "minute") as any}
                value={notingTime as any}
                onChange={(value: Date | null, _context: any) => {
                  if (value) {
                    setNotingTime(dayjs(value));
                  }
                }}
              />
              <Box>
                <TextField
                  sx={{ minWidth: "38rem" }}
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
