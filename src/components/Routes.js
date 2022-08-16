import React, { memo } from "react";

import { Routes , Route } from "react-router-dom";

import Landing from "../pages/Landing";

const Routing = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={< Landing />} />
        </Routes>
    );
}

Routing.propTypes = {
};

export default memo(Routing);
