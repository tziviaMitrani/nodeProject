export const logErrors = (error, req, res, next) => {
    const statusCode = error && error.hasOwnProperty("statusCode") ? error.statusCode : 500;
    const message = error && error.hasOwnProperty("message") ? error.message : '';
    console.error(`error statusCode:  ${statusCode} message: ${message} `)
    return res.status(statusCode).json({ status: statusCode, message: errMessageForClient(statusCode) });
}

function errMessageForClient(statusCode) {
    console.log("status code ---" +statusCode);
    switch (statusCode) {
        case 400:
            return 'Invalid request parameters';
        case 401:
            return 'Authorization required';
        case 404:
            return 'Not found';
        case 409:
            return 'Bad request';
        case 500:
            return 'Internal Server Error';
        default:
            return 'Something went wrong!';
    }
}