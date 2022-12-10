import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard/index"
import CreateNewProject from './pages/project/newProject/index'
import {default as ProjectDashboard} from "./pages/project/dashboard/index"
// import PlayGround from "./components/pg";

const ProjectRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/project/create" element={<CreateNewProject />} />
    <Route path="/project/dashboard/:key" element={<ProjectDashboard />} />
  </Routes>
);

export default ProjectRoutes;
