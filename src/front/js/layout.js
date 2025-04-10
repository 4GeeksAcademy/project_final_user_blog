import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Writer } from "./component/writer";
import { Reader } from "./component/reader";
import { Post } from "./component/post";
import { Comment } from "./component/comment";
import Login from "./component/login";
import { Bienvenida } from "./component/bienvenida";
import { BienvenidaReader } from "./component/bienvenidaReader";
import LoginReader from "./component/loginReader";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Writer />} path="/writer" />
                        <Route element={<Reader />} path="/reader" />
                        <Route element={<Post />} path="/post" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<LoginReader />} path="/logino" />
                        <Route element={<Bienvenida />} path="/bienvenida" />
                        <Route element={<BienvenidaReader />} path="/bienvenido" />
                        <Route element={<Comment />} path="/comment" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
