import Notification from "@/components/modal";
import AddingForm from "@/components/task-management/AddingForm";
import UpdatingForm from "@/components/task-management/UpdatingForm";
import { tasks } from "@/constants";
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

  const handleUpdate = useCallback(() => {
    if (ids.length == 1) {
      setSelectedId(ids[0]);
      setUpdate(true);
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
  }, [ids]);
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
          message="Xin hãy chọn duy nhất 1 hàng mỗi lần cập nhật!!!"
        />
      )}
      {noneIsSelected && (
        <Notification
          title="Alert None Selection"
          message="Please choose one task!"
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
      {update && selectedId && (
        <UpdatingForm
          data={tasks}
          selectedId={selectedId}
          handleRefreshUpdating={handleRefreshUpdating}
        />
      )}
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
            handleUpdate();
          }}
          sx={{ marginX: "1.5rem" }}
        >
          Update Task
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            console.log("DELETE EVENT");
          }}
          sx={{ marginX: "0.5rem" }}
        >
          Delete Task
        </Button>
      </Box>
      <DataGrid
        rows={tasks}
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
