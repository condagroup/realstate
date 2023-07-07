const express = require('express');
const cors = require('cors');
const multer = require("multer");
const fs=require("fs")
const mv = require('mv');
const path=require('path')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const formidable=require('formidable');
const prisma = require("../lib/prisma");
const authenticateToken = require('../functions/authenticateToken')
const REQUEST_URL  = require('./Urls');
const app = express()
require('dotenv').config({path: __dirname + '/.env'});

app.use(express.json())
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', REQUEST_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors());
app.options('*', cors());

app.get('/', function (req, res) {
  return res.send({ error: true, message: 'hello' })
});
   
app.post('/add', async (req, res) => {
	
	
	var form=new formidable.IncomingForm()
	
	form.parse(req,async (err,fields,files)=>{
		
		const {title,description,section,readTime,categorie,tags } = fields;

		const tmp_name=files.picture.filepath;
		const file_name=files.picture.originalFilename;
		
		let file_saved=false;
		await new Promise((resolve,reject)=>{
			mv(tmp_name,"./uploads/"+file_name,(err)=>{
				if(err){
					file_saved=false;
					reject()
				}else{
					file_saved=true;
					console.log("file is saved")
					resolve()
				}
			})
		})

		const data={
			picture:file_name,
			title,
			description,
			section,
			readTime,
			tags,
			category:categorie,
		  }

	
		if(file_saved){
			try {
			const newBlog = await prisma.blog.create({
			data: data
			})
			return res.json(newBlog)
		  } catch (err) {
			console.log("there is an error",err.message)
			return res.status(500).json(err.message)
		  }
		  
		}

	})
	
})




app.get('/blogs', authenticateToken, async (req, res) => {
  try {
    const userss = await prisma.blog.findMany()
    return res.json(userss)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})


app.get("/delete",async (req,res)=>{
	const id = req.query.id;
  try {
    await prisma.blog.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Blog deleted!" });
  } catch (err) {
    console.log("Error deleting blog", err);
    res.status(500).json({ message: "Error deleting blog" });
  }
})

app.post("/update",async(req,res)=>{
	
	
	
	var form=new formidable.IncomingForm()
	
	form.parse(req,async (err,fields,files)=>{
		
		const {title,description,section,readTime, id,categorie,tags} = fields;
		let data={title,description,section,readTime,category:categorie,tags};

		
		if(files.picture!=undefined){
			const tmp_name=files.picture.filepath;
			const file_name=files.picture.originalFilename;
			
			let file_saved=false;
			if(file_name!=""){
				await new Promise((resolve,reject)=>{
					mv(tmp_name,"./uploads/"+file_name,(err)=>{
						if(err){
							file_saved=false;
							reject()
						}else{
							file_saved=true;
							data.picture=file_name;	
							console.log("file is saved")
							resolve()
						}
					})
				})
			}
		}
		
		try {
		await prisma.blog.update({
			where:{
				id:parseInt(id)
			},
			data: data
		})
		
		return res.json({message:"ok for "+id})
		} catch (err) {
		return res.status(500).json({message:err.message})
		}
		  
		

	})
	
})


module.exports = app;