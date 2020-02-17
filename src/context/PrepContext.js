import createDataContext from './createDataContext'
import workoutSharerApi from '../api/workoutSharer'
import Cookies from 'js-cookie'
const tertiaryColors = [
    { color: 'blue', light: '#155eb0', dark: '#043166' },
    { color: 'green', light: '#539c49', dark: '#3b7534' },
    { color: 'pink', light: '#cf7a9c', dark: '#a15f79' },
    { color: 'purple', light: '#751cbd', dark: '#6617a6' },
    { color: 'red', light: '#cf4015', dark: '#8f3114' },
    { color: 'orange', light: '#cc7e1f', dark: '#a36315' },
    { color: 'teal', light: '#10b09c', dark: '#0e8071' }
]

const planReducer = (state, action) => {
    switch(action.type) {
        case 'SET_THEME':
            return action.payload
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
        const accentColor = tertiaryColors.find((item) => item.color == acccentColorName)[theme]

        if(theme == 'light') {
            dispatch({ type: 'SET_THEME', payload: { theme: 'light', primary: '#dfdee3', secondary: '#ffffff', tertiary: !!accentColor ? accentColor : '#155eb0', contrast: '#16181b' } })
        }
        else {
            dispatch({ type: 'SET_THEME', payload: { theme: 'dark', primary: '#000000', secondary: '#1c1c1e', tertiary: !!accentColor ? accentColor : '#043166', contrast: '#cdd1d4' } })
        }
        
        const link = document.querySelector("link[rel*='icon']")
        if(theme == 'dark') {
            link.href = '/assets/light-logo.png'
        }else {
            link.href = '/assets/dark-logo.png'
        }

        const response = await workoutSharerApi.post('/validate-user', { token })

        if(response.data.isLoggedIn) {
            window.location.href = '/'
        }
    }catch(err) {
        console.log(err.message)
    }
}

const checkIfNotLoggedIn = dispatch => async () => {
    const token = Cookies.get('token')

    try {
        const theme = localStorage.getItem('theme')

        const acccentColorName = localStorage.getItem('accentColor')
        
        const accentColor = tertiaryColors.find((item) => item.color == acccentColorName)[theme]

        if(theme == 'light') {
            dispatch({ type: 'SET_THEME', payload: { theme: 'light', primary: '#dfdee3', secondary: '#ffffff', tertiary: !!accentColor ? accentColor : '#155eb0', contrast: '#16181b' } })
        }
        else {
            dispatch({ type: 'SET_THEME', payload: { theme: 'dark', primary: '#000000', secondary: '#1c1c1e', tertiary: !!accentColor ? accentColor : '#043166', contrast: '#cdd1d4' } })
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
    }catch(err) {
        if(err.message == 'Network Error') {
            window.location.href = '/signin'
        }
    }
}

const changeTheme = dispatch => ({ theme }) => {
    localStorage.setItem('theme', theme)
    
    const acccentColorName = localStorage.getItem('accentColor')
    const accentColor = tertiaryColors.find((item) => item.color == acccentColorName)[theme]

    if(theme == 'light') {
        dispatch({ type: 'SET_THEME', payload: { theme: 'light', primary: '#dfdee3', secondary: '#ffffff', tertiary: accentColor, contrast: '#16181b' } })
    }
    else {
        dispatch({ type: 'SET_THEME', payload: { theme: 'dark', primary: '#000000', secondary: '#1c1c1e', tertiary: accentColor, contrast: '#cdd1d4' } })
    }
        
    const link = document.querySelector("link[rel*='icon']")
    if(theme == 'dark') {
        link.href = '/assets/light-logo.png'
    }else {
        link.href = '/assets/dark-logo.png'
    }
}

const changeAccentColor = dispatch => ({ color }) => {
    localStorage.setItem('accentColor', color)

    const theme = localStorage.getItem('theme')
    const accentColor = tertiaryColors.find((item) => item.color == color)[theme]

    dispatch({ type: 'SET_ACCENT_COLOR', payload: accentColor })
}

export const { Provider, Context } = createDataContext(
    planReducer,
    { checkIfNotLoggedIn, checkIfLoggedIn, changeTheme, changeAccentColor },
    { theme: 'dark', primary: '#000000', secondary: '#1c1c1e', tertiary: '#043166', contrast: '#cdd1d4' }
)