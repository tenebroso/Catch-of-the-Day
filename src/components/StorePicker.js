// Import react at the top of every component. 
// If something is needed inside of a module, it gets imported.

import React from 'react';

// getFunName is a named import
import { getFunName } from '../helpers';

// Using ES6 Classes
// Uses capitalization, because can be used more than once
class StorePicker extends React.Component {

	// constructor(){
		// super();  
		// First creates the component, then extends it
		// this.goToStore = this.goToStore.bind(this);
		// looks for goToStore method, looks for itself on its own self, then binds it to itself
	// }

	// Every component needs at least one method
	goToStore(event) {
		event.preventDefault();
		// first grab the text from the box, but do not touch/look at the DOM itself so no $('selector').value() etc
		// there is no "this" - console.log(this) is null - methods are not implicitly bound to component
		const storeId = this.storeInput.value; // Works now after special bind in constructor or onSubmit function below
		console.log(`Going to ${storeId}`);
		// then transition from / to /store/:storeId
		// Uses HTML5 pushState
		this.context.router.transitionTo(`/store/${storeId}`);
	} 
	// ES6 classes do not have commas
	render () { 
		// similar to function render()
		// Include paranthesis for multiple lines here
		return (
			// Class is a reserved word so use className
			// Only can return one parent element so cannot add a paragraph outside of this <form></form>
			// When submitting, we pull store name into URL and transition to the store state
			// Render is the method that is bound to the component, so we can use "this" and it is bound to component
			<form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
				<h2>Please Enter a Store</h2>

				{/* 
					Have to self close the tags in JSX 
					Also here is an example of comments in JSX, kind of ugh but ok
					Comments are added above or inside of the element that is being returned
				*/}
				
				<input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input => {this.storeInput = input})} />

				{/* React events are wrapped in SyntheticEvent, similar to jQuery.on, etc 
				https://facebook.github.io/react/docs/events.html
				*/}
				<button type="submit">Visit Store -></button>
			</form>
		) 

		// Other options that are more difficult here:
		// return React.createElement('p', {className: 'Testing'}, 'I Love You');
	}
}

// Tells react that the storepicker component expects this, mkes transitionTo method from goToStore, available

StorePicker.contextTypes = {
	router: React.PropTypes.object 
}

// makes the component available for import
export default StorePicker;