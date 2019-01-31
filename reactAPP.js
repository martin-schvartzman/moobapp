const ReactDOM = require("react-dom");
const React = require("react");
const createReactClass = require("create-react-class");
//components
const SaleInput = require("./components/SaleInput.js");
const SaleView = require("./components/SaleView.js");


const App = createReactClass({
	render: function(){
		return (
			<div>
			<SaleInput/>
			<SaleView/>
			</div>	
		);	
	}
})



ReactDOM.render(
  <App/>,
  document.getElementById('root')
);