const React = require("react");
const createReactClass = require("create-react-class");
const axios = require("axios");

const SaleView = createReactClass({
	
	getInitialState : function(){
		return { reports : [] };
	},
	
	render: function(){
		return (
		<div>
			<p>Listado de reportes de ventas por producto</p>
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Producto</th>
						<th>Cantidad de ventas</th>
						<th>Monto total</th>
						<th>Cantidad vendidos</th>
						<th>Fecha de venta</th>					
					</tr>				
				</thead>
				<tbody>
					{this.renderedReports()}				
				</tbody>	
			</table>
		</div>
		);	
	},
	
	renderedReports : function(){
		return this.state.reports
			.map( this.rowFromReport );
	},
	
	rowFromReport : function(report){
			return (<tr>
				<td>{report.id}</td>
				<td>{report.product}</td>
				<td>{report.sales}</td>
				<td>{report.ammount}</td>
				<td>{report.quantity}</td>
				<td>{report.date}</td>
			</tr>);
	},
	
	componentDidMount : function(){
		axios.get("http://localhost:8080/saleReport").then( (saleReports) => {
			this.setState({reports:saleReports.data});
		} ).catch(() => { 
			alert("ha ocurrido un error obteniendo los reportes de venta");
		})
	}
	
})


module.exports = SaleView;