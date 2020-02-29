
export const compileAdvancedWorkouts = (workouts) => {
    let compiledWorkouts = []
    for(let i = 0; i < workouts.length; i++) {
        for(let j = 0; j < workouts[i].length; j++) {
            for(let k = 0; k < workouts[i][j].length; k++) {
                compiledWorkouts.push(workouts[i][j][k])
            }
        }
    }
    return compiledWorkouts
}

export const compileBasicWorkouts = (workouts) => {
    let compiledWorkouts = []
    for(let i = 0; i < workouts.length; i++) {
        for(let j = 0; j < workouts[i].length; j++) {
            for(let k = 0; k < workouts[i][j].sets; k++) {
                compiledWorkouts.push({ ...workouts[i][j], set: (k + 1) })
                delete compiledWorkouts[compiledWorkouts.length - 1].sets
            }
        }
    }
    return compiledWorkouts
}

export const compileSpecificPlan = (plan, record) => {
    return (
        {
            _id: plan._id,
            workouts: plan.workouts.map((item, index) => {
                if(item.maxType == 'Max weight for one rep') {
                    return ({
                        day: item.day,
                        workout: item.workout,
                        set: item.set,
                        exercise: item.exercise,
                        maxType: item.maxType,
                        weight: Math.floor((parseFloat(item.percentMax) / 100) * parseFloat(record[index])),
                        reps: item.staticMetric,
                        time: Math.floor(parseFloat(item.timePerRep) * parseFloat(item.staticMetric)),
                        setRest: item.setRest,
                        additionalInstructions: item.additionalInstructions
                    })
                }else if(item.maxType == 'Max weight for multiple reps') {
                    return ({
                        day: item.day,
                        workout: item.workout,
                        set: item.set,
                        exercise: item.exercise,
                        maxType: item.maxType,
                        weight: Math.floor((parseFloat(item.percentMax) / 100) * parseFloat(record[index])),
                        reps: item.staticMetric,
                        time: Math.floor(parseFloat(item.timePerRep) * parseFloat(item.staticMetric)),
                        setRest: item.setRest,
                        additionalInstructions: item.additionalInstructions
                    })
                }else if(item.maxType == 'Max reps') {
                    return ({
                        day: item.day,
                        workout: item.workout,
                        set: item.set,
                        exercise: item.exercise,
                        maxType: item.maxType,
                        reps: Math.floor((parseFloat(item.percentMax) / 100) * parseFloat(record[index])),
                        time: Math.floor(parseFloat(item.timePerRep) * (parseFloat(item.percentMax) / 100) * parseFloat(record[index])),
                        setRest: item.setRest,
                        additionalInstructions: item.additionalInstructions
                    })
                }else if(item.maxType == 'Max time') {
                    return ({
                        day: item.day,
                        workout: item.workout,
                        set: item.set,
                        exercise: item.exercise,
                        maxType: item.maxType,
                        time: Math.floor((parseFloat(item.percentMax) / 100) * parseFloat(record[index])),
                        setRest: item.setRest,
                        additionalInstructions: item.additionalInstructions
                    })
                }else if(item.maxType == 'Max distance') {
                    return ({
                        day: item.day,
                        workout: item.workout,
                        set: item.set,
                        exercise: item.exercise,
                        maxType: item.maxType,
                        staticMetric: item.staticMetric,
                        distance: Math.floor((parseFloat(item.percentMax) / 100) * parseFloat(record[index])),
                        time: Math.floor((parseFloat(item.percentMax) / 100) * parseFloat(record[index]) * item.timePerRep * 60),
                        setRest: item.setRest,
                        additionalInstructions: item.additionalInstructions
                    })
                }
            })
        }
    )
}