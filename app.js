var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose")
	

mongoose.connect("mongodb://localhost/jeff_web", 
				 {
	useNewUrlParser: true,
  	useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


var projectSchema = new mongoose.Schema({
	name: String,
	img: String,
	intro: String,
	web: String,
	page: String,
	created: {type: Date, default: Date.now}
});
var educationSchema = new mongoose.Schema({
	name: String,
	img: String,
	intro: String
});

var Project = mongoose.model("Project", projectSchema);
var Education = mongoose.model("Education", educationSchema);
// Dummy data
var projectData = [
    {
		name: "Naukri Data Visualization and Analysis",
		img: "/img/projects/naukriImg.png",
		intro: "An analysis to job data to connect job seekers to their professional interests",
		web: "https://www.kaggle.com/shengnanhan/naukri-data-visualization-and-analysis-gplt-sns",
		page:"naukriProject"
	},
	{
		name: "Healing Internally-displaced Mothers in Abuja (H.I.M.A)",
		img: "/img/projects/GHCCImg.png",
		intro: "Using data technology to create a sustainable health care solution to improve maternal health at Abuja IDP Camp",
		page: "globalHealth"
	},
	{
		name:"Metasurface Inverse Design via Deep Learning",
		img:"data:image/jpeg;base64,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",
		intro:"Using Deep Learning Technology to accelerates metasurface inverse design process that could take up to a month using conventional methods",
		page:"metasurfaceResearch"
	},
	{
		name: "Foodie 圣楠 is DA Best ",
		img: "/img/projects/foodieImg.jpg",
		intro: "Foooood is my understanding of my upbringings and interpretation of many cultures around the world. Cook, eat, live.",
		page:"cookProject"
	}
]

var educationData = [
	{
		name:"Cornell Tech",
		img: "https://cornell-tech-logos.fvcproductions.com/assets/img/logos/ct-logos/png/simple-black.png",
		intro: "I am currently studying Conncective Media program starting from Aug 2020 to May 2022"
	},
	{
		name:"Vanderbilt University",
		img:"https://www.vanderbilt.edu/communications/brand/images/og/vu/vu05b.gif",
		intro:"From Aug 2016 to May 2020, I studied Computer Science and Mathematics at Vanderbilt University."
	}
]
function seedDB(){
    //Remove all projcts
	
	Project.deleteMany({}, function(err) {
		if (err) {
			console.log(err);
		}
		console.log("removed projects!");
		projectData.forEach(function(seed) {
			Project.create(seed, function(err, project){
				if (err) {
					console.log(err);
				} else {
					console.log("Added a project");
				}
			});
		});
	});
	Education.deleteMany({}, function(err) {
		if (err) {
			console.log(err);
		}
		console.log("removed educations!");
		educationData.forEach(function(seed) {
			Education.create(seed, function(err, education){
				if (err) {
					console.log(err);
				} else {
					console.log("Added an education");
				}
			});
		});
	});
}

 
seedDB();

app.get('/', function(req, res){
	Education.find({}, function(err, educations){
		if (err) {
			console.log(err);
		} else {
			res.render("landing", {educations: educations});
		}
	});	
})

app.get('/projects', function(req, res){
	Project.find({}, function(err, projects){
		if (err) {
			console.log(err);
		} else {
			res.render("projects", {projects: projects});
		}
	});	
})

app.get('/naukriProject', function(req, res){
	res.render("naukriProject");
})
app.get('/globalHealth', function(req, res){
	res.render("globalHealth");
})
app.get('/metasurfaceResearch', function(req, res){
	res.render("metasurfaceResearch");
})

// SHOW ROUTE
app.get("/projects/:id", function(req, res){
	Project.findById(req.params.id, function(err, foundProject){
		if (err) {
			console.log("Project not found");
			console.log(err);
		} else {
			// console.log(foundProject.name);
			res.render(foundProject.page, {project:foundProject});
		}
	}) 
	//res.render("naukriProject");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("My Web server started");
})