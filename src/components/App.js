import React from 'react';
import Header from './Header'; // Already in App.js, pulling sibling file
import Order from './Order'; 
import Inventory from './Inventory'; 
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
	constructor(){
		super();
		// Cannot call this without super()

		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);

		// Initial state - getinitialState()
		this.state = {
			fishes: {},
			order: {}
		}
	}

	addFish(fish) {
		// update our state
			// you can directly update through this.state.fishes.fish1 = fish
			// however, it is best practice to make a copy and then update, for performance

			// our existing fishes state
			// using es6 spread
			const fishes = {...this.state.fishes};

			// add in our new fish
			const timestamp = Date.now();
			fishes[`fish-${timestamp}`] = fish;


		// set state
		this.setState({ fishes // same as fishes: fishes 
		});
	}

	loadSamples() {
		this.setState({
			fishes: sampleFishes
		})
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
								.map(key => <Fish key={key} />)
						}
					</ul>
				</div>
				<Order />
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
			</div>
		)
	}
}


export default App;