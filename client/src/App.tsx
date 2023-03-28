import history from './app/history';
import store, { configureAppStore, persistor } from './app/state';
import { SettingsConsumer, SettingsProvider } from './contexts/settings-context';
import './styles/globals.css';
import { createTheme } from './theme';
import { ThemeProvider } from '@mui/system';
import { Provider, useDispatch } from 'react-redux';
import AppRouter from './routing/AppRouter';
import IndeterminateLoader from './components/core/loader/IndeterminateLoader';
import CustomizedSnackbars from './components/core/alert/alert';
import { PersistGate } from 'redux-persist/integration/react';
import { AppDispatch } from './app/type';
import { getAllEvents, GetAllEventsAsync } from './components/auth/organizerAuthSlice';

export default function App() {
  return (
    <Provider store={store}>
      {/* <ConnectedRouter history={history}> */}
      <PersistGate loading={null} persistor={persistor}>
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings, saveSettings }) => (
              <ThemeProvider
                theme={createTheme({
                  direction: settings.direction,
                  responsiveFontSizes: settings.responsiveFontSizes,
                  mode: settings.theme,
                })}
              >
                <IndeterminateLoader />
                <CustomizedSnackbars />
                <AppRouter />
              </ThemeProvider>
            )}
          </SettingsConsumer>
        </SettingsProvider>
        {/* </ConnectedRouter> */}
      </PersistGate>
    </Provider>
  );
}
