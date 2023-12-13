import { SxProps } from "@mui/material";
// eslint-disable-next-line react-refresh/only-export-components

const gbModalForm: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "1px solid grey",
  boxShadow: 24,
  p: 4,
  height: "80%",
};
const gbSelectDropDown: SxProps = {
  zIndex: 20,
  display: "block",
  background: "white",
  borderRadius: "4px",
};
const gbSubjectTitle: SxProps = {
  fontWeight: "400",
  width: "50%",
  display: "inline-block",
  fontSize: "1.5rem",
  lineHeight: "1.334",
  letterSpacing: "0em",
  margin: "0",
};
const gbFilterTitle: SxProps = {
  fontWeight: "400",
  width: "50%",
  display: "inline-block",
  fontSize: "1.5rem",
  lineHeight: "1.334",
  letterSpacing: "0em",
  margin: "0",
};
const gbSubmitButton: SxProps = {
  marginTop: "20px",
};
const gbLoginInput: SxProps = {
  width: "70%",
};
export {
  gbModalForm,
  gbSelectDropDown,
  gbSubjectTitle,
  gbFilterTitle,
  gbSubmitButton,
  gbLoginInput,
};
