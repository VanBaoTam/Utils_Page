import { useState, useCallback, ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@components/layout/mui-component";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

//-----------------------------------------
//* Interfaces & Types
export interface DialogTitleProps {
  id: string;
  children?: ReactNode;
  onClose: () => void;
}
interface NotificationProps {
  title: string;
  message: string;
}

//-----------------------------------------
//* Styles
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

//-----------------------------------------
function BootstrapDialogTitle(props: DialogTitleProps) {
  //-----------------------------------------
  //* Props & States
  const { children, onClose, ...other } = props ?? {};

  //-----------------------------------------
  return (
    <DialogTitle sx={{ m: 0, p: 2, width: "20rem" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

//-----------------------------------------
export default function Notification(props: NotificationProps) {
  //-----------------------------------------
  //* Props & States
  const { title, message } = props ?? {};
  const [open, setOpen] = useState(true);

  //-----------------------------------------
  //* Funcs
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  //-----------------------------------------
  return (
    <div>
      <BootstrapDialog onClose={handleClose} open={open}>
        <BootstrapDialogTitle
          id="Notification-Dialog-Title"
          onClose={handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Xác Nhận
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
