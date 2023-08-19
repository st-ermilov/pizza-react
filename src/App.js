import './styles/app.scss'
import Header from "./components/Header";
import React from "react";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Basket from "./pages/Basket";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <div className="App">
            <div className="wrapper">
                <Header/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/basket' element={<Basket/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </div>
        </div>

    );
}

export default App;
