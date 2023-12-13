import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { DAYS } from "@/constants";
import { createTimer, deleteTimer, updateTimer } from "@/slices/timer";
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
  Checkbox,
  MenuItem,
  Select,
} from "@components/layout/mui-component";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";

function Timers() {
  const timerSelector = useAppSelector((store) => store.timer);
  const [timer, setTimer] = useState<TTimers | null>(null);
  const [title, setTitle] = useState<string>("");
  const [days, setDays] = useState<string[]>([]);
  const [repeater, setRepeater] = useState<ETimerStatus>(ETimerStatus.always);
  const [notingTime, setNotingTime] = useState<Dayjs>(dayjs());
  const dispatch = useAppDispatch();
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
    setRepeater(event.target.value);
  };
  const handleCreateTimer = () => {
    const newTimer: TTimers = {
      id: timerSelector.length + 1,
      user_id: 1,
      title: "Untitled",
      choosen_days: [""],
      noting_time: dayjs().format("HH:mm"),
      repeater: ETimerStatus.always,
    };
    dispatch(createTimer(newTimer));
    setTimer(null);
  };
  const handleUpdateTimer = () => {
    const updatedTimer: TTimers = {
      id: timer?.id || 1,
      user_id: timer?.user_id || 1,
      title,
      repeater,
      choosen_days: days,
      noting_time: notingTime.format("HH:mm"),
    };
    dispatch(updateTimer(updatedTimer));
  };
  const handleDeleteTimer = (id: number) => {
    setTimer(null);
    dispatch(deleteTimer(id));
  };

  useEffect(() => {
    if (timer) {
      const convertedTime = dayjs(timer.noting_time, "HH:mm");
      setNotingTime(convertedTime);
      setDays(timer.choosen_days);
      setTitle(timer.title);
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
            TIMERS
          </Typography>
          <Button variant="contained" onClick={handleCreateTimer}>
            ADD
          </Button>
        </Box>
        <Box
          sx={{
            borderRight: "3px solid #eee",
            height: "100%",
          }}
        >
          {timerSelector.map((element) => (
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
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteTimer(element.id);
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
          {timer && (
            <React.Fragment>
              <Typography variant="h6">Selected Timer:</Typography>
              <Box sx={{ py: 2 }}>
                <TextField
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </Box>
              <Box sx={{ py: 2 }}>
                <Typography variant="body1" sx={{ pb: 1 }}>
                  Choose Days
                </Typography>
                <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                  {DAYS.map((day) => (
                    <FormControlLabel
                      key={day}
                      control={
                        <Checkbox
                          checked={days.includes(day)}
                          onChange={() => handleDayToggle(day)}
                        />
                      }
                      label={day}
                    />
                  ))}
                </FormGroup>
              </Box>
              <Box>
                <Typography variant="body1" sx={{ pb: 1 }}>
                  Choose Repeater
                </Typography>
                <Select
                  label="Repeater"
                  variant="outlined"
                  value={timer.repeater}
                  onChange={handleRepeaterChange}
                  sx={{ marginLeft: 1 }}
                >
                  <MenuItem value={ETimerStatus.repeat_once}>
                    Repeat Once
                  </MenuItem>
                  <MenuItem value={ETimerStatus.repeat_many}>
                    Repeat Many
                  </MenuItem>
                  <MenuItem value={ETimerStatus.always}>Always</MenuItem>
                </Select>
              </Box>
              <br />
              <MobileTimePicker
                sx={{ m: 1 }}
                label="Noting Time"
                value={notingTime as any}
                onChange={(value: Date | null, _context: any) => {
                  if (value) {
                    setNotingTime(dayjs(value));
                  }
                }}
              />
              <Box sx={{ py: 2 }}>
                <Button variant="contained" onClick={handleUpdateTimer}>
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

export default Timers;
