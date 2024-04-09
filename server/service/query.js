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

function checkPasswordQuery(tableName) {
    const query = `SELECT COUNT(*) FROM ${tableName} WHERE isActive = 1 AND username = ? AND password = ?`;
    return query;
}

function deleteQuery(tableName, param) {
    const query = `UPDATE ${tableName} SET isActive = 0 WHERE ${param} = ?`;
    return query
}

function postQuery(tableName) {

    let query;
    switch (tableName) {
        case 'users':
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
        case 'passwords':
            query = `INSERT INTO passwords (username, password) VALUES (?,?)`
        default:
            break;
    }
    return query;
}

function putQuery(tableName) {
    let query;
    switch (tableName) {
        case 'users':
            query = `UPDATE users SET name=?, username=?, email=?, phone=?  WHERE id = ?`;
            break;
        case 'posts':
            query = `UPDATE posts SET title=?, body=? WHERE id = ?`;
            break;
        case 'todos':
            query = `UPDATE todos SET title=?, completed=? WHERE id = ?`;
            break;
        case 'comments':
            query = `UPDATE comments SET name=?, body=? WHERE id = ?`;
            break;
        case 'passwords':
            query = `UPDATE passwords SET password=? WHERE username = ?`;
        default:
            break;
    }
    return query;
}

function limitQuery(tableName) {
    const query = `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`;
    return query;
}

export {
    getQuery, getByIdQuery, getByParamQuery, deleteQuery, postQuery, putQuery, checkPasswordQuery, limitQuery
}

