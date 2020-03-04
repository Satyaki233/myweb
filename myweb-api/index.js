const express = require('express');

const pg = require('pg')
const morgan=require('morgan');
const cors = require('cors');
const bodyParser =require('body-parser');
const Joi = require('@hapi/joi')
//middle wares........

const app = express();
require('dotenv').config();

app.use(cors());
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use(bodyParser.json());
app.use(morgan('dev'));


//Database...((Knex))

const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
      host :process.env.HOST,
      user : process.env.USER,
      password :process.env.PASS,
      database :process.env.NAME
    }
  });
//Imports................

const User= require('./routes/User')
const Post= require('./routes/Post')
//Knex...Tables........

///1 Contact tables
knex.schema.hasTable('contact').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('contact', function(t) {
        t.increments('id').primary();
        t.string('name', 100);
        t.string('email', 100);
        t.text('body');
      });
    }
  });



///2.Artical table................
knex.schema.hasTable('artical').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('artical', function(t) {
      t.increments('id').primary();
      t.string('title', 100);
      t.text('intro');
      t.text('imagelocation',100)
      t.text('imagename',100)
      t.text('pg_one');
      t.text('pg_two');
      t.text('pg_three');
    });
  }
});

knex.schema.hasTable('multiple').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('multiple', function(t) {
      t.increments('id').primary();
      t.string('title', 100);
      t.text('intro');
      t.specificType('imagelocation','text ARRAY')
      t.specificType('imagename','text ARRAY')
      t.text('pg_one');
      t.text('pg_two');
      t.text('pg_three');
    });
  }
});


//Routes..................

app.get('/',(req,res)=>{
    res.status(200).json({message:"Api is working"})
})

app.post('/Contacts',(req,res)=>{User.handelContactsPost(req,res,knex)})

app.get('/Contacts',(req,res)=>{User.handelContactsGet(req,res,knex)})

app.post('/Artical',(req,res)=>{Post.handelArticalPost(req,res,knex)})

app.post('/Multiple',(req,res)=>{Post.handelMultiPost(req,res,knex)})

app.get('/Multiple',(req,res)=>{Post.handelMultipleGet(req,res,knex)})

app.delete('/Multiple/:id',(req,res)=>{Post.handelMultipleDelete(req,res,knex)})

//App listen

app.listen(process.env.PORT || 8000,()=>{
    console.log('server is running')
})