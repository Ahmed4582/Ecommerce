import ReactDOM from 'react-dom/client';
import AppRouters from '@components/routs/AppRouters';
// redux
import { Provider } from 'react-redux';
import {store, persistor} from '@components/store/index';
import { PersistGate } from 'redux-persist/integration/react';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';

// axios
import "./components/servies/axios-global.js";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppRouters/>
        </PersistGate>
        
    </Provider>
);
