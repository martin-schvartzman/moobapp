const Sequelize = require("sequelize");
const {
	STRING,
	INTEGER,
	DATEONLY,
	DECIMAL
} = Sequelize;

const sequelizeConnection = new Sequelize('moob', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

const SaleReport = sequelizeConnection.define("sale_report",{
	product : { type: STRING, allowNull: false },
	sales : INTEGER,
	quantity : INTEGER,
	ammount : DECIMAL,
	date : DATEONLY,
})
	
const Sale = sequelizeConnection.define("sale",{
	product : { type: STRING, allowNull: false },
	date : DATEONLY,
	quantity : INTEGER,
	ammount : DECIMAL,
	sale_report_id : {
		type : INTEGER,
		references : {
			model : SaleReport,
			key : "id"
		}
	}
})

const syncDatabase = () => sequelizeConnection.sync({force:true});

module.exports = {
	Sale,
	SaleReport,
	syncDatabase
}