import * as React from "react";
import * as ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import {Provider} from 'react-redux'
import {store} from "./redux/store";

const rootElement = document.getElementById('root')
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    );
}



