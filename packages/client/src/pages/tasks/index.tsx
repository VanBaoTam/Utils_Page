import AddingForm from "@/components/task-management/AddingForm";
import { tasks } from "@/constants";
import { taskCols } from "@/types";
import {
  Box,
  Button,
  DataGrid,
  Dialog,
  DialogTitle,
  makeStyles,
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
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const handleCloseAdd = useCallback(() => {
    setIsOpenAdd(false);
  }, []);

  return (
    <Box className={classes.root}>
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
      <Box sx={{ pb: "1rem" }}>
        <Button
          variant="contained"
          onClick={() => {
            setIsOpenAdd(true);
          }}
        >
          Add
        </Button>
        <Button variant="contained" sx={{ ml: "3rem" }}>
          Update
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
        // onRowSelectionModelChange={handleSelectionModel}
      />
    </Box>
  );
}

export default Tasks;
