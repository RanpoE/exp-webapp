export const getCurrentDate = () => {
    var today = new Date()

    return today;
}

export const capitalizeWord = word => {
    return word && word[0].toUpperCase() + word.slice(1)
}

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
        console.log(response)
        if (response.status === 201) {
            return { message: 'Record created'}
        }

    } catch (error) {
        return { error }
    }
    cb()
}
// ci