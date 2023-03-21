import history from './app/history';
import store from './app/state';
import { SettingsConsumer, SettingsProvider } from './contexts/settings-context';
import './styles/globals.css';
import { createTheme } from './theme';
import { ThemeProvider } from '@mui/system';
import { Provider } from 'react-redux';
import AppRouter from './routing/AppRouter';
import IndeterminateLoader from './components/core/loader/IndeterminateLoader';
import CustomizedSnackbars from './components/core/alert/alert';

export default function App() {
  return (
    <Provider store={store}>
      {/* <ConnectedRouter history={history}> */}
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
    </Provider>
  );
}
