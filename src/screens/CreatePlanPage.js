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
    const [ expandAll, setExpandAll ] = useState(false)
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
    const [ activeDay, setActiveDay ] = useState(null)
    const [ selectedSection, setSelectedSection ] = useState('complex')
    const [ activeWorkout, setActiveWorkout ] = useState(null)
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
        setActiveWorkout(nextState[day].length - 1)
        
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
        setActiveWorkout(nextState[day].length - 1)
        
        setWorkouts(nextState)
    }
    
    const onChangeBasicWorkout = ({ day, workout, key, value }) => {
        let nextState = [ ...basicWorkouts ]
        
        nextState[day][workout][key] = value
        if(key == 'maxType') {
            nextState[day][workout].repsForAssessment = ''
            nextState[day][workout].timePerRep = ''
            
            if(value == 'Max distance') {
                nextState[day][workout].staticMetric = 'mile'
            }else {
                nextState[day][workout].staticMetric = ''
            }
            
            if(value == 'Max weight for multiple rep') {
                nextState[day][workout].percentMax = 100
                nextState[day][workout][set].repsForAssessment = '10'
            }
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
            nextState[day][workout][set].timePerRep = ''
            
            if(value == 'Max distance') {
                nextState[day][workout][set].staticMetric = 'mile'
            }else {
                nextState[day][workout][set].staticMetric = ''
            }
            
            if(value == 'Max weight for multiple rep') {
                nextState[day][workout][set].percentMax = 100
                nextState[day][workout][set].repsForAssessment = '10'
            }
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
                            <div className='section-form__container'>
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
                                            setActiveDay(null)
                                            setActiveWorkout(null)
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
                                            setActiveDay(null)
                                            setActiveWorkout(null)
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
                                    {keyterms.length > 0 
                                    && <button 
                                        className={keyterms.length == 7 ? 'button button--red' : 'button button--red u-margin-left'} 
                                        type='button' 
                                        onClick={() => removeKeyterm()}
                                    >
                                        Remove keyterm
                                    </button>}
                                </div>

                                <div className='u-center'>
                                    <div 
                                        className='button button--contrast'
                                        style={{ border: '1.5px solid ' + color.contrast }}
                                    >
                                        <a onClick={() => setExpandAll(!expandAll)}>
                                            <h3 style={{ color: color.contrast}}>{expandAll ? 'Collapse all' : 'Expand all'}</h3>
                                        </a>
                                    </div>
                                </div>

                                {basicWorkouts.map((dayItem, dayIndex) => {
                                    return (
                                        <div key={dayIndex + 80} className='day__container'>
                                            <a onClick={() => {
                                                setActiveWorkout(null)
                                                setActiveDay(dayIndex == activeDay ? null : dayIndex)
                                            }}>
                                                <h2 
                                                    className='u-center u-margin-none' 
                                                    style={{ color: color.contrast }}
                                                >
                                                    {expandAll || dayIndex == activeDay
                                                    ? <span>Day: {dayIndex + 1} &#9660;</span>
                                                    : <span>Day: {dayIndex + 1} &#9650;</span>}
                                                </h2>
                                            </a>

                                            {expandAll || activeDay == dayIndex
                                            ? dayItem.map((workoutItem, workoutIndex) => {
                                                return (
                                                    <div key={workoutIndex + (1000000 * (dayIndex + 1))}>
                                                        <a onClick={() => setActiveWorkout(workoutIndex == activeWorkout ? null : workoutIndex)}>
                                                            <h3 
                                                                className='u-center u-margin-none' 
                                                                style={{ color: color.contrast }}
                                                            >
                                                                {expandAll || workoutIndex == activeWorkout
                                                                ? <span>Workout: {workoutIndex + 1} &#9660;</span>
                                                                : <span>Workout: {workoutIndex + 1} &#9650;</span>}
                                                            </h3>
                                                        </a>

                                                        {expandAll || activeWorkout == workoutIndex
                                                        ? <div className='create-plan__set--inputs'>
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
                                                                <option value='Max weight for multiple reps'>Rate of perceived exertion</option>
                                                                <option value='Max reps'>Max reps</option>
                                                                <option value='Max time'>Max time</option>
                                                                <option value='Max distance'>Max distance</option>
                                                            </Select>
                                                            
                                                            {workoutItem.maxType !== 'Max weight for multiple reps'
                                                            && <Input 
                                                                name='Percent max (%)' 
                                                                type='text' 
                                                                value={workoutItem.percentMax} 
                                                                onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeBasicWorkout({ day: dayIndex, workout: workoutIndex, key: 'percentMax', value: e.target.value })}
                                                            />}

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
                                                                ? [<Select 
                                                                    key={(dayIndex * workoutIndex + .1) * .1111}
                                                                    name='Rate of Perceived Exertion' 
                                                                    value={workoutItem.repsForAssessment} 
                                                                    onChange={(e) => onChangeBasicWorkout({ day: dayIndex, workout: workoutIndex, key: 'repsForAssessment', value: e.target.value })} 
                                                                >
                                                                    <option value='10'>10</option>
                                                                    <option value='9'>9</option>
                                                                    <option value='8'>8</option>
                                                                    <option value='7'>7</option>
                                                                    <option value='6'>6</option>
                                                                    <option value='5'>5</option>
                                                                    <option value='4'>4</option>
                                                                </Select>
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
                                                                : workoutItem.maxType == 'Max distance'
                                                                ? [<Select 
                                                                    key={(dayIndex * workoutIndex + .1) * .1111}
                                                                    name='Distance units' 
                                                                    value={workoutItem.staticMetric} 
                                                                    onChange={(e) => onChangeBasicWorkout({ day: dayIndex, workout: workoutIndex, key: 'staticMetric', value: e.target.value })} 
                                                                >
                                                                    <option value='mile'>Miles</option>
                                                                    <option value='yard'>Yards</option>
                                                                    <option value='kilometer'>Kilometers</option>
                                                                    <option value='meter'>Meters</option>
                                                                </Select>,
                                                                <Input 
                                                                    key={(dayIndex * workoutIndex + .1) * .11111}
                                                                    name={'Approximate minutes per ' + workoutItem.staticMetric}
                                                                    type='text' 
                                                                    value={workoutItem.timePerRep} 
                                                                    onChange={(e) => !!e.target.value.match(/^[0-9]{0,4}$/) && onChangeBasicWorkout({ day: dayIndex, workout: workoutIndex, key: 'timePerRep', value: e.target.value })} 
                                                                />]
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
                                                        : null}
                                                    </div>
                                                )
                                            })
                                            : null}
                                            
                                            {expandAll || activeDay == dayIndex
                                            ? <div className={dayItem.length == 0 || activeWorkout !== dayItem.length - 1 ? 'u-center u-margin-top-medium' : 'u-center'}>
                                                <button 
                                                    className='button button--green' 
                                                    type='button' 
                                                    onClick={() => onAddBasicWorkout({ day: dayIndex })}
                                                >
                                                    Add workout
                                                </button>
                                                {dayItem.length !== 0
                                                && <button 
                                                    className='button button--red u-margin-left' 
                                                    type='button' 
                                                    onClick={() => onRemoveBasicWorkout({ day: dayIndex })}
                                                >
                                                    Remove workout
                                                </button>}
                                            </div>
                                            : null}
                                        </div>
                                    )
                                })}

                                <div className='plan__container--submit'>
                                    {localStorage.getItem('basicPlan')
                                    && <button 
                                        className='button button--tertiary' 
                                        type='button'
                                        style={{ 
                                            backgroundColor: color.tertiary, 
                                            borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                        }}
                                        onClick={() => {
                                            localStorage.removeItem('basicPlan')
                                            setName('')
                                            setDescription('')
                                            setKeyterms([])
                                            setBasicWorkouts([[], [], [], [], [], [], []])
                                        }}
                                    >
                                        Delete plan
                                    </button>}

                                    <button 
                                        className={localStorage.getItem('basicPlan') ? 'button button--tertiary u-margin-left' : 'button button--tertiary'} 
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
                                        {localStorage.getItem('basicPlan') ? 'Override save' : 'Save for Later'}
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
                                    {keyterms.length > 0 
                                    && <button 
                                        className={keyterms.length == 7 ? 'button button--red' : 'button button--red u-margin-left'}
                                        type='button' 
                                        onClick={() => removeKeyterm()}
                                    >
                                        Remove keyterm
                                    </button>}
                                </div>

                                <div className='u-center'>
                                    <div 
                                        className='button button--contrast'
                                        style={{ border: '1.5px solid ' + color.contrast }}
                                    >
                                        <a onClick={() => setExpandAll(!expandAll)}>
                                            <h3 style={{ color: color.contrast}}>{expandAll ? 'Collapse all' : 'Expand all'}</h3>
                                        </a>
                                    </div>
                                </div>
                                
                                {workouts.map((dayItem, dayIndex) => {
                                    return (
                                        <div key={dayIndex + 50}  className='day__container'>
                                            <a onClick={() => {
                                                setActiveWorkout(null)
                                                setActiveDay(dayIndex == activeDay ? null : dayIndex)
                                            }}>
                                                <h2 
                                                    className='u-center u-margin-none' 
                                                    style={{ color: color.contrast }}
                                                >
                                                    {expandAll || dayIndex == activeDay
                                                    ? <span>Day: {dayIndex + 1} &#9660;</span>
                                                    : <span>Day: {dayIndex + 1} &#9650;</span>}
                                                </h2>
                                            </a>

                                            {expandAll || activeDay == dayIndex
                                            ? dayItem.map((workoutItem, workoutIndex) => {
                                                return (
                                                    <div key={workoutIndex + (1000 * (dayIndex + 1))}>
                                                        <a onClick={() => setActiveWorkout(workoutIndex == activeWorkout ? null : workoutIndex)}>
                                                            <h3 
                                                                className='u-center u-margin-none' 
                                                                style={{ color: color.contrast }}
                                                            >
                                                                {expandAll || workoutIndex == activeWorkout
                                                                ? <span>Workout: {workoutIndex + 1} &#9660;</span>
                                                                : <span>Workout: {workoutIndex + 1} &#9650;</span>}
                                                            </h3>
                                                        </a>

                                                        {expandAll || activeWorkout == workoutIndex
                                                        ? workoutItem.map((setItem, setIndex) => {
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
                                                                            <option value='Max weight for multiple reps'>Rate of perceived exertion</option>
                                                                            <option value='Max reps'>Max reps</option>
                                                                            <option value='Max time'>Max time</option>
                                                                            <option value='Max distance'>Max distance</option>
                                                                        </Select>
                                                                        
                                                                        {setItem.maxType !== 'Max weight for multiple reps'
                                                                        && <Input 
                                                                            name='Percent max (%)' 
                                                                            type='text' 
                                                                            value={setItem.percentMax} 
                                                                            onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeSet({ day: dayIndex, workout: workoutIndex, set: setIndex, key: 'percentMax', value: e.target.value })}
                                                                        />}

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
                                                                            ? [<Select 
                                                                                key={(dayIndex * workoutIndex + .1) * .1111}
                                                                                name='Rate of Perceived Exertion' 
                                                                                value={setItem.repsForAssessment} 
                                                                                onChange={(e) => onChangeSet({ day: dayIndex, workout: workoutIndex, set: setIndex, key: 'repsForAssessment', value: e.target.value })} 
                                                                            >
                                                                                <option value='10'>10</option>
                                                                                <option value='9'>9</option>
                                                                                <option value='8'>8</option>
                                                                                <option value='7'>7</option>
                                                                                <option value='6'>6</option>
                                                                                <option value='5'>5</option>
                                                                                <option value='4'>4</option>
                                                                            </Select>
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

                                                                            : setItem.maxType == 'Max reps'
                                                                            ? <Input 
                                                                                name='Approximate time per rep (s)' 
                                                                                type='text' 
                                                                                value={setItem.timePerRep} 
                                                                                onChange={(e) => e.target.value.match(/^[0-9]{0,2}$/) && onChangeSet({ day: dayIndex, workout: workoutIndex, set: setIndex, key: 'timePerRep', value: e.target.value })} 
                                                                            />

                                                                            : setItem.maxType == 'Max distance'
                                                                            ? [<Select 
                                                                                key={(dayIndex * workoutIndex + .1) * .1111}
                                                                                name='Distance units' 
                                                                                value={setItem.staticMetric} 
                                                                                onChange={(e) => onChangeSet({ day: dayIndex, workout: workoutIndex, set: setIndex, key: 'staticMetric', value: e.target.value })} 
                                                                            >
                                                                                <option value='mile'>Miles</option>
                                                                                <option value='yard'>Yards</option>
                                                                                <option value='kilometer'>Kilometers</option>
                                                                                <option value='meter'>Meters</option>
                                                                            </Select>,
                                                                            <Input 
                                                                                key={(dayIndex * workoutIndex + .1) * .11111}
                                                                                name={'Approximate minutes per ' + setItem.staticMetric}
                                                                                type='number' 
                                                                                value={setItem.timePerRep} 
                                                                                onChange={(e) => onChangeSet({ day: dayIndex, workout: workoutIndex, set: setIndex, key: 'timePerRep', value: e.target.value })} 
                                                                            />]
                                                                            
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
                                                        })
                                                        : null}
                                
                                                        {expandAll || activeWorkout == workoutIndex
                                                        ? <div className={workoutItem.length > 0 ? 'u-center' : 'u-center u-margin-top-medium'}>
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
                                                        : null}
                                                    </div>
                                                )
                                            })
                                            : null}
                                            
                                            {expandAll || activeDay == dayIndex
                                            ? <div className={dayItem.length == 0 || activeWorkout !== dayItem.length - 1 ? 'u-center u-margin-top-medium' : 'u-center'}>
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
                                            : null}
                                        </div>
                                    )
                                })}

                                <div className='plan__container--submit'>
                                    {localStorage.getItem('complexPlan')
                                    && <button 
                                        className='button button--tertiary' 
                                        type='button'
                                        style={{ 
                                            backgroundColor: color.tertiary, 
                                            borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                        }}
                                        onClick={() => {
                                            localStorage.removeItem('complexPlan')
                                            setName('')
                                            setDescription('')
                                            setKeyterms([])
                                            setWorkouts([[], [], [], [], [], [], []])
                                        }}
                                    >
                                        Delete plan
                                    </button>}

                                    <button 
                                        className={localStorage.getItem('complexPlan') ? 'button button--tertiary u-margin-left' : 'button button--tertiary'} 
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
                                        {localStorage.getItem('complexPlan') ? 'Override save' : 'Save for Later'}
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
                                    Name and Search Terms
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
                                    Set Inputs
                                </h2>
                                <p 
                                    className='help--info' 
                                    style={{ color: color.contrast }}
                                >
                                    Workout plans are not meant to include injury prevention, overcoming isometrics, or stretching. I recommend you include those in your plans description or exercises additional information. There are four types of workouts that are meant to be used in workout plans.
                                </p>
                                <ol>
                                    <li style={{ color: color.contrast }}>
                                        Ones based on one rep maxes where you use a certain weight for a given amount of reps. With these plans you specify the weight with a percentage of the weight that a subscriber can use for a number of reps that you specify. This option is best for bodybuilding or strength training. You can use this option by selecting "Max weight for one rep" in the “Assessment type” field.
                                    </li>
                                    <li style={{ color: color.contrast }}>
                                        Ones based on rate of perceived exertion where you do your max weight for some amount of reps, but do less reps on that based on the sets RPE. With these plans you specify the amount of reps you want the user to do and the Rate of Perceived Exertion. This option is best for powerlifting. You can use this option by selecting "Rate of Perceived Exertion" in the “Assessment type” field.
                                    </li>
                                    <li style={{ color: color.contrast }}>
                                        Ones where you do a certain number of reps of an exercise. With this option you specify the amount of reps with a percentage of the subscribers max reps. This option is best for calisthenics exercises. You can use this option by selecting "Max reps" in the "Assessment type" field.
                                    </li>
                                    <li style={{ color: color.contrast }}>
                                        Ones where you do an exercise for a certain amount of time. With this option, you specify the amount of time as a percentage of the max time a user can do that exercise for. This option is best for isometric exercises and exercises like battle ropes. The set inputs are meant for users to adapt their plan to their fitness level, so if you want a user to do an isometric exercise for a set amount of time I recommend you add it to your plans description or the “Additional information” section of a set you want to superset the exercise with. You can use this option by selecting the “Max time” option in the “Assessment type” field.
                                    </li>
                                    <li style={{ color: color.contrast }}>
                                        Lastly, ones where you do an exercise for a certain distance. With this option, you specify the distance as a percentage of the max distance a user can do that exercise for. This option is best for exercises like running, and the strong man yoke walk. You can use this option by selecting the “Max distance” option in the “Assessment type” field.
                                    </li>
                                </ol>

                                <h2 
                                    className='help--heading' 
                                    style={{ color: color.contrast }}
                                >
                                    Basic Plan
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
                                    Complex Plan
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
                                    Other Tools
                                </h2>
                                <p 
                                    className='help--info' 
                                    style={{ color: color.contrast }}
                                >
                                    Sets are by default, hidden under day and workout tabs. You can either view them by opening the tabs and working on one workout at a time, or you can click the expand all button under the key-terms inputs to view all of them. If you don't have time to finish a plan, click the save for later button to save the plan to the plan creation page. If you do this than the next time you open the page, your plan will be there waiting for you. Keep in mind that if you don't finish it then you will have to save it again so you don't lose your progress.
                                </p>

                                <h3 
                                    className='help--heading' 
                                    style={{ color: color.contrast }}
                                >
                                    If you have any feedback or questions, please send it to me through the "CONTACT" page and I will get back to you as soon as possible!
                                </h3>
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