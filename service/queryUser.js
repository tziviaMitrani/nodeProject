import { query } from "express";

function getQuery(tableName) {
    const query = `SELECT * FROM ${tableName} where isActive = 1`;
    return query
}

function getByParamQuery(tableName, param) {
    const query = `SELECT * FROM ${tableName} where isActive = 1 AND ${param} = ?`;
    return query
}

function getByIdQuery(tableName) {
    const query = `SELECT * FROM ${tableName} where isActive = 1 AND id = ?`;
    return query
}

function deleteQuery(tableName) {
    const query = `UPDATE ${tableName} SET isActive = 0 WHERE Id = ?`;
    return query
}

function postQuery(tableName) {

    let query;
    switch (tableName) {
        case 'users':
            console.log("table" + tableName);
            query = `INSERT INTO users (name, username, email, phone,isActive) VALUES (?,?,?,?,1)`;
            break;
        case 'posts':
            query = `INSERT INTO posts (title,body,userId) VALUES (?,?,?)`;
            break;
        case 'todos':
            query = `INSERT INTO todos (title, completed, userId) VALUES (?,?,?)`;
            break;
        case 'comments':
            query = `INSERT INTO comments (postId, name, email, body) VALUES (?,?,?,?)`;
            break;
        default:
            break;
    }
    return query;
}

function putQuery(tableName) {
    let query;
    switch (tableName) {
        case 'users':
            query = `UPDATE users SET name=?, userName=?, email=?, phone=?  WHERE id = ?`;
            break;
        case 'posts':
            query = `UPDATE posts SET title=?, body=? WHERE id = ?`;
            break;
        case 'todos':
            query = `UPDATE todos SET title=?, completed=?, userId=? WHERE id = ?`;
            break;
        case 'comments':
            query = `UPDATE comments SET name=?, body=? WHERE id = ?`;
            break;

        default:
            break;
    }
    return query;
}


export {
    getQuery, getByIdQuery, getByParamQuery, deleteQuery, postQuery, putQuery
}

// putUserQurery, putPostQurery, putCommentQurery, putTodoQurery, postCommentQuery, postTodoQuery, postPostQuery, postUserQuery
//post
//להכניס לפי שדות של user
function postUserQuery() {
    const query = `INSERT INTO users (name, username, email, phone,isActive) VALUES (?,?,?,?,1)`;
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
    const query = `UPDATE db_for_project.users SET name=?, userName=?, email=?, phone=?  WHERE id = ?`;
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