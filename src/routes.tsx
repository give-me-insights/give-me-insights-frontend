import React from "react";
import { Route, Routes } from "react-router-dom";

import PlayGround from "./components/pg";

const ProjectRoutes = () => (
  <Routes>
    <Route path="/" element={<PlayGround />} />
  </Routes>
);

export default ProjectRoutes;
