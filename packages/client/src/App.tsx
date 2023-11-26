import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@pages/home";
import Tasks from "@pages/tasks";
import Login from "@pages/account/login";
import SignUp from "@pages/account/signup";
import Notes from "@pages/notes";
import NotFound from "@pages/not-found";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
