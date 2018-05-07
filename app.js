const express = require('express');
const app = express();
app.set('views',__dirname + '/views');
app.set('view engine','ejs');

const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb://localhost:27017/todo';
const ObjectId = require('mongodb').ObjectId;


MongoClient.connect(mongoURL, function(err,database){

	if(err){
		console.log(err);
	}
	else{
		todos = database.collection('todos');
		console.log("Database connected successfully");
	}

});



const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.get("/", function(req,res){


	todos.find({}).toArray(function(err,docs){
		if(err){
			console.log(err);
		}
		else{
			res.render('index',{ docs:docs});
		}
	});
});

app.get("/todos/add",function(req,res){

	res.render('add');
});

	



app.get("/todos/:id", function(req,res){

	var id = ObjectId(req.params.id);



	todos.findOne({_id: id}, function(err,doc){
		if(err){
			console.log(err);
		}
		else{
			res.render('show',{doc:doc});
		}

	});

	
});


// SHTIMI
app.post("/todos/add", function(req,res){
	todos.insert(req.body,function(err,result){
		if(err){
			console.log(err);
		}
		else{
			res.redirect('/');
		}
	});
});


// EDITIMI
app.get("/todos/edit/:id", function(req,res){
    todos.findOne({_id: ObjectId(req.params.id)},function(err,doc){
		if(err){
			console.log(err);
		}
		else{
			res.render('edit',{doc:doc});
		}
	});	

	
});

// NDRYSHIMI
app.post("/todos/update/:id", function(req,res){
    todos.updateOne({_id: ObjectId(req.params.id)},
		{$set:req.body},function(err,result){
			if(err){
				console.log(err);
			}
			else{
				res.redirect('/');
			}
		});



	
});

// FSHIRJA
app.get("/todos/delete/:id", function(req,res){
    todos.deleteOne({_id: ObjectId(req.params.id)},function(err,result){
		if(err){
			console.log(err);
		}
		else{
			res.redirect('/');
		}
	});


	
});


//	porti 
app.listen(3000, function(){
	console.log("App is running in http://localhost:3000");
});




