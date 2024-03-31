function getQuery(tableName) {
    const query = `SELECT * FROM ${tableName}`;
    return query
}

function getByIdQuery(tableName) {
    const query = `SELECT * FROM ${tableName} where id = ?`;
    return query
}

function deleteQuery(tableName) {
    const query = `UPDATE ${tableName} SET isActive=0 WHERE Id = ?`;
    return query
}
function PostQuery(tableName)
{
//פונקציה ששולחת לפי שם טבלה post
}

function putQuery(tableName)
{
//פונ' ששולחת לפי שם טבלה put
}

export {
    getQuery, getByIdQuery, deleteQuery, PostQuery, putQuery
}





// putUserQurery, putPostQurery, putCommentQurery, putTodoQurery, postCommentQuery, postTodoQuery, postPostQuery, postUserQuery
//post
//להכניס לפי שדות של user
function postUserQuery(tableName) {
    const query = `"INSERT INTO db_for_project.users () VALUES (?,?,?,?,?)`;
    return query
}
//להכניס לפי שדות של post
function postPostQuery(tableName) {
    const query = `"INSERT INTO db_for_project.posts () VALUES (?,?,?,?,?)`;
    return query
}
//להכניס לפי שדות של comments
function postTodoQuery(tableName) {
    const query = `"INSERT INTO db_for_project.todos () VALUES (?,?,?,?,?)`;
    return query
}
//להכניס לפי שדות של comments
function postCommentQuery(tableName) {
    const query = `"INSERT INTO db_for_project.comments () VALUES (?,?,?,?,?)`;
    return query
}


//put
//להכניס לפי שדות של user
function putUserQurery() {
    const query = `UPDATE db_for_project.users SET email=?  WHERE id = ?`;
    return query
}
//להכניס לפי שדות של post
function putPostQurery() {
    const query = `UPDATE db_for_project.posts SET ? WHERE id = ?`;
    return query
}
//להכניס לפי שדות של comments
function putCommentQurery() {
    const query = `UPDATE db_for_project.comments SET ? WHERE id = ?`;
    return query
}
//להכניס לפי שדות של todo
function putTodoQurery() {
    const query = `UPDATE db_for_project.todos SET ? WHERE id = ?`;
    return query
}