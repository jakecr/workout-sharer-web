import createDataContext from './createDataContext'
import workoutSharerApi from '../api/workoutSharer'
import Cookies from 'js-cookie'
const tertiaryColors = [
    { color: 'blue', light: '#1d63b5', dark: '#1254a1' },
    { color: 'green', light: '#539c49', dark: '#3b7534' },
    { color: 'pink', light: '#cf7a9c', dark: '#a15f79' },
    { color: 'purple', light: '#9c62cc', dark: '#894abd' },
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
        case 'SET_IS_SIMPLE': 
            return { ...state, isSimple : action.payload }
        default:
            return state
    }
}

const checkIfLoggedIn = dispatch => async () => {
    if(window.location.hostname == 'workout-sharer-web.herokuapp.com' || window.location.protocol !== 'https:') {
        // window.location.href = 'https://www.workoutsharer.com' + window.location.pathname
    }

    const token = Cookies.get('token')

    try {
        const isSimple = localStorage.getItem('isSimple') == false ? false : true
        dispatch({ type: 'SET_IS_SIMPLE', payload: isSimple })

        const theme = localStorage.getItem('theme')
        
        const link = document.querySelector("link[rel*='icon']")
        const body = document.getElementById('the_body')

        const acccentColorName = localStorage.getItem('accentColor')
        const accentColor = tertiaryColors.find((item) => item.color == acccentColorName)
        if(theme == 'dark') {
            link.href = '/assets/light-logo.png'
            body.style.background = '#f7f7f7'
            dispatch({ type: 'SET_THEME', payload: { theme: 'dark', primary: '#030304', secondary: '#161618', tertiary: accentColor ? accentColor[theme] : '#043166', contrast: '#cdd1d4' } })
        }else {
            link.href = '/assets/dark-logo.png'
            body.style.background = '#ffffff'
            dispatch({ type: 'SET_THEME', payload: { theme: 'light', primary: '#efefef', secondary: '#ffffff', tertiary: accentColor ? accentColor[theme] : '#155eb0', contrast: '#16181b' } })
        }

        if(!token) {
            dispatch({ type: 'ADD_IS_LOGGED_IN', payload: false })
            return 
        }

        const response = await workoutSharerApi.post('/validate-user', { token })

        if(response.data.isLoggedIn) {
            window.location.href = '/'
        }

        dispatch({ type: 'ADD_IS_LOGGED_IN', payload: response.data.isLoggedIn })
    }catch(err) {
        console.log(err.message)
    }
}

const checkIfNotLoggedIn = dispatch => async () => {
    if(window.location.hostname == 'workout-sharer-web.herokuapp.com' || window.location.protocol !== 'https:') {
        // window.location.href = 'https://www.workoutsharer.com' + window.location.pathname
    }

    const token = Cookies.get('token')
    
    try {
        const isSimple = localStorage.getItem('isSimple') == false ? false : true
        dispatch({ type: 'SET_IS_SIMPLE', payload: isSimple })

        const theme = localStorage.getItem('theme')
        
        const link = document.querySelector("link[rel*='icon']")
        const body = document.getElementById('the_body')

        const acccentColorName = localStorage.getItem('accentColor')
        const accentColor = tertiaryColors.find((item) => item.color == acccentColorName)
        if(theme == 'dark') {
            link.href = '/assets/light-logo.png'
            body.style.background = '#f7f7f7'
            dispatch({ type: 'SET_THEME', payload: { theme: 'dark', primary: '#030304', secondary: '#161618', tertiary: accentColor ? accentColor[theme] : '#043166', contrast: '#cdd1d4' } })
        }else {
            link.href = '/assets/dark-logo.png'
            body.style.background = '#ffffff'
            dispatch({ type: 'SET_THEME', payload: { theme: 'light', primary: '#efefef', secondary: '#ffffff', tertiary: accentColor ? accentColor[theme] : '#155eb0', contrast: '#16181b' } })
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

const changeAccentColor = dispatch => ({ color }) => {
    localStorage.setItem('accentColor', color)

    const theme = localStorage.getItem('theme')
    const accentColor = tertiaryColors.find((item) => item.color == color)[theme ? theme : 'light']

    dispatch({ type: 'SET_ACCENT_COLOR', payload: accentColor })
}

const changeIsSimple = dispatch => ({ isSimple }) => {
    localStorage.setItem('isSimple', isSimple)
    dispatch({ type: 'SET_IS_SIMPLE', payload: isSimple })
}

const changeTheme = dispatch => ({ theme }) => {
    localStorage.setItem('theme', theme)
        
    const link = document.querySelector("link[rel*='icon']")
    const body = document.getElementById('the_body')
    
    const acccentColorName = localStorage.getItem('accentColor')
    const accentColor = tertiaryColors.find((item) => item.color == acccentColorName)
    if(theme == 'dark') {
        link.href = '/assets/light-logo.png'
        body.style.background = '#f7f7f7'
        dispatch({ type: 'SET_THEME', payload: { theme: 'dark', primary: '#030304', secondary: '#161618', tertiary: accentColor ? accentColor[theme] : '#063770', contrast: '#cdd1d4' } })
    }else {
        link.href = '/assets/dark-logo.png'
        body.style.background = '#ffffff'
        dispatch({ type: 'SET_THEME', payload: { theme: 'light', primary: '#efefef', secondary: '#ffffff', tertiary: accentColor ? accentColor[theme] : '#155eb0', contrast: '#16181b' } })
    }
}

export const { Provider, Context } = createDataContext(
    planReducer,
    { checkIfNotLoggedIn, checkIfLoggedIn, changeTheme, changeAccentColor, changeIsSimple },
    { isSimple: true, isLoggedIn: null, theme: 'light', primary: '#efefef', secondary: '#ffffff', tertiary: '#155eb0', contrast: '#16181b' }
)