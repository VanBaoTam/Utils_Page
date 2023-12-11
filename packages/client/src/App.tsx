import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@pages/home";
import Tasks from "@pages/tasks";
import Login from "@pages/account/login";
import SignUp from "@pages/account/signup";
import Notes from "@pages/notes";
import NotFound from "@pages/not-found";
import MainLayout from "@components/layout";
import Calendars from "@pages/calendars";
import Setting from "@pages/setting";
import Help from "@pages/help";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Timers from "@pages/timers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Toast from "./components/layout/toast";
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
const theme = createTheme({});
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <CssBaseline />
        <Toast />
        <ThemeProvider theme={theme}>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<Tasks />}></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/timers" element={<Timers />} />
              <Route path="/calendars" element={<Calendars />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </ThemeProvider>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
