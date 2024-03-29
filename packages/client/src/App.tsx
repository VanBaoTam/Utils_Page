import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@pages/home";
import Tasks from "@pages/tasks";
import Login from "@pages/account/login";
import SignUp from "@pages/account/signup";
import Notes from "@pages/notes";
import NotFound from "@pages/not-found";
import MainLayout from "@components/layout";
import Calendars from "@pages/calendars";
// import Setting from "@pages/setting";
import Help from "@pages/help";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Timers from "@pages/timers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Toast from "./components/layout/toast";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import ProtectedRoutes from "./routes/protected-routes";
import Profile from "./pages/account/profile";
import LoggedRoutes from "./routes/logged-routes";
import ForgotPassword from "./pages/account/forgot-password";
import ResetPassword from "./pages/account/reset-password";

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
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route
                  path="/login"
                  element={
                    <ProtectedRoutes>
                      <Login />
                    </ProtectedRoutes>
                  }
                />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/profile"
                  element={
                    <LoggedRoutes>
                      <Profile />
                    </LoggedRoutes>
                  }
                />
                <Route
                  path="/forgot-password"
                  element={
                    <ProtectedRoutes>
                      <ForgotPassword />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="/reset-password/:id"
                  element={
                    <ProtectedRoutes>
                      <ResetPassword />
                    </ProtectedRoutes>
                  }
                />
                <Route path="/notes" element={<Notes />} />
                <Route path="/timers" element={<Timers />} />
                <Route path="/calendars" element={<Calendars />} />
                <Route path="/help" element={<Help />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
