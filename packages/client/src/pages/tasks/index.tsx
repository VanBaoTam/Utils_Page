import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import AddingForm from "@/components/task-management/AddingForm";
import UpdatingForm from "@/components/task-management/UpdatingForm";
import { useDataProvider } from "@/hooks/useProvider";
import { checkStatus, deleteTask, loadTaskContents } from "@/slices/task";
import { taskCols } from "@/types";
import { displayToast } from "@/utils/toast";
import {
  Box,
  Button,
  DataGrid,
  Dialog,
  DialogTitle,
  makeStyles,
  Typography,
} from "@components/layout/mui-component";
import { DialogContent } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
enum EType {
  update = "update",
  delete = "delete",
}

const useStyles = makeStyles((theme: any) => ({
  root: {
    "& .MuiDataGrid-root": {
      height: "100%",
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      "& .MuiDataGrid-root": {
        height: "80vh",
      },
    },
  },
}));
function Tasks() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const taskSelector = useAppSelector((store) => store.task.list);
  const accountSelector = useAppSelector((store) => store.account);
  const provider = useDataProvider();
  const [ids, setIds] = useState<number[]>([]);
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const handleCloseAdd = useCallback(() => {
    setIsOpenAdd(false);
  }, []);
  const handleRefreshUpdating = useCallback(() => {
    setUpdate(false);
  }, []);
  const handleSelect = useCallback(
    (type: string) => {
      if (ids.length == 1) {
        if (type === EType.update) {
          setSelectedId(ids[0]);
          setUpdate(true);
        } else {
          dispatch(deleteTask(ids[0]));
          displayToast("Delete task successfully", "success");
        }
      } else if (ids.length > 1) {
        displayToast("Please select only 1 task per operation!!!", "error");
      } else {
        displayToast("Please select 1 task!!!", "error");
      }
    },
    [ids]
  );
  const handleSelectionModel = useCallback((ids: any[]) => {
    if (!ids.length) {
      return;
    }

    setIds(ids);
  }, []);
  const handleLoadTask = async () => {
    setIsLoading(true);
    if (!accountSelector.isLogged) {
      displayToast("You should log in to store your data!", "info");
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
        path: "tasks/load-content",
      });
      if (resp.status === 200) {
        displayToast(resp.data.message, "success");
        dispatch(loadTaskContents(resp.data.tasks));
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

  const handleSaveTask = async () => {
    if (!accountSelector.isLogged) {
      displayToast("You should log in to store your data!", "info");
      setIsSaving(false);
      return;
    }
    if (taskSelector.length <= 0) {
      displayToast("Please create at least 1 task to store!!!", "error");
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
          path: "tasks/save-content",
          body: { data: taskSelector },
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
    dispatch(checkStatus());
  }, [taskSelector]);
  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="h3" sx={{ paddingBottom: "20px " }}>
          Tasks
        </Typography>
      </Box>

      <Dialog
        open={isOpenAdd}
        onClose={handleCloseAdd}
        maxWidth={"md"}
        fullWidth
      >
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <AddingForm handleCloseAdd={handleCloseAdd} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={update}
        onClose={handleRefreshUpdating}
        maxWidth={"md"}
        fullWidth
      >
        <DialogTitle>Updating Task</DialogTitle>
        <DialogContent>
          <UpdatingForm
            data={taskSelector}
            selectedId={selectedId}
            handleRefreshUpdating={handleRefreshUpdating}
          />
        </DialogContent>
      </Dialog>

      <Box sx={{ pb: "1rem" }}>
        <Button
          variant="contained"
          onClick={() => {
            setIsOpenAdd(true);
          }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleSelect(EType.update);
          }}
          sx={{ marginX: "1.5rem" }}
        >
          Update Task
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleSelect(EType.delete);
          }}
          sx={{ marginX: "0.5rem" }}
        >
          Delete Task
        </Button>

        <Button
          disabled={isLoading}
          variant="contained"
          onClick={handleLoadTask}
          sx={{
            bgcolor: "#4CAF50",
            float: "right",

            "&:hover": {
              bgcolor: "#45a049",
            },
          }}
        >
          Load Tasks
        </Button>
        <Button
          disabled={isSaving}
          variant="contained"
          onClick={handleSaveTask}
          sx={{
            bgcolor: "#4CAF50",
            float: "right",
            marginRight: "2rem",
            "&:hover": {
              bgcolor: "#45a049",
            },
          }}
        >
          Save Tasks
        </Button>
      </Box>
      <DataGrid
        rows={taskSelector}
        columns={taskCols}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionModel}
      />
    </Box>
  );
}

export default Tasks;
