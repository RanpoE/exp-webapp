export const postRequest = async (url, data, cb) => {
    const headers = {
        "Content-Type": "application/json",
    }
    console.log(data)
    try {
        const request = new Request(url, {
            headers,
            method: 'POST', body: JSON.stringify(data)
        })
        const response = await fetch(request)

        if (response.status === 201) {
            return { message: 'Record created' }
        }
        return response

    } catch (error) {
        return { error }
    }
    // cb()
}
// ci

export const getRequest = async (url, controller = new AbortController()) => {
    try {
        // const request = new Request(url, { method: 'GET', signal: controller.signal })
        const response = await fetch(url, { signal: controller.signal })
        if (response.status === 200) {
            const data = await response.json()
            console.log(data)
            return data
        }
    } catch (error) {
        return { error: error.message }
    }
}

export const getCurrentDate = () => {
    var today = new Date()

    return today;
}

export const capitalizeWord = word => {
    return word && word[0].toUpperCase() + word.slice(1)
}



export const dateFormat = (date = new Date()) => {
    if (typeof (date) === 'string') return date.split('T')[0]
    const dateString = date.toISOString()

    return dateString.split('T')[0]
}

export const addDays = (day = 1) => {
    var currentDate = new Date()
    return currentDate.setDate(currentDate.getDate() + day)
}

export const randomNum = () => {
    let random = Math.floor(Math.random() * 100 + 1)
    return random;
}