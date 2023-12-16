import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField,
} from "@components/layout/mui-component";
import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { gbSelectDropDown, gbSubmitButton } from "@/constants";
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
  const [status, setStatus] = useState<string>();
  const [selectedData, setSelectedData] = useState<TTask>();
  const [startedDate, setStartedDate] = useState<any>();
  const [notingDate, setNotingDate] = useState<any>();
  const [finishedDate, setFinishedDate] = useState<any>();
  const minDateTime = dayjs().subtract(3, "minute");
  //-----------------------------------------
  //* Funcs
  const onSubmit = (data: TaskFormData) => {
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
    dispatch(updateTask(updatedTask));
    handleClose();
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    handleRefreshUpdating();
  }, [handleRefreshUpdating]);

  //-----------------------------------------
  useEffect(() => {
    const selectedData = taskSelector.list.find((item) => {
      return item.id == selectedId;
    });
    if (selectedData) {
      setDescription(selectedData.description);
      setStatus(selectedData.status);
      setStartedDate(dayjs(selectedData.started_date));
      setNotingDate(dayjs(selectedData.noting_date));
      setFinishedDate(dayjs(selectedData.finished_date));
      setSelectedData(selectedData);
    }
  }, [selectedId, data]);

  //-----------------------------------------
  return (
    <Box>
      {selectedData && (
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
                setStartedDate(dayjs(value).toDate());
              }}
            />
            <br />
            <MobileDateTimePicker
              label="Noting Time"
              value={dayjs(notingDate)}
              minDateTime={minDateTime}
              onChange={(value: any) => {
                setNotingDate(dayjs(value).toDate());
              }}
            />
            <br />
            <MobileDateTimePicker
              label="Finished Date"
              value={dayjs(finishedDate)}
              minDateTime={minDateTime}
              onChange={(value: any) => {
                setFinishedDate(dayjs(value).toDate());
              }}
            />
            <FormControl margin="normal">
              <InputLabel id="status-label" sx={gbSelectDropDown}>
                Status
              </InputLabel>
              <Select
                labelId="status-label"
                id="status"
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                }}
              >
                <MenuItem value={ETasksStatus.active}>Active</MenuItem>
                <MenuItem value={ETasksStatus.suspended}>Suspended</MenuItem>
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
      )}
    </Box>
  );
}

export default UpdatingForm;
