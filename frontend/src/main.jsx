import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store/Store.js'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <App />
    </Provider>
)
