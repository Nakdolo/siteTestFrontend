import { Route, Routes } from "react-router-dom";

import Login from "./components/pages/login/login";
import Register from "./components/pages/registration/registration";
import TablePage from "./components/pages/home/home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/home" element={<TablePage />} />
      </Routes>
    </div>
  );
}

export default App;
