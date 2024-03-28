function getUserQuery() {
    const query = `SELECT * FROM tz&e.users `;
    return query
}

function getUserByIdQuery() {
    const query = `SELECT * FROM tz&e.users where id = ?`;
    return query
}


export {
    getUserQuery, getUserByIdQuery
}