import React from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useParams
} from "react-router-dom";


import LoginUser from "./components/logins/login_usuario/LoginUser";
import HomeCliente from "./components/home/homeCliente/HomeCliente";
import LoginMaster from "./components/logins/login_master/LoginMaster";

const Rotas = () => {

    return (

        <Router>
            <Routes>
                <Route exact path="/loginMaster" element={<LoginMaster/>} />
                <Route exact path="/homecliente" element={<HomeCliente/>} />
                <Route exact path="/" element={<LoginUser/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </Router>


    )

}

export default Rotas;