import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@pages/home";
import Tasks from "@pages/tasks";
import Login from "@pages/account/login";
import SignUp from "@pages/account/signup";
import Notes from "@pages/notes";
import NotFound from "@pages/not-found";
import MainLayout from "@components/layout";
import { CssBaseline } from "@mui/material";
function App() {
  return (
    <MainLayout>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}

export default App;
