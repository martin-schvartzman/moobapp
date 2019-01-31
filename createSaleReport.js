const moment = require("moment");
const {SaleReport,Sale} = require("./models");

const report_date = moment(process.argv[2]);
const date_string = report_date.format("YYYY-MM-DD")
console.log(`Creando reporte para fecha ${date_string}`);

Sale.findAll({where: {date:date_string , sale_report_id:null }}).then(sales => {
	
	Report = {}
	sales.forEach(sale => {
		if(!Report[sale.product]){
			Report[sale.product] = {
				quantity : sale.quantity,
				ammount : sale.ammount,
				sales : 1		
			} 		
		}else{
			Report[sale.product].quantity += sale.quantity;
			Report[sale.product].ammount += sale.ammount;
			Report[sale.product].sales++;
		}
	} );	
	return Report;

}).then( report => {

	reports = [];
	Object.keys(report).forEach( key => {
		reports.push({
			product:key,
			date:	date_string,
			sales:report[key].sales,
			quantity:report[key].quantity,
			ammount:report[key].ammount,
		});
	});
	
	return SaleReport.bulkCreate(reports);	

} ).then(reports => {
	
	reports.forEach(report => {
		let data = report.dataValues;
		Sale.update(
			{sale_report_id:data.id},
			{where:{date:date_string,product:data.product}}
			);
	})
	
});



