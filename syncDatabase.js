const { syncDatabase } = require("./models");
syncDatabase().then( () => { 
	console.log("tables created") 
	process.exit();
} );