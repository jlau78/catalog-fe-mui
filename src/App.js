import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {Provider as ReduxProvider} from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
// redux
import { store, persistor } from './redux/store';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// locales
import ThemeLocalization from './locales/ThemeLocalization';
// components
import {StyledChart} from './components/chart';
import ScrollToTop from './components/scroll-to-top';

import { ThemeSettings, SettingsProvider } from './components/settings';

import {AuthProvider} from './auth/JwtContext';

// ----------------------------------------------------------------------

export default function App() {
    return (
        <AuthProvider>
            <ReduxProvider store={store}>
              <PersistGate loading={null} persistor={persistor}>

                <HelmetProvider>
                    <SettingsProvider>
                        <BrowserRouter>
                            <ThemeProvider>
                                <ThemeSettings>
                                    <ThemeLocalization>
                                        <ScrollToTop/>
                                        <StyledChart/>
                                        <Router/>
                                    </ThemeLocalization>
                                </ThemeSettings>
                            </ThemeProvider>
                        </BrowserRouter>
                    </SettingsProvider>

                </HelmetProvider>
              </PersistGate>
            </ReduxProvider>
        </AuthProvider>
    );
}
