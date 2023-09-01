import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Analytics } from '@vercel/analytics/react'
import { store } from './store/index.ts'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
            <Analytics />
        </React.StrictMode>
    </Provider>
)
