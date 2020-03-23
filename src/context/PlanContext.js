import createDataContext from './createDataContext'
import workoutSharerApi from '../api/workoutSharer'
import { compileAdvancedWorkouts, compileBasicWorkouts, compileSpecificPlan } from '../utils/compileWorkouts'
import Cookies from 'js-cookie'

const planReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_ERROR_MESSAGE':
            return { ...state, errorMessage: action.payload }
        case 'ADD_GENERAL_PLAN':
            return { ...state, generalPlan: action.payload }
        case 'ADD_IF_MADE_PLAN':
            return { ...state, ifMadePlan: action.payload }
        case 'ADD_PAGE_PLAN':
            return { ...state, pagePlan: action.payload }
        case 'ADD_SPECIFIC_PLAN':
            return { ...state, specificPlan: action.payload }
        case 'CLEAR_ERROR_MESSAGE':
            return { ...state, errorMessage: '' }
        case 'SET_COMMENTS':
            return { ...state, comments: action.payload }
        case 'SET_IS_CREATOR':
            return { ...state, isCreator: action.payload }
        case 'SET_IS_SUBSCRIBED':
            return { ...state, isSubscribed: action.payload }
        case 'SET_SEARCHED_PLANS':
            return { ...state, searchedPlans: action.payload }
        default:
            return state
    }
}

const checkIfMadePlan = dispatch => async () => {
    const token = Cookies.get('token')
    
    try {
        const response = await workoutSharerApi.post('/check-if-made-plan', { token })
        const { error, ifMadePlan } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error })
        }

        dispatch({ type: 'ADD_IF_MADE_PLAN', payload: ifMadePlan })
    }
    catch {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
}

const clearSearchedPlans = dispatch => () => {
    dispatch({ type: 'SET_SEARCHED_PLANS', payload: [] })
}

const createPlan = dispatch => async ({ name, description, keyterms, workouts, type }) => {
    if(!name || !description) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Please provide a name and description.' })
    }
    const token = Cookies.get('token')

    try {
        const checkNameResponse = await workoutSharerApi.post('/check-plan-name', { name })
        if(checkNameResponse.data.error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: checkNameResponse.data.error })
        }

        let compiledWorkouts
        if(type == 'basic') {
            compiledWorkouts = compileBasicWorkouts(workouts)
        }
        else if(type == 'complex') {
            compiledWorkouts = compileAdvancedWorkouts(workouts)
        }

        const planKeyterms = (name + ',' + keyterms.toString()).toLowerCase()
        
        const createPlanResponse = await workoutSharerApi.post('/create-plan', { token, name, description, keyterms: planKeyterms, workouts: compiledWorkouts })
        if(createPlanResponse.data.error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: createPlanResponse.data.error })
        }

        localStorage.removeItem(type + 'Plan')
        window.location.href = '/account'
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Make sure you fill out every input including additional instructions.' })
    }
}

const deleteComment = dispatch => async ({ planId, commentId }) => {
    const token = Cookies.get('token')

    try {
        const response = await workoutSharerApi.post('/delete-comment', { token, planId, commentId })
        const { error, comments } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error })
        }

        dispatch({ type: 'SET_COMMENTS', payload: comments })
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const getPagePlan = dispatch => async () => {
    const token = Cookies.get('token')
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    try {
        const response = await workoutSharerApi.post('/get-plan', { token, id })
        const { error, isSubscribed, plan, comments, isCreator } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error })
        }

        dispatch({ type: 'SET_IS_SUBSCRIBED', payload: isSubscribed })
        dispatch({ type: 'ADD_PAGE_PLAN', payload: plan })
        dispatch({ type: 'SET_COMMENTS', payload: comments })
        dispatch({ type: 'SET_IS_CREATOR', payload: isCreator })
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const getSearchedPlans = dispatch => async ({ searchTerms, organization }) => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
    dispatch({ type: 'SET_SEARCHED_PLANS', payload: [] })

    try {
        const response = await workoutSharerApi.post('/search-plans', { searchTerms, organization })
        const { error, plans } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error })
        }
        
        dispatch({ type: 'SET_SEARCHED_PLANS', payload: plans })
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const getSubscribedPlan = dispatch => async () => {
    const token = Cookies.get('token')

    try {
        const response = await workoutSharerApi.post('/get-general-plan', { token })
        const { error, plan, record } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error })
        }
        
        dispatch({ type: 'ADD_GENERAL_PLAN', payload: plan })
        
        if(record.length !== 0) {
            const specificPlan = compileSpecificPlan(plan, record)
            dispatch({ type: 'ADD_SPECIFIC_PLAN', payload: specificPlan })
        }
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const postComment = dispatch => async ({ comment }) => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
    const token = Cookies.get('token')
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')

    try {
        const postCommentResponse = await workoutSharerApi.post('/post-comment', { token, comment, id })
        if(postCommentResponse.data.error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: postCommentResponse.data.error })
        }
        
        const getCommentsResponse = await workoutSharerApi.post('/get-plan', { token, id })
        if(getCommentsResponse.data.error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: getCommentsResponse.data.error })
        }

        dispatch({ type: 'SET_COMMENTS', payload: getCommentsResponse.data.comments })
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const postRecord = dispatch => async ({ record, plan }) => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
    const token = Cookies.get('token')

    try {
        for(let i = 0; i < plan.workouts.length; i++) {
            if(!record[i]) {
                for(let j = 0; j < plan.workouts.length; j++) {
                    if(plan.workouts[i].exercise == plan.workouts[j].exercise && plan.workouts[i].maxType == plan.workouts[j].maxType && plan.workouts[i].repsForAssessment == plan.workouts[j].repsForAssessment && record[j]) {
                        record[i] = record[j]
                        break
                    }
                }
            }
        }
        
        const response = await workoutSharerApi.post('/post-record', { token, record })
        const { error } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error })
        }

        const specificPlan = compileSpecificPlan(plan, record)
        dispatch({ type: 'ADD_SPECIFIC_PLAN', payload: specificPlan })
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const reportComment = dispatch => async ({ planId, commentId }) => {
    const token = Cookies.get('token')

    try {
        const response = await workoutSharerApi.post('/report-comment', { token, planId, commentId })
        const { error, comments } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error })
        }

        dispatch({ type: 'SET_COMMENTS', payload: comments })
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const subscribe = dispatch => async () => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
    const token = Cookies.get('token')
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')

    try {
        const response = await workoutSharerApi.post('/subscribe', { token, id })
        const { error, plan } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error })
        }

        dispatch({ type: 'SET_IS_SUBSCRIBED', payload: true })
        dispatch({ type: 'ADD_GENERAL_PLAN', payload: plan })
        dispatch({ type: 'ADD_SPECIFIC_PLAN', payload: null })
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const unsubscribe = dispatch => async () => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
    const token = Cookies.get('token')

    try {
        const response = await workoutSharerApi.post('/unsubscribe', { token })
        const { error } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error })
        }

        dispatch({ type: 'SET_IS_SUBSCRIBED', payload: false })
        dispatch({ type: 'ADD_GENERAL_PLAN', payload: null })
        dispatch({ type: 'ADD_SPECIFIC_PLAN', payload: null })
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

export const { Provider, Context } = createDataContext(
    planReducer,
    { checkIfMadePlan, clearErrorMessage, clearSearchedPlans, createPlan, deleteComment, getPagePlan, getSearchedPlans, getSubscribedPlan, postComment, postRecord, reportComment, subscribe, unsubscribe },
    { errorMessage: '', generalPlan: null, isCreator: false, ifMadePlan: false, isSubscribed: false, pagePlan: {}, searchedPlans: [], specificPlan: null }
)