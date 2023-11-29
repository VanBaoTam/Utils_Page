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
import { CssBaseline } from "@mui/material";

import Timers from "@pages/timers";
function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
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
    </BrowserRouter>
  );
}

export default App;
