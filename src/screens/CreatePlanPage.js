import React, { useEffect, useState, useContext } from 'react'
import { IoMdPricetag } from 'react-icons/io'
import { MdDescription } from 'react-icons/md'
import { Context as PlanContext } from '../context/PlanContext'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import Header from '../components/Header'
import IconInput from '../components/IconInput'
import InputSmall from '../components/InputSmall'
import Input from '../components/Input'
import Select from '../components/Select'

const CreatePlanPage = () => {
    const savedBasicPlan = localStorage.getItem('basicPlan') ? JSON.parse(localStorage.getItem('basicPlan')) : undefined
    const savedComplexPlan = localStorage.getItem('complexPlan') ? JSON.parse(localStorage.getItem('complexPlan')) : undefined

    const { state, clearErrorMessage, checkIfMadePlan, createPlan } = useContext(PlanContext)
    const { state: color, checkIfNotLoggedIn } = useContext(PrepContext)
    
    const [ basicWorkouts, setBasicWorkouts ] = useState(
        savedBasicPlan 
        ? savedBasicPlan.workouts 
        : [[], [], [], [], [], [], []]
    )
    const [ description, setDescription ] = useState(
        savedBasicPlan 
        ? savedBasicPlan.description 
        : savedComplexPlan
            ? savedComplexPlan.description
            : ''
    )
    const [ keyterms, setKeyterms ] = useState(
        savedBasicPlan 
        ? savedBasicPlan.keyterms 
        : savedComplexPlan
            ? savedComplexPlan.keyterms
            : []
    ) 
    const [ name, setName ] = useState(
        savedBasicPlan 
        ? savedBasicPlan.name 
        : savedComplexPlan
            ? savedComplexPlan.name
            : ''
    )
    const [ selectedSection, setSelectedSection ] = useState('complex')
    const [ workouts, setWorkouts ] = useState(
        savedComplexPlan
        ? savedComplexPlan.workouts 
        : [[], [], [], [], [], [], []]
    )

    useEffect(() => {
        if(!color.isLoggedIn) {
            checkIfNotLoggedIn()
        }
        checkIfMadePlan()
        clearErrorMessage()
        window.scrollTo(0, 0)
        
        localStorage.removeItem('basicPlan')
        localStorage.removeItem('complexPlan')
    }, [])

    const onAddKeyterm = () => {
        let nextState = keyterms.concat('')

        setKeyterms(nextState)
    }

    const onAddBasicWorkout = ({ day }) => {
        let nextState = [ ...basicWorkouts ]

        nextState[day].push({ 
            day: (day + 1), 
            workout: (nextState[day].length + 1),
            exercise: '', 
            maxType: 'Max weight for one rep', 
            repsForAssessment: '', 
            percentMax: '', 
            staticMetric: '', 
            timePerRep: '', 
            setRest: '', 
            additionalInstructions: '',
            sets: ''
        })
        
        setBasicWorkouts(nextState)
    }
 
    const onAddSet = ({ prevSet, day, workout, set }) => {
        let nextState = [ ...workouts ]

        if(prevSet) {
            nextState[day][workout].push({ 
                day: day + 1, 
                workout: workout + 1,
                set: set + 1, 
                exercise: prevSet.exercise, 
                maxType: prevSet.maxType, 
                repsForAssessment: prevSet.repsForAssessment, 
                percentMax: prevSet.percentMax, 
                staticMetric: prevSet.staticMetric, 
                timePerRep: prevSet.timePerRep, 
                setRest: prevSet.setRest, 
                additionalInstructions: prevSet.additionalInstructions 
            })
        }
        else {
            nextState[day][workout].push({ 
                day: day + 1, 
                workout: workout + 1,
                set: set + 1, 
                exercise: '', 
                maxType: 'Max weight for one rep', 
                repsForAssessment: '', 
                percentMax: '', 
                staticMetric: '', 
                timePerRep: '', 
                setRest: '', 
                additionalInstructions: '' 
            })
        }
        
        setWorkouts(nextState)
    }
    
    const onAddWorkout = ({ day }) => {
        let nextState = [ ...workouts ]

        nextState[day].push([])
        
        setWorkouts(nextState)
    }
    
    const onChangeBasicWorkout = ({ day, workout, key, value }) => {
        let nextState = [ ...basicWorkouts ]
        
        nextState[day][workout][key] = value
        if(key == 'maxType') {
            nextState[day][workout].repsForAssessment = ''
        }
        
        setBasicWorkouts(nextState)
    }
    
    const onChangeKeyterm = ({ index, value }) => {
        let nextState = [ ...keyterms ]

        nextState[index] = value

        setKeyterms(nextState)
    }
    
    const onChangeSet = ({ day, workout, set, key, value }) => {
        let nextState = [ ...workouts ]

        nextState[day][workout][set][key] = value
        if(key == 'maxType') {
            nextState[day][workout][set].repsForAssessment = ''
        }
        
        setWorkouts(nextState)
    }
    
    const onRemoveBasicWorkout = ({ day }) => {
        let nextState = [ ...basicWorkouts ]
        
        nextState[day].pop()
        
        setBasicWorkouts(nextState)
    }
      
    const onRemoveSet = ({ day, workout }) => {
        let nextState = [ ...workouts ]

        nextState[day][workout].pop()

        setWorkouts(nextState)
    }
    
    const onRemoveWorkout = ({ day }) => {
        let nextState = [ ...workouts ]

        nextState[day].pop()
        
        setWorkouts(nextState)
    }

    const removeKeyterm = () => {
        let nextState = keyterms.slice(0, keyterms.length - 1)

        setKeyterms(nextState)
    }

    return (
        <div>
            <title>Create Plan - Workout Sharer</title>

            <div 
                className='background' 
                style={{ backgroundColor: color.primary }}
            >
                <Header 
                    theme={color.theme}
                    currentRoute={window.location.pathname}
                    contrastColor={color.contrast}
                />
                
                <div className='form__container'>
                    <div 
                        className='form u-width-huge u-margin-top-medium' 
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
                            <div className='u-space-between u-height-none'>
                                <div>
                                    <button 
                                        className='section--button' 
                                        style={{ 
                                            backgroundColor: selectedSection == 'basic' 
                                                ? color.secondary 
                                                : (color.theme == 'dark' 
                                                    ? 'rgba(255, 255, 255, .15)' 
                                                    : 'rgba(255, 255, 255, .6)'), 
                                            color: color.contrast 
                                        }} 
                                        onClick={() => {
                                            clearErrorMessage()
                                            setSelectedSection('basic')
                                        }}
                                    >
                                        Basic
                                    </button>
                                </div>

                                <div>
                                    <button 
                                        className='section--button' 
                                        style={{ 
                                            backgroundColor: selectedSection == 'complex' 
                                                ? color.secondary 
                                                : (color.theme == 'dark' 
                                                    ? 'rgba(255, 255, 255, .15)' 
                                                    : 'rgba(255, 255, 255, .6)'), 
                                            color: color.contrast 
                                        }} 
                                        onClick={() => {
                                            clearErrorMessage()
                                            setSelectedSection('complex')
                                        }}
                                    >
                                        Complex
                                    </button>
                                </div>

                                <div>
                                    <button 
                                        className='section--button' 
                                        style={{ 
                                            backgroundColor: selectedSection == 'help' 
                                                ? color.secondary 
                                                : (color.theme == 'dark' 
                                                    ? 'rgba(255, 255, 255, .15)' 
                                                    : 'rgba(255, 255, 255, .6)'), 
                                            color: color.contrast 
                                        }} 
                                        onClick={() => {
                                            clearErrorMessage()
                                            setSelectedSection('help')
                                        }}
                                    >
                                        Help
                                    </button>
                                </div>
                            </div>
                        </div>

                        {!state.ifMadePlan && selectedSection !== 'help'
                        && <p className='error-message'>
                            If you havent made a plan before you should read through the <a className='link' onClick={() => setSelectedSection('help')}>"HELP"</a> section.
                        </p>}

                        {
                            selectedSection == 'basic'
                            ? <form 
                                autoComplete="off" 
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    createPlan({ name, description, keyterms, workouts: basicWorkouts, type: 'basic' })
                                }}
                            >
                                <div className='u-space-between'>
                                    <IconInput 
                                        Icon={IoMdPricetag} 
                                        autoFocus={true} 
                                        name='Name' 
                                        type='text' 
                                        value={name} 
                                        onChange={(e) => e.target.value.length < 26 && setName(e.target.value)} 
                                    />
                                    <IconInput 
                                        Icon={MdDescription} 
                                        name='Description' 
                                        type='text' 
                                        value={description} 
                                        onChange={(e) => setDescription(e.target.value)} 
                                    />
                                </div>

                                <div className='u-center'>
                                    {keyterms.map((item, keytermIndex) => {
                                        return (
                                            <InputSmall 
                                                key={keytermIndex + 10} 
                                                name='Keyterm' 
                                                type='text' 
                                                value={item} 
                                                onChange={(e) => onChangeKeyterm({ index: keytermIndex, value: e.target.value })} 
                                            />
                                        )
                                    })}
                                </div>

                                <div className='u-center u-margin-top-small'>
                                    {keyterms.length < 7 
                                    && <button 
                                        className='button button--green' 
                                        type='button' 
                                        onClick={() => onAddKeyterm()}
                                    >
                                        Add keyterm
                                    </button>}
                                    {keyterms.length == 7 
                                    ? <button 
                                        className='button button--red' 
                                        type='button' 
                                        onClick={() => removeKeyterm()}
                                    >
                                        Remove keyterm
                                    </button>
                                    : keyterms.length > 0 
                                    && <button 
                                        className='button button--red u-margin-left' 
                                        type='button' 
                                        onClick={() => removeKeyterm()}
                                    >
                                        Remove keyterm
                                    </button>}
                                </div>

                                {basicWorkouts.map((dayItem, dayIndex) => {
                                    return (
                                        <div key={dayIndex + 80} className='day__container'>
                                            <h2 
                                                className='u-center u-margin-none' 
                                                style={{ color: color.contrast }}
                                            >
                                                Day: {dayIndex + 1}
                                            </h2>

                                            {dayItem.map((workoutItem, workoutIndex) => {
                                                return (
                                                    <div key={workoutIndex + (1000000 * (dayIndex + 1))}>
                                                        <h3 
                                                            className='u-center u-margin-none' 
                                                            style={{ color: color.contrast }}
                                                        >
                                                            Workout: {workoutIndex + 1}
                                                        </h3>

                                                        <div className='create-plan__set--inputs'>
                                                            <Input 
                                                                name='Exercise' 
                                                                type='text' 
                                                                value={workoutItem.exercise} 
                                                                onChange={(e) => onChangeBasicWorkout({ day: dayIndex, workout: workoutIndex, key: 'exercise', value: e.target.value })} 
                                                            />

                                                            <Select 
                                                                name='Assessment type' 
                                                                value={workoutItem.maxType} 
                                                                onChange={(e) => onChangeBasicWorkout({ day: dayIndex, workout: workoutIndex, key: 'maxType', value: e.target.value })} 
                                                            >
                                                                <option value='Max weight for one rep'>Max weight for one rep</option>
                                                                <option value='Max weight for multiple reps'>Max weight for multiple reps</option>
                                                                <option value='Max reps'>Max reps</option>
                                                                <option value='Max time'>Max time</option>
                                                            </Select>
                                                            
                                                            <Input 
                                                                name='Percent max (%)' 
                                                                type='text' 
                                                                value={workoutItem.percentMax} 
                                                                onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeBasicWorkout({ day: dayIndex, workout: workoutIndex, key: 'percentMax', value: e.target.value })}
                                                            />

                                                            {
                                                                workoutItem.maxType == 'Max weight for one rep'
                                                                ? [<Input 
                                                                    key={((dayIndex * workoutIndex + .1) + .1) * .1111 }
                                                                    name='Number of reps' 
                                                                    type='text' 
                                                                    value={workoutItem.staticMetric} 
                                                                    onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeBasicWorkout({ day: dayIndex, workout: workoutIndex, key: 'staticMetric', value: e.target.value })}
                                                                />
                                                                , <Input 
                                                                    key={(dayIndex * workoutIndex + .1) * .11111}
                                                                    name='Approximate time per rep (s)' 
                                                                    type='text' 
                                                                    value={workoutItem.timePerRep} 
                                                                    onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeBasicWorkout({ day: dayIndex, workout: workoutIndex, key: 'timePerRep', value: e.target.value })}
                                                                />]

                                                                : workoutItem.maxType == 'Max weight for multiple reps'
                                                                ? [<Input 
                                                                    key={(dayIndex * workoutIndex + .1) * .1111}
                                                                    name='Number of reps for assessment' 
                                                                    type='text' 
                                                                    value={workoutItem.repsForAssessment} 
                                                                    onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeBasicWorkout({ day: dayIndex, workout: workoutIndex, key: 'repsForAssessment', value: e.target.value })} 
                                                                />
                                                                , <Input 
                                                                    key={(dayIndex * workoutIndex + .1) * .11111}
                                                                    name='Number of reps' 
                                                                    type='text' 
                                                                    value={workoutItem.staticMetric} 
                                                                    onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeBasicWorkout({ day: dayIndex, workout: workoutIndex, key: 'staticMetric', value: e.target.value })} 
                                                                />
                                                                , <Input 
                                                                    key={(dayIndex * workoutIndex + .1) * .111111}
                                                                    name='Approximate time per rep (s)' 
                                                                    type='text' 
                                                                    value={workoutItem.timePerRep} 
                                                                    onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeBasicWorkout({ day: dayIndex, workout: workoutIndex, key: 'timePerRep', value: e.target.value })} 
                                                                />]

                                                                : workoutItem.maxType == 'Max reps'
                                                                ? <Input 
                                                                    name='Approximate time per rep (s)' 
                                                                    type='text' 
                                                                    value={workoutItem.timePerRep} 
                                                                    onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeBasicWorkout({ day: dayIndex, workout: workoutIndex, key: 'timePerRep', value: e.target.value })} 
                                                                />
                                                                : workoutItem.maxType == 'Max time'
                                                                && null
                                                            }

                                                            <Input 
                                                                name='Set rest (s)' 
                                                                type='text' 
                                                                value={workoutItem.setRest} 
                                                                onChange={(e) => e.target.value.match(/^[0-9]{0,4}$/) && onChangeBasicWorkout({ day: dayIndex, workout: workoutIndex, key: 'setRest', value: e.target.value })} 
                                                            />

                                                            <Input 
                                                                name='Additional instructions' 
                                                                type='text' 
                                                                value={workoutItem.additionalInstructions} 
                                                                onChange={(e) => onChangeBasicWorkout({ day: dayIndex, workout: workoutIndex, key: 'additionalInstructions', value: e.target.value })} 
                                                            />

                                                            <Input 
                                                                name='Number of sets' 
                                                                type='text' 
                                                                value={workoutItem.sets} 
                                                                onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeBasicWorkout({ day: dayIndex, workout: workoutIndex, key: 'sets', value: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            
                                            {dayItem.length > 0 
                                            ? (
                                                <div className='u-center'>
                                                    <button 
                                                        className='button button--green' 
                                                        type='button' 
                                                        onClick={() => onAddBasicWorkout({ day: dayIndex })}
                                                    >
                                                        Add workout
                                                    </button>
                                                    <button 
                                                        className='button button--red u-margin-left' 
                                                        type='button' 
                                                        onClick={() => onRemoveBasicWorkout({ day: dayIndex })}
                                                    >
                                                        Remove workout
                                                    </button>
                                                </div>
                                            )
                                            : (
                                                <div className='u-center u-margin-top-medium'>
                                                    <button 
                                                        className='button button--green' 
                                                        type='button' 
                                                        onClick={() => onAddBasicWorkout({ day: dayIndex })}
                                                    >
                                                        Add workout
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}

                                <div className='plan__container--submit'>
                                    <button 
                                        className='button button--tertiary' 
                                        type='button'
                                        style={{ 
                                            backgroundColor: color.tertiary, 
                                            borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                        }}
                                        onClick={() => {
                                            localStorage.setItem('basicPlan', JSON.stringify({ name, description, keyterms, workouts: basicWorkouts }))
                                            localStorage.removeItem('complexPlan')
                                        }}
                                    >
                                        Save for Later
                                    </button>

                                    <button 
                                        className='button button--tertiary u-margin-left' 
                                        type='submit' 
                                        style={{ 
                                            backgroundColor: color.tertiary, 
                                            borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                        }}
                                    >
                                        Create Plan &rarr;
                                    </button>
                                </div>
                            </form>
                            : selectedSection == 'complex'
                            ? <form 
                                autoComplete="off" 
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    createPlan({ name, description, keyterms, workouts, type: 'complex' })
                                }}
                            >
                                <div className='u-space-between'>
                                    <IconInput 
                                        Icon={IoMdPricetag} 
                                        autoFocus={true} 
                                        name='Name' 
                                        type='text' 
                                        value={name} 
                                        onChange={(e) => e.target.value.length < 26 && setName(e.target.value)} 
                                    />
                                    <IconInput 
                                        Icon={MdDescription} 
                                        name='Description' 
                                        type='text' 
                                        value={description} 
                                        onChange={(e) => setDescription(e.target.value)} 
                                    />
                                </div>

                                <div className='u-center'>
                                    {keyterms.map((item, keytermIndex) => {
                                        return (
                                            <InputSmall 
                                                key={keytermIndex} 
                                                name='Keyterm' 
                                                type='text' 
                                                value={item} 
                                                onChange={(e) => onChangeKeyterm({ index: keytermIndex, value: e.target.value })} 
                                            />
                                        )
                                    })}
                                </div>

                                <div className='u-center u-margin-top-small'>
                                    {keyterms.length < 7 
                                    && <button 
                                        className='button button--green' 
                                        type='button' 
                                        onClick={() => onAddKeyterm()}
                                    >
                                        Add keyterm
                                    </button>}
                                    {keyterms.length == 7 
                                    ? <button 
                                        className='button button--red' 
                                        type='button' 
                                        onClick={() => removeKeyterm()}
                                    >
                                        Remove keyterm
                                    </button>
                                    : keyterms.length > 0 
                                    && <button 
                                        className='button button--red u-margin-left' 
                                        type='button' 
                                        onClick={() => removeKeyterm()}
                                    >
                                        Remove keyterm
                                    </button>}
                                </div>
                                
                                {workouts.map((dayItem, dayIndex) => {
                                    return (
                                        <div key={dayIndex + 50}  className='day__container'>
                                            <h2 
                                                className='u-center u-margin-none' 
                                                style={{ color: color.contrast }}
                                            >
                                                Day: {dayIndex + 1}
                                            </h2>

                                            {dayItem.map((workoutItem, workoutIndex) => {
                                                return (
                                                    <div key={workoutIndex + (1000 * (dayIndex + 1))}>
                                                        <h3 
                                                            className='u-center u-margin-none' 
                                                            style={{ color: color.contrast }}
                                                        >
                                                            Workout: {workoutIndex + 1}
                                                        </h3>

                                                        {workoutItem.map((setItem, setIndex) => {
                                                            return (
                                                                <div key={setIndex + (1000 * (workoutIndex + 1)) + (10000 * (dayIndex + 1))}>
                                                                    <h4 
                                                                        className='u-center u-margin-none' 
                                                                        style={{ color: color.contrast }}
                                                                    >
                                                                        Set: {setIndex + 1}
                                                                    </h4>

                                                                    <div className='create-plan__set--inputs'>
                                                                        <Input 
                                                                            list='exercises' 
                                                                            name='Exercise' 
                                                                            type='text' 
                                                                            value={setItem.exercise} 
                                                                            onChange={(e) => onChangeSet({ day: dayIndex, workout: workoutIndex, set: setIndex, key: 'exercise', value: e.target.value })} 
                                                                        />

                                                                        <Select 
                                                                            name='Assessment type' 
                                                                            value={setItem.maxType} 
                                                                            onChange={(e) => onChangeSet({ day: dayIndex, workout: workoutIndex, set: setIndex, key: 'maxType', value: e.target.value })} 
                                                                        >
                                                                            <option value='Max weight for one rep'>Max weight for one rep</option>
                                                                            <option value='Max weight for multiple reps'>Max weight for multiple reps</option>
                                                                            <option value='Max reps'>Max reps</option>
                                                                            <option value='Max time'>Max time</option>
                                                                        </Select>
                                                                        
                                                                        <Input 
                                                                            name='Percent max (%)' 
                                                                            type='text' 
                                                                            value={setItem.percentMax} 
                                                                            onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeSet({ day: dayIndex, workout: workoutIndex, set: setIndex, key: 'percentMax', value: e.target.value })}
                                                                        />

                                                                        {
                                                                            setItem.maxType == 'Max weight for one rep'
                                                                            ? [<Input 
                                                                                key={(dayIndex * workoutIndex + .1) * .1111}
                                                                                name='Number of reps' 
                                                                                type='text' 
                                                                                value={setItem.staticMetric} 
                                                                                onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeSet({ day: dayIndex, workout: workoutIndex, set: setIndex, key: 'staticMetric', value: e.target.value })}
                                                                            />
                                                                            , <Input 
                                                                                key={(dayIndex * workoutIndex + .1) * .11111}
                                                                                name='Approximate time per rep (s)' 
                                                                                type='text' 
                                                                                value={setItem.timePerRep} 
                                                                                onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeSet({ day: dayIndex, workout: workoutIndex, set: setIndex, key: 'timePerRep', value: e.target.value })}
                                                                            />]

                                                                            : setItem.maxType == 'Max weight for multiple reps'
                                                                            ? [<Input 
                                                                                key={(dayIndex * workoutIndex + .1) * .1111}
                                                                                name='Number of reps for assessment' 
                                                                                type='text' 
                                                                                value={setItem.repsForAssessment} 
                                                                                onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeSet({ day: dayIndex, workout: workoutIndex, set: setIndex, key: 'repsForAssessment', value: e.target.value })} 
                                                                            />
                                                                            , <Input 
                                                                                key={(dayIndex * workoutIndex + .1) * .11111}
                                                                                name='Number of reps' 
                                                                                type='text' 
                                                                                value={setItem.staticMetric} 
                                                                                onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeSet({ day: dayIndex, workout: workoutIndex, set: setIndex, key: 'staticMetric', value: e.target.value })} 
                                                                            />
                                                                            , <Input 
                                                                                key={(dayIndex * workoutIndex + .1) * .111111}
                                                                                name='Approximate time per rep (s)' 
                                                                                type='text' 
                                                                                value={setItem.timePerRep} 
                                                                                onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeSet({ day: dayIndex, workout: workoutIndex, set: setIndex, key: 'timePerRep', value: e.target.value })} 
                                                                            />]

                                                                            : setItem == 'Max reps'
                                                                            ? <Input 
                                                                                name='Approximate time per rep (s)' 
                                                                                type='text' 
                                                                                value={setItem.timePerRep} 
                                                                                onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeSet({ day: dayIndex, workout: workoutIndex, set: setIndex, key: 'timePerRep', value: e.target.value })} 
                                                                            />
                                                                            : setItem == 'Max time'
                                                                            && null
                                                                        }

                                                                        <Input 
                                                                            name='Set rest (s)' 
                                                                            type='text' 
                                                                            value={setItem.setRest} 
                                                                            onChange={(e) => e.target.value.match(/^[0-9]{0,4}$/) && onChangeSet({ day: dayIndex, workout: workoutIndex, set: setIndex, key: 'setRest', value: e.target.value })} 
                                                                        />

                                                                        <Input 
                                                                            name='Additional instructions' 
                                                                            type='text' 
                                                                            value={setItem.additionalInstructions} 
                                                                            onChange={(e) => onChangeSet({ day: dayIndex, workout: workoutIndex, set: setIndex, key: 'additionalInstructions', value: e.target.value })} 
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                
                                                        <div className={workoutItem.length > 0 ? 'u-center' : 'u-center u-margin-top-medium'}>
                                                            <button 
                                                                className='button button--green' 
                                                                type='button' 
                                                                onClick={() => onAddSet({ prevSet: workoutItem[workoutItem.length - 1], day: dayIndex, workout: workoutIndex, set: workoutItem.length })}
                                                            >
                                                                Add set
                                                            </button>
                                                            {workoutItem.length > 0 
                                                            && <button 
                                                                className='button button--red u-margin-left' 
                                                                type='button' 
                                                                onClick={() => onRemoveSet({ day: dayIndex, workout: workoutIndex })}
                                                            >
                                                                Remove set
                                                            </button>}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            
                                            <div className={dayItem.length > 0 ? 'u-center' : 'u-center u-margin-top-medium'}>
                                                <button 
                                                    className='button button--green' 
                                                    type='button' 
                                                    onClick={() => onAddWorkout({ day: dayIndex })}
                                                >
                                                    Add workout
                                                </button>
                                                {dayItem.length !== 0 
                                                && <button 
                                                    className='button button--red u-margin-left' 
                                                    type='button' 
                                                    onClick={() => onRemoveWorkout({ day: dayIndex })}
                                                >
                                                    Remove workout
                                                </button>}
                                            </div>
                                        </div>
                                    )
                                })}

                                <div className='plan__container--submit'>
                                    <button 
                                        className='button button--tertiary' 
                                        type='button'
                                        style={{ 
                                            backgroundColor: color.tertiary, 
                                            borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                        }}
                                        onClick={() => {
                                            localStorage.setItem('complexPlan', JSON.stringify({ name, description, keyterms, workouts }))
                                            localStorage.removeItem('basicPlan')
                                        }}
                                    >
                                        Save for Later
                                    </button>

                                    <button 
                                        className='button button--tertiary u-margin-left' 
                                        type='submit' 
                                        style={{ 
                                            backgroundColor: color.tertiary, 
                                            borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                        }}
                                    >
                                        Create Plan &rarr;
                                    </button>
                                </div>
                            </form>
                            : selectedSection == 'help'
                            && <div>
                                <h2 
                                    className='help--heading' 
                                    style={{ color: color.contrast }}
                                >
                                    Name and search terms
                                </h2>
                                <p 
                                    className='help--info' 
                                    style={{ color: color.contrast }}
                                >
                                    Plans can be searched for by there name and/or search terms. If you want to make it easier for someone to find your plan give it a unique search term.
                                </p>
                                <h2 
                                    className='help--heading' 
                                    style={{ color: color.contrast }}
                                >
                                    Set inputs
                                </h2>
                                <p 
                                    className='help--info' 
                                    style={{ color: color.contrast }}
                                >
                                    Workout plans are not meant to include injury prevention, overcoming isometrics, or stretching. I recommend you include those in your plans description or exercises additional information. There are three types of workouts that are meant to be used in workout plans.
                                </p>
                                <ol>
                                    <li style={{ color: color.contrast }}>
                                        Ones based on one rep maxes or multiple rep maxes where you use a certain weight for a given amount of reps. With these plans you specify the weight with a percentage of the weight that a subscriber can use for a number of reps that you specify. This option is best used for bodybuilding, powerlifting or strength training. You can use this option by selecting "Max weight for one rep" or "Max weight for multiple reps" in the “Assessment type” field.
                                    </li>
                                    <li style={{ color: color.contrast }}>
                                        Ones where you do a certain number of reps of an exercise. With this option you specify the amount of reps with a percentage of the subscribers max reps. This option is best used for calisthenics exercises. You can use this option by selecting "Max reps" in the "Assessment type" field.
                                    </li>
                                    <li style={{ color: color.contrast }}>
                                        Lastly, ones where you do an exercise for a certain amount of time. With this option, you specify the amount of time as a percentage of the max time a user can do that exercise for. This option is best used for isometric exercises and cardio. The set inputs are meant for users to adapt their plan to their fitness level, so if you want a user to do an isometric exercise for a set amount of time I recommend you add it to your plans description or the “Additional information” section of a set you want to superset the exercise with. You can use this option by selecting the “Max time” option in the “Assessment type” field.
                                    </li>
                                </ol>
                                <h2 
                                    className='help--heading' 
                                    style={{ color: color.contrast }}
                                >
                                    Basic plan
                                </h2>
                                <p 
                                    className='help--info' 
                                    style={{ color: color.contrast }}
                                >
                                    Basic plans have workouts with every set being the same as the last. If you would like to include a warmup, then add it to the additional information on the sets. If you want workouts where not every set is the same, then you should consider using a complex plan.
                                </p>
                                <h2 
                                    className='help--heading' 
                                    style={{ color: color.contrast }}
                                >
                                    Complex plan
                                </h2>
                                <p 
                                    className='help--info' 
                                    style={{ color: color.contrast }}
                                >
                                    Advanced plans allow you to make each set of a workout different from the last. Advanced plans are tedious to make, but there are some tricks you can use to make it less tedious. Every time you make a set in a workout, it copies the information from the last set. To speed up the process, you should only click “ADD SET” when you are done filling out the previous set. This way you only have to change the information that is different from the previous set.
                                </p>
                                <h2 
                                    className='help--heading' 
                                    style={{ color: color.contrast }}
                                >
                                    If you have any feedback or questions, please send it to me through the "CONTACT" page and I will get back to you as soon as possible!
                                </h2>
                            </div>
                        }
                        
                        {state.errorMessage && <p className='error-message'>{state.errorMessage}</p>}
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

export default CreatePlanPage