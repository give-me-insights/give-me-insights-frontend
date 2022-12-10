import React from "react";

import GridBar from "./GridBar";

import Divider from '@mui/material/Divider';

type Props = {
    children: JSX.Element
}

const Layout = ({children}: Props) => (
    <div>
        <GridBar/>
        <Divider/>
        {children}
    </div>
)

export default Layout;
