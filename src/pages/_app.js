// src/pages/_app.js
import { Provider } from 'react-redux';
import { CookiesProvider } from 'next-client-cookies';
import { store, persistor } from '../src/lib/store'; // Asegúrate de que la ruta sea correcta
import { PersistGate } from 'redux-persist/integration/react'; // Necesario para persistencia
import '../src/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
