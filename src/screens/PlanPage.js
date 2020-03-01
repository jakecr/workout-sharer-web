import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdSpeakerNotes, MdDeleteForever } from 'react-icons/md'
import { Context as PlanContext } from '../context/PlanContext'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import Header from '../components/Header'
import IconInput from '../components/IconInput'

const PlanPage = () => {
    const { state, clearErrorMessage, deleteComment, getPagePlan, getSubscribedPlan, postComment, subscribe, unsubscribe } = useContext(PlanContext)
    const { state: color, checkIfNotLoggedIn } = useContext(PrepContext)

    const [ activeDay, setActiveDay ] = useState(null)
    const [ activeWorkout, setActiveWorkout ] = useState(null)
    const [ comment, setComment ] = useState('')
    const [ selectedSection, setSelectedSection ] = useState('plan')

    useEffect(() => {
        if(!color.isLoggedIn) {
            checkIfNotLoggedIn()
        }
        getSubscribedPlan()
        clearErrorMessage()
        getPagePlan()
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            {state.pagePlan.name ? <title>{state.pagePlan.name} - Workout Sharer</title> : <title>Plan Page - Workout Sharer</title>}
        
            <div className='background' style={{ backgroundColor: color.primary }}>
                <Header 
                    theme={color.theme}
                    currentRoute={window.location.pathname}
                    contrastColor={color.contrast}
                />
                
                <div className='form__container u-margin-top-medium'>
                    <div 
                        className='form u-width-huge' 
                        style={{ 
                            backgroundColor: color.secondary, 
                            borderTop: color.isSimple 
                                ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(215, 215, 215)' 
                                : '2px solid ' + color.tertiary, 
                            borderBottom: color.isSimple 
                                ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(215, 215, 215)' 
                                : '2px solid ' + color.tertiary 
                        }}
                    >
                        <div className='section-form__group u-width-huge'>
                            <div className='section-form__container'>
                                <div>
                                    <button 
                                        className='section--button' 
                                        style={{ 
                                            backgroundColor: selectedSection == 'plan' 
                                                ? color.secondary 
                                                : (color.theme == 'dark' 
                                                    ? 'rgba(255, 255, 255, .15)' 
                                                    : 'rgba(255, 255, 255, .6)'), 
                                            color: color.contrast 
                                        }} 
                                        onClick={() => {
                                            clearErrorMessage()
                                            setSelectedSection('plan')
                                        }}
                                    >
                                        Plan
                                    </button>
                                </div>

                                <div>
                                    <button 
                                        className='section--button' 
                                        style={{ 
                                            backgroundColor: selectedSection == 'comments' 
                                                ? color.secondary 
                                                : (color.theme == 'dark' 
                                                    ? 'rgba(255, 255, 255, .15)' 
                                                    : 'rgba(255, 255, 255, .6)'), 
                                            color: color.contrast 
                                        }} 
                                        onClick={() => {
                                            clearErrorMessage()
                                            setSelectedSection('comments')
                                        }}
                                    >
                                        Comments
                                    </button>
                                </div>
                            </div>
                        </div>

                        {state.errorMessage && <p className='error-message'>{state.errorMessage}</p>}

                        {
                            selectedSection == 'plan' 
                            ? state.pagePlan && <div>
                                {!state.generalPlan 
                                && <p style={{ color: color.contrast }}>
                                    If you want to follow this plan you should subscribe to it and go to your "SUBSCRIBED PLAN" page to enter your records that are relavant to the plan. You will then get a plan specific to you. After that, if you get the Workout Sharer app then you will get a timer with all of your workouts set up for you.
                                </p>}

                                <div className='plan__heading'>
                                    <div className='plan__heading--left'>
                                        <h1 
                                            className='plan--header' 
                                            style={{ color: color.contrast }}
                                        >
                                            {state.pagePlan.name}
                                        </h1>
                                        <h2 
                                            className='plan--header' 
                                            style={{ color: color.contrast }}
                                        >
                                            Subscribers: {state.pagePlan.subscribers}
                                        </h2>
                                        <Link to={'/user-page?username=' + state.pagePlan.creator}>
                                            <h2 
                                                className='plan--header' 
                                                style={{ color: color.contrast }}
                                            >
                                                Creator: {state.pagePlan.creator}
                                            </h2>
                                        </Link>
                                        <p 
                                            className='plan--header' 
                                            style={{ color: '#777' }}
                                        >
                                            Description: {state.pagePlan.description}
                                        </p>
                                    </div>

                                    <div className='plan__heading--right'>
                                        {state.isSubscribed
                                        ? <form autoComplete="off" onSubmit={(e) => {
                                            e.preventDefault()
                                            unsubscribe()
                                        }}>
                                            <div className='u-center'>
                                                <button 
                                                    className='button button--tertiary' 
                                                    style={{ 
                                                        backgroundColor: color.tertiary, 
                                                        borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                                    }}
                                                >
                                                    Unsubscribe
                                                </button>
                                            </div>
                                        </form>
                                        : <form 
                                            autoComplete="off" 
                                            onSubmit={(e) => {
                                                e.preventDefault()
                                                subscribe()
                                            }}
                                        >
                                            <div className='u-center'>
                                                <button 
                                                    className='button button--tertiary' 
                                                    style={{ 
                                                        backgroundColor: color.tertiary, 
                                                        borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                                    }}
                                                >
                                                    Subscribe
                                                </button>
                                            </div>
                                        </form>}
                                    </div>
                                </div>

                                {state.pagePlan.workouts
                                && state.pagePlan.workouts.map((setItem, setIndex, setsArray) => {
                                    return (
                                        <div key={setIndex}>
                                            {setIndex == 0 || setsArray[setIndex - 1].day !== setItem.day
                                            ? <a onClick={() => {
                                                setActiveWorkout(null)
                                                setActiveDay(setItem.day == activeDay ? null : setItem.day)
                                            }}>
                                                <h2 
                                                    className='u-center' 
                                                    style={{ color: color.tertiary }}
                                                >
                                                    {setItem.day == activeDay
                                                    ? <strong>Day: {setItem.day} &#9660;</strong>
                                                    : <strong>Day: {setItem.day} &#9650;</strong>}
                                                </h2>
                                            </a>
                                            : null}
                                            
                                            {setIndex == 0 || setsArray[setIndex - 1].day !== setItem.day || setsArray[setIndex - 1].workout !== setItem.workout
                                            ? setItem.day == activeDay 
                                            && <a onClick={() => setActiveWorkout(setItem.workout == activeWorkout ? null : setItem.workout)}>
                                                <h3 
                                                    className='u-center' 
                                                    style={{ color: color.tertiary }}
                                                >
                                                    {setItem.workout == activeWorkout
                                                    ? <strong>Workout: {setItem.workout} &#9660;</strong>
                                                    : <strong>Workout: {setItem.workout} &#9650;</strong>}
                                                </h3>
                                            </a>
                                            : null}

                                            {activeDay == setItem.day
                                            && activeWorkout == setItem.workout
                                            && <div 
                                                className='plan__group' 
                                                style={{ borderTop: setItem.set !== 1 && '1px solid ' + color.contrast }}
                                            >
                                                <h4 
                                                    className='u-center u-margin-none' 
                                                    style={{ color: color.contrast }}
                                                >
                                                    <strong>Set: {setItem.set}</strong>
                                                </h4>
                                                
                                                <div className='plan--set'>
                                                    <a 
                                                        className='u-color-white' 
                                                        target='blank' 
                                                        href={'https://www.youtube.com/results?search_query=' + setItem.exercise.replace(' ', '+')}
                                                    >
                                                        <p 
                                                            className='plan--exercise' 
                                                            style={{ color: color.contrast }}
                                                        >
                                                            Exercise: {setItem.exercise}
                                                        </p>
                                                    </a>
                                
                                                    {setItem.maxType == 'Max weight for one rep'
                                                    ? [<p 
                                                            className='plan--exercise' 
                                                            key={setIndex - 1000} 
                                                            style={{ color: color.contrast }}
                                                        >
                                                            Weight: {setItem.percentMax}% of your max weight for 1 rep
                                                        </p>
                                                    , <p 
                                                        className='plan--exercise' 
                                                        key={setIndex - 100000} 
                                                        style={{ color: color.contrast }}
                                                    >
                                                        Reps: {setItem.staticMetric}
                                                    </p>]
                                                    
                                                    : setItem.maxType == 'Max weight for multiple reps'
                                                    ? [<p 
                                                        className='plan--exercise' 
                                                        key={setIndex - 1000} 
                                                        style={{ color: color.contrast }}
                                                    >
                                                        Weight: {setItem.percentMax}% of your max weight for {setItem.repsForAssessment} reps
                                                    </p>
                                                    , <p 
                                                        className='plan--exercise' 
                                                        key={setIndex - 100000} 
                                                        style={{ color: color.contrast }}
                                                    >
                                                        Reps: {setItem.staticMetric}
                                                    </p>]
                                                    
                                                    : setItem.maxType == 'Max reps'
                                                    ? <p 
                                                        className='plan--exercise' 
                                                        style={{ color: color.contrast }}
                                                    >
                                                        Reps: {setItem.percentMax}% of your max reps
                                                    </p>
                                                    
                                                    : setItem.maxType == 'Max distance'
                                                    ? [<p 
                                                        className='plan--exercise' 
                                                        key={setIndex - 1000} 
                                                        style={{ color: color.contrast }}
                                                    >
                                                        Distance: {setItem.percentMax}% of your max distance
                                                    </p>
                                                    , <p 
                                                        className='plan--exercise' 
                                                        key={setIndex - 100000} 
                                                        style={{ color: color.contrast }}
                                                    >
                                                        Minutes per {setItem.staticMetric}: {setItem.timePerRep}
                                                    </p>]
                                                    
                                                    : setItem.maxType == 'Max time'
                                                    && <p 
                                                        className='plan--exercise' 
                                                        style={{ color: color.contrast }}
                                                    >
                                                        Time: {setItem.percentMax}% of your max time
                                                    </p>}
                                                    
                                                    <p 
                                                        className='plan--exercise' 
                                                        style={{ color: color.contrast }}
                                                    >
                                                        Set rest: {setItem.setRest}s
                                                    </p>
                                                    <p 
                                                        className='plan--exercise' 
                                                        style={{ color: color.contrast }}
                                                    >
                                                        Additional instructions: {setItem.additionalInstructions}
                                                    </p>
                                                </div>
                                            </div>}
                                        </div>
                                    )
                                })}
                            </div>
                            : <div>
                                <div className='u-center plan__group plan__group--top'>
                                    <form 
                                        autoComplete="off" 
                                        onSubmit={(e) => {
                                            e.preventDefault()
                                            postComment({ comment })
                                        }}
                                    >
                                        <IconInput
                                            Icon={MdSpeakerNotes}
                                            type='text' 
                                            value={comment} 
                                            name='Comment' 
                                            onChange={(e) => setComment(e.target.value)} 
                                        />
                                        <button 
                                            className='button button--tertiary u-margin-left' 
                                            style={{ 
                                                backgroundColor: color.tertiary, 
                                                borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                            }}
                                        >
                                            Submit comment
                                        </button>
                                    </form>
                                </div>

                                {state.comments
                                && state.comments.map((commentItem, commentIndex) => {
                                    return (
                                        <div 
                                            key={commentIndex + 10000} 
                                            className='u-space-arround'
                                        >
                                            <div>
                                                
                                                    <div className='u-space-between'>
                                                        <Link 
                                                            to={'/user-page?username=' + commentItem.user} 
                                                            style={{ color: color.contrast }}
                                                        >
                                                            <strong>{commentItem.user}: </strong>
                                                        </Link>
                                                        {state.isCreator 
                                                        && <a onClick={() => deleteComment({ commentId: commentItem._id, planId: state.pagePlan._id })}>
                                                            <MdDeleteForever className='u-color-red' style={{ fontSize: '3rem' }}/>
                                                        </a>}
                                                    </div>

                                                    <p 
                                                        className='plan--comment' 
                                                        style={{ color: color.contrast }}
                                                    >
                                                        {commentItem.text}
                                                    </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>
            </div>

            <Footer 
                colorPrimary={color.primary}
                colorTertiary={color.tertiary}
                colorContrast={color.contrast}
                theme={color.theme}
            />
        </div>
    )
}

export default PlanPage