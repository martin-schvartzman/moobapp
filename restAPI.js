const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const models = require("./models");
const cors = require("cors");

const makeApp = function(){
	let app = express();
	app.use(bodyParser.urlencoded({extended:false}));
	app.use(bodyParser.json());
	app.use(cors({ credentials: true, origin: true }));
	app.use((req,res,next) => {
		res.header('Content-Type', 'application/json');
		next();
	});
	app.use(makeRoutes());
	return app;
}

const makeRoutes = function(){
	let router = express.Router();
	
	router.get("/ping", (req,res) => {
		res.send({message:"ping successful"});
	});
	
	router.post("/sale",(req,res) => {
		let newSale = req.body;
		models.Sale.create(newSale).then( (sale) => {
			res.send(sale.dataValues);
		} ).catch( () => {
			res.status(400);
			res.send({message:"error creating sale"});
		} );
	})
	
	router.get("/saleReport",(req,res) => {
		models.SaleReport.findAll().then( (reports) => {
			res.send(reports);
		} ).catch( () => {
			res.status(400);
			res.send({message:"error retrieving sale reports"});
		} );
	})
	
	return router;
}

http.createServer(makeApp()).listen(8080,()=>console.log("app listening on port 8080")); 