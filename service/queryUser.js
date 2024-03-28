function getUserQuery() {
    const query = `SELECT * FROM db_for_project.users `;
    return query
}

function getUserByIdQuery() {
    const query = `SELECT * FROM db_for_project.users where id = ?`;
    return query
}


export {
    getUserQuery, getUserByIdQuery
}