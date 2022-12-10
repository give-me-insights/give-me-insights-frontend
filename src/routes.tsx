import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard/index"
// import PlayGround from "./components/pg";

const ProjectRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
  </Routes>
);

export default ProjectRoutes;
