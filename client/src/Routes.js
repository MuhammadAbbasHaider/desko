import React from "react";
import { Route, Routes } from "react-router-dom";
import Timetracker from "./Pages/TimeTracker/Timetracker";

const Routess = () => {
  return (
    <Routes>
      <Route path="/" element={<Timetracker />} />
    </Routes>
  );
};

export default Routess;
