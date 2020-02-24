import createDataContext from './createDataContext'
import workoutSharerApi from '../api/workoutSharer'
import Cookies from 'js-cookie'
const tertiaryColors = [
    { color: 'blue', light: '#155eb0', dark: '#063770' },
    { color: 'green', light: '#539c49', dark: '#3b7534' },
    { color: 'pink', light: '#cf7a9c', dark: '#a15f79' },
    { color: 'purple', light: '#58138f', dark: '#480f75' },
    { color: 'red', light: '#cf4015', dark: '#8f3114' },
    { color: 'orange', light: '#cc7e1f', dark: '#a36315' },
    { color: 'teal', light: '#10b09c', dark: '#0e8071' }
]

const planReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_IS_LOGGED_IN':
            return { ...state, isLoggedIn: action.payload}
        case 'SET_THEME':
            return { ...state, ...action.payload }
        case 'SET_ACCENT_COLOR':
            return { ...state, tertiary: action.payload }
        default:
            return state
    }
}

const checkIfLoggedIn = dispatch => async () => {
    const token = Cookies.get('token')

    try {
        const theme = localStorage.getItem('theme')

        const acccentColorName = localStorage.getItem('accentColor')
        const accentColor = tertiaryColors.find((item) => item.color == acccentColorName)

        if(theme == 'light') {
            dispatch({ type: 'SET_THEME', payload: { theme: 'light', primary: '#F9F9F9', secondary: '#ffffff', tertiary: accentColor ? accentColor[theme] : '#155eb0', contrast: '#16181b' } })
        }
        else {
            dispatch({ type: 'SET_THEME', payload: { theme: 'dark', primary: '#030304', secondary: '#161618', tertiary: accentColor ? accentColor[theme] : '#043166', contrast: '#cdd1d4' } })
        }
        
        const link = document.querySelector("link[rel*='icon']")
        if(theme == 'light') {
            link.href = '/assets/dark-logo.png'
        }else {
            link.href = '/assets/light-logo.png'
        }

        if(!token) {
            dispatch({ type: 'ADD_IS_LOGGED_IN', payload: false })
            return 
        }

        const response = await workoutSharerApi.post('/validate-user', { token })

        if(response.data.isLoggedIn) {
            window.location.href = '/about'
        }

        dispatch({ type: 'ADD_IS_LOGGED_IN', payload: response.data.isLoggedIn })
    }catch(err) {
        console.log(err.message)
    }
}

const checkIfNotLoggedIn = dispatch => async () => {
    const token = Cookies.get('token')
    
    try {
        const theme = localStorage.getItem('theme')

        const acccentColorName = localStorage.getItem('accentColor')
        
        const accentColor = tertiaryColors.find((item) => item.color == acccentColorName)

        if(theme == 'light') {
            dispatch({ type: 'SET_THEME', payload: { theme: 'light', primary: '#F9F9F9', secondary: '#ffffff', tertiary: accentColor ? accentColor[theme] : '#155eb0', contrast: '#16181b' } })
        }
        else {
            dispatch({ type: 'SET_THEME', payload: { theme: 'dark', primary: '#030304', secondary: '#161618', tertiary: accentColor ? accentColor[theme] : '#043166', contrast: '#cdd1d4' } })
        }
        
        const link = document.querySelector("link[rel*='icon']")
        if(theme == 'light') {
            link.href = '/assets/dark-logo.png'
        }else {
            link.href = '/assets/light-logo.png'
        }

        if(!token) {
            window.location.href = '/signin'
            return 
        }

        const response = await workoutSharerApi.post('/validate-user', { token })

        if(!response.data.isLoggedIn) {
            window.location.href = '/signin'
        }

        dispatch({ type: 'ADD_IS_LOGGED_IN', payload: response.data.isLoggedIn })
    }catch(err) {
        if(err.message == 'Network Error') {
            window.location.href = '/signin'
        }else {
            console.log(err.message)
        }
    }
}

const changeTheme = dispatch => ({ theme }) => {
    localStorage.setItem('theme', theme)
    
    const acccentColorName = localStorage.getItem('accentColor')
    const accentColor = tertiaryColors.find((item) => item.color == acccentColorName)

    if(theme == 'light') {
        dispatch({ type: 'SET_THEME', payload: { theme: 'light', primary: '#F9F9F9', secondary: '#ffffff', tertiary: accentColor ? accentColor[theme] : '#155eb0', contrast: '#16181b' } })
    }
    else {
        dispatch({ type: 'SET_THEME', payload: { theme: 'dark', primary: '#030304', secondary: '#161618', tertiary: accentColor ? accentColor[theme] : '#155eb0', contrast: '#cdd1d4' } })
    }
        
    const link = document.querySelector("link[rel*='icon']")
    const body = document.getElementById('the_body')
    if(theme == 'light') {
        link.href = '/assets/dark-logo.png'
        body.style.background = '#ffffff'
    }else {
        link.href = '/assets/light-logo.png'
        body.style.background = '#f7f7f7'
    }
}

const changeAccentColor = dispatch => ({ color }) => {
    localStorage.setItem('accentColor', color)

    const theme = localStorage.getItem('theme')
    const accentColor = tertiaryColors.find((item) => item.color == color)[theme ? theme : 'dark']

    dispatch({ type: 'SET_ACCENT_COLOR', payload: accentColor })
}

export const { Provider, Context } = createDataContext(
    planReducer,
    { checkIfNotLoggedIn, checkIfLoggedIn, changeTheme, changeAccentColor },
    { isLoggedIn: null, theme: 'dark', primary: '#030304', secondary: '#161618', tertiary: '#043166', contrast: '#cdd1d4' }
)