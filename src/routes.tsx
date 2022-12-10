import React from "react";
import { Route, Routes } from "react-router-dom";

import Auth from "./pages/auth";
import PlayGround from "./components/pg";

const ProjectRoutes = () => (
  <Routes>
    <Route path="/" element={<Auth />} />
  </Routes>
);

export default ProjectRoutes;
