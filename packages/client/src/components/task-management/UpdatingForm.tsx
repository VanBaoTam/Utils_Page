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
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";
import { gbModalForm, gbSelectDropDown, gbSubmitButton } from "@/constants";
import { ETasksStatus, TTask, UpdatingFormProps } from "@/types";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { updateTask } from "@/slices/task";
import { displayToast } from "@/utils/toast";

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
  const dispatch = useAppDispatch();
  const taskSelector = useAppSelector((store) => store.task);
  const { register, handleSubmit } = useForm<TaskFormData>();
  const [description, setDescription] = useState<string>();
  const [status, setStatus] = useState<ETasksStatus>();
  const [selectedData, setSelectedData] = useState<TTask>();
  const [startedDate, setStartedDate] = useState<any>();
  const [notingDate, setNotingDate] = useState<any>();
  const [finishedDate, setFinishedDate] = useState<any>();
  const minDateTime = dayjs().subtract(3, "minute");
  //-----------------------------------------
  //* Funcs
  const onSubmit = useCallback(
    (data: TaskFormData) => {
      if (finishedDate <= notingDate || notingDate <= startedDate) {
        displayToast(
          "Keep Finished date > Noting date > Started date",
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
      const updatedTask: TTask = {
        id: selectedId,
        user_id: selectedData?.user_id || 1,
        name: data.name,
        description: data.description,
        status: EStatus || ETasksStatus.suspended,
        created_date: selectedData?.created_date || new Date(),
        started_date: startedDate,
        noting_date: notingDate,
        finished_date: finishedDate,
      };
      console.log(updatedTask);
      dispatch(updateTask(updatedTask));
      handleClose();
    },
    [selectedId]
  );
  const handleClose = useCallback(() => {
    setOpen(false);
    handleRefreshUpdating();
  }, [handleRefreshUpdating]);

  //-----------------------------------------
  useEffect(() => {
    const selectedData = taskSelector.find((item) => {
      return item.id == selectedId;
    });
    if (selectedData) {
      console.log(selectedData);
      setSelectedData(selectedData);
      setDescription(selectedData.description);
      setStatus(selectedData.status);
      setStartedDate(dayjs(selectedData.started_date.toISOString()));
      setNotingDate(dayjs(selectedData.noting_date.toISOString()));
      setFinishedDate(dayjs(selectedData.finished_date.toISOString()));
    }
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
                />

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
                    defaultValue={status}
                    {...register("status")}
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
                  defaultValue={description}
                  {...register("description", { required: true })}
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
