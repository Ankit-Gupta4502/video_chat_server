

const formatError = (results) => {
    const errors = {}
    results.errors.forEach((item) => {
        errors[item.path] = item.msg
    })
    return errors
}

module.exports = { formatError }