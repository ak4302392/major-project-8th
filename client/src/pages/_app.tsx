import history from '@/app/history';
import store from '@/app/state';
import { SettingsConsumer, SettingsProvider } from '@/contexts/settings-context';
import '@/styles/globals.css';
import { createTheme } from '@/theme';
import { ThemeProvider } from '@mui/system';
import { ConnectedRouter } from 'connected-react-router';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
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
                <Component {...pageProps} />
              </ThemeProvider>
            )}
          </SettingsConsumer>
        </SettingsProvider>
      {/* </ConnectedRouter> */}
    </Provider>
  );
}
