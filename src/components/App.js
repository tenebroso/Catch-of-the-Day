import React from 'react';
import Header from './Header'; // Already in App.js, pulling sibling file
import Order from './Order'; 
import Inventory from './Inventory'; 
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

// React lifecycle
// When a component is being mounted/rendered, there are various things we can hook into, such as connecting to rebase
// https://facebook.github.io/react/docs/react-component.html
// componentWillMount, etc

class App extends React.Component {
	// This is used to tell react that when loaded, we have some methods available.
	constructor(){
		super();
		// Cannot call "this" without super()
		// we call super() to initialize

		// bind
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
		// http://lucybain.com/blog/2014/function-prototype-bind/
		// bind allows you to set which object is treated as this within the function call.
		// use .bind() when you want a function to be called with a certain context. In this case it is "this"

		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);

		// Initial state - getinitialState()
		this.state = {
			fishes: {},
			order: {}
		}

	}

	componentWillMount(){
		// this runs right before the <App> is rendered
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});

		// check if there is any order in localStorage
		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

		if(localStorageRef){
			// oupdate our App component's order state
			this.setState({
				order: JSON.parse(localStorageRef)
			});
		}
	}

	componentWillUnmount(){
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState){
		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
	}

	addFish(fish) {
		// update our state
			// you can directly update through this.state.fishes.fish1 = fish
			// however, it is best practice to make a copy and then update, for performance

			// our existing fishes state
			// using es6 spread
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
			// allows an expression to be expanded in places where multiple argument, elements or variables are expected. 
			// basically spreads/copies the existing object into a new object
			const fishes = {...this.state.fishes};

			// VID 13 - UNDERSTANDING STATE

			// add in our new fish
			const timestamp = Date.now();
			fishes[`fish-${timestamp}`] = fish;


		// set state
		// react updates this anywhere that it's used
		this.setState({ 
			fishes // same as fishes: fishes 
		});
	}

	updateFish(key, updatedFish){
		const fishes = {...this.state.fishes};
		fishes[key] = updatedFish;
		this.setState({fishes});
	}

	removeFish(key){
		const fishes = {...this.state.fishes};
		fishes[key] = null;
		this.setState({fishes});
	}

	loadSamples() {
		this.setState({
			fishes: sampleFishes
		})
	}

	addToOrder(key){
		// takes in the key of the object

		// take a copy of our state
		const order = {...this.state.order};

		// update or add the new number of fish orders
		order[key] = order[key] + 1 || 1;

		// update our state
		this.setState({order});
	}

	removeFromOrder(key){
		const order = {...this.state.order};

		delete order[key];

		this.setState({order});
	}
 
	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					{/* 
						These components will cause an error unless defined 
						Note that we can pass data to a component through props: age="500" cool={true} tagline="Lorem Ipsum", ec
					*/}
					<Header tagline="Fresh Seafood Market" />
					<ul className="list-of-fishes">
						{
							Object
								.keys(this.state.fishes)
								.map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
						}
					</ul>
				</div>
				<Order 
					fishes={this.state.fishes} 
					order={this.state.order} 
					params={this.props.params}
					removeFromOrder={this.removeFromOrder}
				/>
				<Inventory 
					fishes={this.state.fishes}
					addFish={this.addFish}
					loadSamples={this.loadSamples} 
					updateFish={this.updateFish}
					removeFish={this.removeFish}
					storeId={this.props.params.storeId}
				/>
			</div>
		)
	}
}

App.propTypes = {
	params: React.PropTypes.object.isRequired
}


export default App;