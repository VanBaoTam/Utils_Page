import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { ETasksStatus } from "@/types";
import { gbAboveLabel, gbSelectDropDown } from "@/constants";
//-----------------------------------------
interface TaskFormData {
  name: string;
  status: string;
  description: string;
}

const minDateTime = dayjs().subtract(1, "minute");
//-----------------------------------------
function AddingForm(props: { handleCloseAdd: (props: any) => void }) {
  const { handleCloseAdd } = props;
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
    async (data: TaskFormData) => {
      console.log("DATA: ", data);
      console.log("STARTED DATE: ", startedDate.$d);
      console.log("NOTING DATE: ", notingDate.$d);
      console.log("FINISHED DATE: ", finishedDate.$d);
    },

    [handleCloseAdd]
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
              setStartedDate(dayjs(value).format("YYYY-MM-DDTHH:mm:ss"));
            }}
          />
          <br />
          <MobileDateTimePicker
            label="Noting Time"
            value={dayjs(notingDate)}
            minDateTime={minDateTime}
            onChange={(value: any) => {
              setNotingDate(dayjs(value).format("YYYY-MM-DDTHH:mm:ss"));
            }}
          />
          <br />
          <MobileDateTimePicker
            label="Finished Date"
            value={dayjs(finishedDate)}
            minDateTime={minDateTime}
            onChange={(value: any) => {
              setFinishedDate(dayjs(value).format("YYYY-MM-DDTHH:mm:ss"));
            }}
          />
          <FormControl margin="normal" sx={gbAboveLabel}>
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
            sx={gbAboveLabel}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default AddingForm;
