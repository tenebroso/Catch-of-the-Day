import React from 'react';
import Header from './Header'; // Already in App.js, pulling sibling file
import Order from './Order'; 
import Inventory from './Inventory'; 

class App extends React.Component {

	// Remember, at least one method
	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					{/* 
						These components will cause an error unless defined 
						Note that we can pass data to a component through props: age="500" cool={true} tagline="Lorem Ipsum", ec
					*/}
					<Header tagline="Fresh Seafood Market" />
				</div>
				<Order />
				<Inventory />
			</div>
		)
	}
}


export default App;