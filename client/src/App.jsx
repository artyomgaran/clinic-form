import { Route, Routes } from "react-router-dom";
import { FormPage, LoginPage, BidsPage } from "./pages";

import "./App.css";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/bids" element={<BidsPage />} />
      </Routes>
    </>
  );
};

export default App;
