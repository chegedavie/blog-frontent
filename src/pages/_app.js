import 'tailwindcss/tailwind.css'
import '../css/global.css'
import store from '@/redux/store'
import { Provider } from 'react-redux'

const App = ({ Component, pageProps }) => <Provider store={store}>
    <Component {...pageProps} />
</Provider>

export default App
