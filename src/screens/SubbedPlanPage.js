import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context as PlanContext } from '../context/PlanContext'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Input from '../components/Input'

const SubbedPlanPage = () => {
    const { state, clearErrorMessage, getSubscribedPlan, postRecord, unsubscribe } = useContext(PlanContext)
    const { state: color, checkIfNotLoggedIn } = useContext(PrepContext)

    const [ activeDay, setActiveDay ] = useState(null)
    const [ activeWorkout, setActiveWorkout ] = useState(null)
    const [ record, setRecord ] = useState([])
    const [ selectedSection, setSelectedSection ] = useState('general')

    useEffect(() => {
        if(!color.isLoggedIn) {
            checkIfNotLoggedIn()
        }
        getSubscribedPlan()
        clearErrorMessage()
        window.scrollTo(0, 0)
    }, [])

    const onSetRecord = ({ index, value }) => {
        if(index >= record.length) {
            let missingValues = []
            for(let i = record.length; i < index; i++) {
                missingValues.push('')
            }
            let nextState = [
                ...record,
                ...missingValues,
                value
            ]
            setRecord(nextState)
        }
        else {
            let nextState = record.map((recordItem, recordIndex) => {
                if(index == recordIndex) {
                    return value
                }else {
                    return recordItem
                }
            })
            setRecord(nextState)
        }
    }

    return (
        <div>
            <title>Your Plans - Workout Sharer</title>
    
            <div 
                className='background' 
                style={{ backgroundColor: color.primary }}
            >
                <Header 
                    theme={color.theme}
                    currentRoute={window.location.pathname}
                    contrastColor={color.contrast}
                />

                <div className='form__container u-margin-top-medium'>
                    <div 
                        className='form u-width-huge u-height-large' 
                        style={{ 
                            backgroundColor: color.secondary, 
                            borderTop: color.isSimple 
                                ? color.theme == 'dark' 
                                    ? '2px solid #28282a' 
                                    : '2px solid rgb(215, 215, 215)' 
                                : '2px solid ' + color.tertiary, 
                            borderBottom: color.isSimple 
                                ? color.theme == 'dark' 
                                    ? '2px solid #28282a' 
                                    : '2px solid rgb(215, 215, 215)' 
                                : '2px solid ' + color.tertiary
                        }}
                    >
                        <div className='section-form__group u-width-huge'>
                            <div className='u-space-between u-height-none'>
                                <div>
                                    <button 
                                        className='section--button' 
                                        style={{ 
                                            backgroundColor: selectedSection == 'general' 
                                                ? color.secondary 
                                                : (color.theme == 'dark' 
                                                    ? 'rgba(255, 255, 255, .15)' 
                                                    : 'rgba(255, 255, 255, .6)'), 
                                            color: color.contrast 
                                        }} 
                                        onClick={() => {
                                            setActiveDay(null)
                                            setActiveWorkout(null)
                                            clearErrorMessage()
                                            setSelectedSection('general')
                                        }}
                                    >
                                        General
                                    </button>
                                </div>

                                <div>
                                    <button 
                                        className='section--button' 
                                        style={{ 
                                            backgroundColor: selectedSection == 'adapted' 
                                                ? color.secondary 
                                                : (color.theme == 'dark' 
                                                    ? 'rgba(255, 255, 255, .15)' 
                                                    : 'rgba(255, 255, 255, .6)'), 
                                            color: color.contrast 
                                        }} 
                                        onClick={() => {
                                            setActiveDay(null)
                                            setActiveWorkout(null)
                                            clearErrorMessage()
                                            setSelectedSection('adapted')
                                        }}
                                    >
                                        Adapted
                                    </button>
                                </div>
                            </div>
                        </div>

                        {selectedSection == 'general' 
                        ? state.generalPlan
                            ? <div>
                                {state.errorMessage && <p className='error-message'>{state.errorMessage}</p>}
                                
                                <h3 
                                    className='form__header u-margin-bottom-small' 
                                    style={{ color: color.contrast }}
                                >
                                    Enter your records and get your plan specified to you!
                                </h3>
    
                                <form 
                                    autoComplete="off" 
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        postRecord({ record, plan: state.generalPlan })
                                        setSelectedSection('adapted')
                                    }}
                                >
                                    {state.generalPlan.workouts.map((setItem, setIndex, setsArray) => {
                                        return (
                                            setIndex == 0
                                            || setsArray[setIndex - 1].exercise !== setItem.exercise 
                                            || setsArray[setIndex - 1].maxType !== setItem.maxType 
                                            ? <div key={setIndex} className='u-center'>
                                                {
                                                    setItem.maxType == 'Max weight for one rep'
                                                    ? <p 
                                                        className='u-margin-top-none' 
                                                        style={{ color: '#777' }}
                                                    >
                                                        What is the max weight you can use for 1 {setItem.exercise}?
                                                    </p>
                                                    : setItem.maxType == 'Max weight for multiple reps'
                                                    ? <p 
                                                        className='u-margin-top-none' 
                                                        style={{ color: '#777' }}
                                                    >
                                                        What is the max weight you can use for {setItem.repsForAssessment} {setItem.exercise}?
                                                    </p>
                                                    : setItem.maxType == 'Max reps'
                                                    ? <p 
                                                        className='u-margin-top-none' 
                                                        style={{ color: '#777' }}
                                                    >
                                                        What is the max reps you can do of {setItem.exercise}?
                                                    </p>
                                                    : setItem.maxType == 'Max time'
                                                    && <p 
                                                        className='u-margin-top-none' 
                                                        style={{ color: '#777' }}
                                                    >
                                                        What is the max time you can {setItem.exercise}?
                                                    </p>
                                                }
                                                
    
                                                <Input 
                                                    background='transparent'
                                                    type='text' 
                                                    value={
                                                        record[setIndex]
                                                        ? record[setIndex]
                                                        : ''
                                                    } 
                                                    name={
                                                        setItem.maxType == 'Max weight for one rep'
                                                        ? 'Weight (lbs)'
                                                        : setItem.maxType == 'Max weight for multiple reps'
                                                        ? 'Weight (lbs)'
                                                        : setItem.maxType == 'Max reps'
                                                        ? 'Reps'
                                                        : setItem.maxType == 'Max time'
                                                        && 'Time (s)'
                                                    } 
                                                    onChange={(e) => e.target.value.match(/^([0-9]{0,4})$/) && onSetRecord({ index: setIndex, value: e.target.value })}
                                                />
                                            </div>
                                            : null
                                        )
                                    })}
    
                                    <div className='u-center'>
                                        <button 
                                            className='button button--tertiary' 
                                            style={{ 
                                                backgroundColor: color.tertiary, 
                                                borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                            }}
                                        >
                                            Get adapted plan
                                        </button>
                                    </div>
                                </form>
                            </div>
                            : <div>
                                <p 
                                    className='helpful-message' 
                                    style={{ color: color.contrast }}
                                >
                                    You are not subscribed to a plan. Visit the <Link className='link' to='/search'>"PLANS SEARCH"</Link> page to search for a plan.
                                </p>

                                <div style={{
                                    width: '64rem',
                                    height: '54.4rem',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                    backgroundImage: 'url(/assets/subscribe-demo.PNG)'
                                }}>
                                </div>
                            </div>
                        : selectedSection == 'adapted'
                        && state.specificPlan
                            ? <div>
                                <div>
                                    <Link to={'/plan?id=' + state.generalPlan._id}>
                                        <h1 
                                            className='form__header' 
                                            style={{ color: color.contrast }}
                                        >
                                            {state.generalPlan.name}
                                        </h1>
                                    </Link>
                                </div>
        
                                {state.specificPlan.workouts.map((setItem, setIndex, setsArray) => {
                                    return (
                                        <div key={setIndex + 10000}>
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
                                                    <p 
                                                        className='plan--exercise' 
                                                        style={{ color: color.contrast }}
                                                    >
                                                        <a 
                                                            className='u-color-white' 
                                                            target='blank' 
                                                            href={'https://www.youtube.com/results?search_query=' + setItem.exercise.replace(' ', '+')}
                                                        >
                                                            Exercise: {setItem.exercise}
                                                        </a>
                                                    </p>
                                                    {
                                                        setItem.maxType == 'Max weight for one rep'
                                                        ? [<p 
                                                            key={setIndex - 10} 
                                                            className='plan--exercise' 
                                                            style={{ color: color.contrast }}
                                                        >
                                                            Weight: {setItem.weight}lbs
                                                        </p>,
                                                        <p 
                                                            key={setIndex - 1000} 
                                                            className='plan--exercise' 
                                                            style={{ color: color.contrast }}
                                                        >
                                                            Reps: {setItem.reps}
                                                        </p>]
                                                        : setItem.maxType == 'Max weight for multiple reps'
                                                        ? [<p 
                                                            key={setIndex - 100000} 
                                                            className='plan--exercise' 
                                                            style={{ color: color.contrast }}
                                                        >
                                                            Weight: {setItem.weight}lbs
                                                        </p>,
                                                        <p 
                                                            key={setIndex - 10000000} 
                                                            className='plan--exercise' 
                                                            style={{ color: color.contrast }}
                                                        >
                                                            Reps: {setItem.reps}
                                                        </p>]
                                                        : setItem.maxType == 'Max reps'
                                                        ? <p 
                                                            className='plan--exercise' 
                                                            style={{ color: color.contrast }}
                                                        >
                                                            Reps: {setItem.reps}
                                                        </p>
                                                        : setItem.maxType == 'Max time'
                                                        && <p 
                                                            className='plan--exercise' 
                                                            style={{ color: color.contrast }}
                                                        >
                                                            Time: {setItem.time}s
                                                        </p>
                                                    }
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
                                <p 
                                    className='helpful-message' 
                                    style={{ color: color.contrast }}
                                >
                                    Visit the <a className='link' onClick={() => setSelectedSection('general')}>"GENERAL PLAN"</a> section to adapt a plan to your fitness level.
                                </p>

                                <div style={{
                                    width: '64rem',
                                    height: '50.3rem',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                    backgroundImage: 'url(/assets/record-demo.PNG)'
                                }}>
                                </div>
                            </div>}
                    </div>
                </div>

                
                {selectedSection == 'general'
                && state.generalPlan
                && <div className='form__container'>
                    <div 
                        className='form u-width-huge' 
                        style={{ 
                            backgroundColor: color.secondary, 
                            borderTop: color.isSimple 
                                ? color.theme == 'dark' 
                                    ? '2px solid #28282a' 
                                    : '2px solid rgb(215, 215, 215)' 
                                : '2px solid ' + color.tertiary, 
                            borderBottom: color.isSimple 
                                ? color.theme == 'dark' 
                                    ? '2px solid #28282a' 
                                    : '2px solid rgb(215, 215, 215)' 
                                : '2px solid ' + color.tertiary
                        }}
                    >
                        <div>
                            <Link to={'/plan?id=' + state.generalPlan._id}>
                                <h1 
                                    className='form__header' 
                                    style={{ color: color.contrast }}
                                >
                                    {state.generalPlan.name}
                                </h1>
                            </Link>
                            <Link to={'/user-page?username=' + state.generalPlan.creator}>
                                <h2 
                                    className='form__header u-margin-bottom-small' 
                                    style={{ color: color.contrast }}
                                >
                                    Creator: {state.generalPlan.creator}
                                </h2>
                            </Link>
                        </div>

                        {state.generalPlan.workouts
                        && state.generalPlan.workouts.map((setItem, setIndex, setsArray) => {
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
                                                key={setIndex - 1000} style={{ color: color.contrast }}
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

                        <div>
                            <form 
                                autoComplete="off" 
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    unsubscribe()
                                }}
                            >
                                <div className='u-center u-margin-top-medium'>
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
                        </div>
                    </div>
                </div>}
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

export default SubbedPlanPage