import createDataContext from './createDataContext'
import workoutSharerApi from '../api/workoutSharer'
import Cookies from 'js-cookie'

const authReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_ERROR_MESSAGE':
            return { ...state, errorMessage: action.payload }
        case 'CLEAR_ERROR_MESSAGE':
            return { ...state, errorMessage: '' }
        case 'SET_HAS_EMAILED':
            return { ...state, hasEmailed: action.payload }
        case 'ADD_MADE_PLANS':
            return { ...state, madePlans: action.payload }
        case 'ADD_ACCOUNT':
            return { ...state, account: action.payload }
        case 'ADD_USERS_MADE_PLANS':
            return { ...state, usersMadePlans: action.payload }
        case 'ADD_USER':
            return { ...state, user: action.payload }
        default:
            return state
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
}

const clearHasEmailed = dispatch => () => {
    dispatch({ type: 'SET_HAS_EMAILED', payload: false })
}

const changePassword = dispatch => async ({ email }) => {
    if(!email) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Please provide an email.'})
    }

    try {
        const response = await workoutSharerApi.post('/change-password', { email })
        const { error, encodedCorrectCode, email: responseEmail } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }

        const passwordData = { encodedCorrectCode, email: responseEmail }
        
        Cookies.remove('passwordData')
        Cookies.set('passwordData', JSON.stringify(passwordData))

        window.location.href = '/verify-password'
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const deleteAccount = dispatch => async () => {
    const token = Cookies.get('token')

    try {
        const response = await workoutSharerApi.post('/delete-user', { token })
        const { error, encodedCorrectCode } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }
        
        Cookies.remove('encodedCorrectCode')
        Cookies.set('encodedCorrectCode', encodedCorrectCode)
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const getAccount = dispatch => async () => {
    const token = Cookies.get('token')

    try {
        if(!token) {
            window.location.href = '/signin'
            return 
        }
        
        const response = await workoutSharerApi.post('/get-user', { token })
        const { error, user, plans } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }

        dispatch({ type: 'ADD_MADE_PLANS', payload: plans })
        dispatch({ type: 'ADD_ACCOUNT', payload: user})
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const getUser = dispatch => async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    try {
        const response = await workoutSharerApi.post('/get-user', { username })
        const { error, plans, user } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error })
        }
        
        dispatch({ type: 'ADD_USERS_MADE_PLANS', payload: plans })
        dispatch({ type: 'ADD_USER', payload: user })
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const sendMeEmail = dispatch => async ({ email, subject, content }) => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' })

    try {
        const response = await workoutSharerApi.post('/send-email', { email, subject, content })
        const { error } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }

        dispatch({ type: 'SET_HAS_EMAILED', payload: true })
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const signin = dispatch => async ({ email, password }) => {
    if(!email || !password) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Must provide an email and password'})
    }

    try {
        const response = await workoutSharerApi.post('/signin', { email, password })
        const { error, token } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }

        Cookies.remove('token')
        Cookies.set('token', token)

        window.location.href = '/'
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const signout = dispatch => async () => {
    try {
        Cookies.remove('token')

        window.location.href = '/signin'
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const signup = dispatch => async ({ username, email, password, verifyPassword }) => {
    if(!password || !verifyPassword || !username || !email) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'You must provide a username, email and password!' })
    }
    else if(password !== verifyPassword) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Passwords dont match!' })
    }
    else if(password.length < 6) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Your password must be 6 or mor characters!' })
    }

    try {
        const response = await workoutSharerApi.post('/signup', { username, email })
        const { error, encodedCorrectCode } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }

        const user = { username, email, password, encodedCorrectCode }
        Cookies.remove('user')
        Cookies.set('user', JSON.stringify(user))

        window.location.href = '/verify-user'
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const verifyChangePassword = dispatch => async ({ code, password, verifyPassword }) => {
    if(!password || !verifyPassword || !code) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'You must provide a password and code!' })
    }
    else if(password !== verifyPassword) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Passwords dont match!' })
    }
    const passwordData = JSON.parse(Cookies.get('passwordData'))
    
    try {
        const response = await workoutSharerApi.post('/verify-password', { ...passwordData, password, code })
        const { error } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }

        Cookies.remove('passwordData')

        window.location.href = '/signin'
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const verifyCreateAccount = dispatch => async ({ code }) => {
    if(!code) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Please provide a code!' })
    }

    try {
        const user = JSON.parse(Cookies.get('user'))

        const response = await workoutSharerApi.post('/verify-user', { ...user, code })
        const { error, token } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }

        Cookies.remove('user')

        Cookies.remove('token')
        Cookies.set('token', token)

        window.location.href = '/'
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const verifydeleteAccount = dispatch => async ({ code }) => {
    if(!code) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Please provide a code.'})
    }
    const encodedCorrectCode = Cookies.get('encodedCorrectCode')
    const token = Cookies.get('token')

    try {
        const response = await workoutSharerApi.post('/verify-delete-user', { token, code, encodedCorrectCode })
        const { error } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }

        Cookies.remove('encodedCorrectCode')
        Cookies.remove('token')

        window.location.href = '/signin'
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { changePassword, clearErrorMessage, clearHasEmailed, deleteAccount, getAccount, getUser, sendMeEmail, signin, signout, signup, verifyCreateAccount, verifyChangePassword, verifydeleteAccount },
    { account: null, errorMessage: '', hasEmailed: false, madePlans: [], usersMadePlans: [], user: null }
)