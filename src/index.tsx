import * as React from "react";
import * as ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import {Provider} from 'react-redux'
import {persistor, store} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";

const rootElement = document.getElementById('root')
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}



