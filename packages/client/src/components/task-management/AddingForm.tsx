import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { ETasksStatus, TTask } from "@/types";
import { gbSelectDropDown } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { createTask } from "@/slices/task";
import { displayToast } from "@/utils/toast";
//-----------------------------------------
interface TaskFormData {
  name: string;
  status: string;
  description: string;
}

const minDateTime = dayjs().subtract(3, "minute");
//-----------------------------------------
function AddingForm(props: { handleCloseAdd: () => void }) {
  const { handleCloseAdd } = props;
  const dispatch = useAppDispatch();
  const taskSelector = useAppSelector((store) => store.task);
  const [startedDate, setStartedDate] = useState<any>(dayjs());
  const [notingDate, setNotingDate] = useState<any>(dayjs());
  const [finishedDate, setFinishedDate] = useState<any>(dayjs());
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TaskFormData>();

  //-----------------------------------------
  const onSubmit = useCallback(
    (data: TaskFormData) => {
      if (notingDate <= startedDate) {
        displayToast(
          "Please make sure Noting Date is later than Started Date",
          "error"
        );
        return;
      }
      if (finishedDate <= notingDate) {
        displayToast(
          "Please make sure Finished Date is later than Noting Date",
          "error"
        );
        return;
      }
      let EStatus;
      switch (data.status) {
        case ETasksStatus.active: {
          EStatus = ETasksStatus.active;
          break;
        }
        case ETasksStatus.suspended: {
          EStatus = ETasksStatus.suspended;
          break;
        }
        case ETasksStatus.expired: {
          EStatus = ETasksStatus.expired;
          break;
        }
        case ETasksStatus.finished: {
          EStatus = ETasksStatus.finished;
          break;
        }
      }
      const newTask: TTask = {
        id: taskSelector.ids + 1,
        user_id: 1,
        name: data.name,
        description: data.description,
        status: EStatus || ETasksStatus.active,
        created_date: new Date(),
        started_date: startedDate,
        noting_date: notingDate,
        finished_date: finishedDate,
      };
      dispatch(createTask(newTask));
      handleCloseAdd();
    },

    [handleCloseAdd, startedDate, notingDate, finishedDate]
  );

  //-----------------------------------------
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={"flex"} flexDirection={"column"}>
          <TextField
            label="Task Name"
            {...register("name", { required: true })}
            margin="normal"
          />
          {errors.name && (
            <span style={{ color: "#BF2C34" }}>This field is required</span>
          )}
          <br />
          <MobileDateTimePicker
            label="Started Date"
            value={dayjs(startedDate)}
            minDateTime={minDateTime}
            onChange={(value: any) => {
              setStartedDate(dayjs(value));
            }}
          />
          <br />
          <MobileDateTimePicker
            label="Noting Time"
            value={dayjs(notingDate)}
            minDateTime={minDateTime}
            onChange={(value: any) => {
              setNotingDate(dayjs(value));
            }}
          />
          <br />
          <MobileDateTimePicker
            label="Finished Date"
            value={dayjs(finishedDate)}
            minDateTime={minDateTime}
            onChange={(value: any) => {
              setFinishedDate(dayjs(value));
            }}
          />
          <FormControl margin="normal">
            <InputLabel id="status-label" sx={gbSelectDropDown}>
              Status
            </InputLabel>
            <Select
              labelId="status-label"
              id="status"
              defaultValue=""
              {...register("status")}
            >
              <MenuItem value={ETasksStatus.active}>Active</MenuItem>
              <MenuItem value={ETasksStatus.suspended}>Suspended</MenuItem>
              <MenuItem value={ETasksStatus.finished}>Finished</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Description"
            {...register("description", { required: true })}
            margin="normal"
          />
          {errors.description && (
            <span style={{ color: "#BF2C34" }}>This field is required</span>
          )}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default AddingForm;
