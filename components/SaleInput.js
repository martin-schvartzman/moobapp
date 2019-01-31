const React = require("react");
const createReactClass = require("create-react-class");
const axios = require("axios");

const SaleInput = createReactClass({
	
	getInitialState : function(){
		return {
			product : '',
			date : '',
			quantity : 0,
			ammount : 0		
		};
	},
	
	handleInputChange : function(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name] : value
		});
	},
	
	render: function(){
		return (
			<div>
			<p>Ingrese una venta nueva</p>
			Producto
			<input type="text" name="product" value={this.state.product} onChange={this.handleInputChange} />
			<br/>Fecha
			<input type="date" name="date" value={this.state.date} onChange={this.handleInputChange} />
			<br/>cantidad
			<input type="number" name="quantity" value={this.state.quantity} onChange={this.handleInputChange} />
			<br/>monto
			<input type="number" step="0.01" name="ammount" value={this.state.ammount} onChange={this.handleInputChange} />
			<br/>
			<button onClick={this.newSale}>Ingresar</button>
			</div>	
		);	
	},
	
	refresh: function(){
		this.setState( this.getInitialState() );
	},
	
	newSale : function () {
		axios.post("http://localhost:8080/sale",this.state).then( () => {
			this.refresh();
			alert("venta ingresada correctamente");
		} ).catch(() => { 
			alert("ha ocurrido un error");
		})
	},
	
})


module.exports = SaleInput;