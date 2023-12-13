import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import Notification from "@/components/modal";
import AddingForm from "@/components/task-management/AddingForm";
import UpdatingForm from "@/components/task-management/UpdatingForm";
import { deleteTask } from "@/slices/task";
import { taskCols } from "@/types";
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
import { useCallback, useState } from "react";
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
  const [ids, setIds] = useState<number[]>([]);
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false);
  const [noneIsSelected, setNoneIsSelected] = useState<boolean>(false);
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
        }
      } else if (ids.length > 1) {
        setIsMultiSelect(true);
        setTimeout(() => {
          setIsMultiSelect(false);
        }, 5000);
      } else {
        setNoneIsSelected(true);
        setTimeout(() => {
          setNoneIsSelected(false);
        }, 5000);
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
  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="h3" sx={{ paddingBottom: "20px " }}>
          Tasks
        </Typography>
      </Box>
      {isMultiSelect && (
        <Notification
          title="Alert Multi Selection"
          message="Please select only 1 task per operation!!!"
        />
      )}
      {noneIsSelected && (
        <Notification
          title="Alert None Selection"
          message="Please select 1 task before!!!"
        />
      )}
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
