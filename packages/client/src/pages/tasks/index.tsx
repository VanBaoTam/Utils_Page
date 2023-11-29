import { tasks } from "@/constants";
import { taskCols } from "@/types";
import { Box, DataGrid, makeStyles } from "@components/layout/mui-component";

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
  return (
    <Box className={classes.root}>
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
