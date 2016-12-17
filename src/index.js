// Any code added here gets bundled into bundle.js via webpack
import React from 'react';
import { render } from 'react-dom'; // or import ReactDOM from 'react-dom'; then ReactDom.render(); but we only need the one method here
import { BrowserRouter, Match, Miss} from 'react-router';
import './css/style.css'; // This lets webpack handle the import and compilation, adds style tag to the page for us.

// Use a relative path so we aren't pulling from node_modules
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

// Create some routes below - even the router itself is a component

const Root = () => {
	return (
		// The parent of everything else in the application
		// "Context" makes something available at top level and it's available globally, but this is a rare occurrence/thing to rely on
		<BrowserRouter>
			<div>{/* Need the wrapping element here */}
				<Match exactly pattern="/" component={StorePicker} />
				<Match pattern="/store/:storeId" component={App} />
				<Miss component={NotFound} /> {/* When passing in component, if not passing a string, put it in curly brackets */}
			</div>
		</BrowserRouter>
	)
}

// Render a component to the page
// Pull the Root stateless functional component into the DOM
render(<Root/>, document.querySelector('#main'));

