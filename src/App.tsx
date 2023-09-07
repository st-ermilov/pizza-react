import './styles/app.scss'
import {Header, Loader} from "./components";
import React from "react";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";

const Basket = React.lazy(() => import(/* webpackChunkName: 'Basket'*/'./pages/Basket'));
const SinglePizza = React.lazy(() => import(/* webpackChunkName: 'SinglePizza'*/'./pages/SinglePizza'))
const NotFound = React.lazy(() => import(/* webpackChunkName: 'NotFound'*/'./pages/NotFound'))

function App() {
    return (
        <div className="App">
            <div className="wrapper">
                <Header/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/basket'
                           element={<React.Suspense fallback={<Loader/>}><Basket/></React.Suspense>}/>
                    <Route path='/pizza/:id'
                           element={<React.Suspense fallback={<Loader/>}><SinglePizza/></React.Suspense>}/>
                    <Route path='*' element={<React.Suspense fallback={<Loader/>}><NotFound/></React.Suspense>}/>
                </Routes>
            </div>
        </div>

    );
}

export default App;
