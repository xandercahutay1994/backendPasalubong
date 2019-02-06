const saveToSessionStorage = state => {
    // const key = Object.keys(state)
    try {
        const serialState = JSON.stringify(state)
        // localStorage.setItem(...key, serialState)
        localStorage.setItem('state', serialState)
    } catch(e) {
        console.log(e)
        return undefined
    }
}

const loadFromStorage = () => {
    try {
        const serialState = localStorage.getItem('state')
        if (serialState === null) return
        return JSON.parse(serialState)
    } catch(e) {
        console.log(e)
        return undefined
    }
}

export {
    saveToSessionStorage,   
    loadFromStorage,
}


