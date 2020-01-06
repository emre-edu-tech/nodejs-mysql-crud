const express = require('express');
const mysql = require('mysql');

// Create mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysqlprojectdb',
});

// Connect
connection.connect((error) => {
    if(error){
        throw error;
    }

    console.log('Mysql connected ...')
});

const app = express();

// create db using application
app.get('/createdb', (request, response) => {
    // create query for database creation
    let sql = 'CREATE DATABASE nodemysqlprojectdb';
    connection.query(sql, (error, result) => {
        if(error) throw error;
        console.log(result);
        response.send('Database created');
    });
});

// create table
app.get('/create-posts-table', (request, response) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body TEXT, PRIMARY KEY(id))';
    connection.query(sql, (error, result) => {
        if(error) throw error;
        console.log(result);
        response.send('Posts Table created');
    });
});

// insert post to the posts table
app.get('/addpost', (request, response) => {
    let post = {
        title: 'My first post title',
        body: 'My first post body',
    };
    let sql = "INSERT INTO posts SET ?";
    let query = connection.query(sql, post, (error, result) => {
        if(error) throw error;
        console.log(result);
        response.send('Post added to posts table');
    });
});

// get all posts
app.get('/getposts', (request, response) => {
    let sql = 'SELECT * FROM posts';
    let query = connection.query(sql, (error, results) => {
        if(error) throw error;
        console.log(results);
        response.send('Posts fetched...');
    });  
});

// getpost by id
app.get('/getpost/:id', (request, response) => {
    let sql = `SELECT * FROM posts WHERE id = ${request.params.id}`;
    let query = connection.query(sql, (error, result) => {
        if(error) throw error;
        console.log(result);
        response.send(`Post number ${request.params.id} fetched...`);
    });  
});

// Update post
app.get('/updatepost/:id', (request, response) => {
    let newTitle = 'My new title - UPDATED';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${request.params.id}`;
    let query = connection.query(sql, (error, result) => {
        if(error) throw error;
        console.log(result);
        response.send(`Post number ${request.params.id} updated...`);
    });  
});

// delete post
app.get('/deletepost/:id', (request, response) => {
    let sql = `DELETE FROM posts WHERE id = ${request.params.id}`;
    let query = connection.query(sql, (error, result) => {
        if(error) throw error;
        console.log(result);
        response.send(`Post number ${request.params.id} deleted...`);
    });  
});

app.listen('3000', () => {
    console.log('Server listening on port 3000');
});