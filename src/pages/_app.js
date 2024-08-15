import 'tailwindcss/tailwind.css'
import '../css/global.css'
import store from '@/redux/store'
import { Provider } from 'react-redux'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */


const App = ({ Component, pageProps }) => <Provider store={store}>
    <Component {...pageProps} />
</Provider>

export default App
