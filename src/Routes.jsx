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
import CadastrarLoja from "./components/cadastrarLoja/CadastrarLoja";
import HomeEmployee from './components/home/homeEMPLOYEE/HomeEmployee';
import HomePerfil from "./components/home/homeOwnerMaster/HomePerfil";

import Teste from "./components/home/testeRedux";

const Rotas = () => {

    return (

        <Router>
            <Routes>

                <Route  path="/homePerfil/:config" element={<HomePerfil />} />
                <Route  path="/homePerfil" element={<HomePerfil />} />
                <Route exact path="/homeEmployee" element={<HomeEmployee />} />
                <Route exact path="/teste" element={<Teste />} />
                <Route exact path="/cadastrarLoja" element={<CadastrarLoja />} />
                <Route exact path="/homecliente" element={<HomeCliente />} />
                <Route exact path="/" element={<LoginUser />} />
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>
        </Router>


    )

}

export default Rotas;