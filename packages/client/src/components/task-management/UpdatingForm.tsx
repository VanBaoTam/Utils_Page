import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Button,
  TextField,
} from "@components/layout/mui-component";
import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { GridValidRowModel } from "@mui/x-data-grid";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";
import {
  gbAboveLabel,
  gbModalForm,
  gbSelectDropDown,
  gbSubmitButton,
} from "@/constants";
import { ETasksStatus, UpdatingFormProps } from "@/types";

//-----------------------------------------
//* Interfaces & Types
interface TaskFormData {
  name: string;
  status: string;
  description: string;
}

//-----------------------------------------
function UpdatingForm(props: UpdatingFormProps) {
  //-----------------------------------------
  const { handleRefreshUpdating, selectedId, data } = props ?? {};
  const [open, setOpen] = useState(true);
  const { register, handleSubmit } = useForm<TaskFormData>();
  const [selectedData, setSelectedData] = useState<
    GridValidRowModel | undefined
  >();
  const [startedDate, setStartedDate] = useState<any>(dayjs());
  const [notingDate, setNotingDate] = useState<any>(dayjs());
  const [finishedDate, setFinishedDate] = useState<any>(dayjs());
  const minDateTime = dayjs().subtract(1, "minute");
  //-----------------------------------------
  //* Funcs
  const onSubmit = useCallback(
    async (data: TaskFormData) => {
      console.log("DATA: ", data);
      console.log("STARTED DATE: ", startedDate.$d);
      console.log("NOTING DATE: ", notingDate.$d);
      console.log("FINISHED DATE: ", finishedDate.$d);
    },
    [selectedId]
  );
  const handleClose = useCallback(() => {
    setOpen(false);
    handleRefreshUpdating();
  }, [handleRefreshUpdating]);

  //-----------------------------------------
  useEffect(() => {
    const selectedData = data.find((item) => {
      return item.id == selectedId;
    });
    if (selectedData) {
      setSelectedData(selectedData);
      setStartedDate(selectedData.started_date);
      setNotingDate(selectedData.noting_date);
      setFinishedDate(selectedData.finished_date);
    }
    console.log(selectedData);
  }, [selectedId, data]);

  //-----------------------------------------
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={gbModalForm}>
        {selectedData && (
          <React.Fragment>
            <h2>Updating Task</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box display={"flex"} flexDirection={"column"}>
                <TextField
                  label="Task Name"
                  {...register("name")}
                  defaultValue={selectedData.name}
                  margin="normal"
                  sx={gbAboveLabel}
                />

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
                    sx={gbAboveLabel}
                  >
                    <MenuItem value={ETasksStatus.active}>Active</MenuItem>
                    <MenuItem value={ETasksStatus.suspended}>
                      Suspended
                    </MenuItem>
                    <MenuItem value={ETasksStatus.finished}>Finished</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Description"
                  {...register("description", { required: true })}
                  margin="normal"
                  sx={gbAboveLabel}
                />

                <Button
                  sx={gbSubmitButton}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Box>
            </form>
          </React.Fragment>
        )}
      </Box>
    </Modal>
  );
}

export default UpdatingForm;
