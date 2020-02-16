import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as AuthProvider } from './context/AuthContext'
import { Provider as PlanProvider } from './context/PlanContext'
import { Provider as PrepProvider } from './context/PrepContext'
import AppRouter from './routers/AppRouter'

const jsx = (
    <PrepProvider>
        <AuthProvider>
            <PlanProvider>
                <AppRouter />
            </PlanProvider>
        </AuthProvider>
    </PrepProvider>
)

ReactDOM.render(jsx, document.getElementById('app'))