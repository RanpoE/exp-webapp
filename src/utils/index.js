export const getCurrentDate = () => {
    var today = new Date()

    return today;
}

export const capitalizeWord = word => {
    return word && word[0].toUpperCase() + word.slice(1)
}

// ci