function getTetsQuery() {
    const query = `SELECT * FROM db_users.test `;
    return query
}

function getTetsByIdQuery() {
    const query = `SELECT * FROM db_users.test  where id = ?`;
    return query
}


export {
    getTetsQuery, getTetsByIdQuery
}