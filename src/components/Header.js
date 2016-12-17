import React from 'react';


// If you only need "render", just use a stateless funcitonal component

const Header = (props) => {
	// function Header() { } is the same, or var Header = function() {}
	return (
		// Supply data to a component through 'props' such as alt tag, etc
		<header className="top">
			<h1>
				Catch 
				<span className="ofThe">
					<span className="of">of</span>
					<span className="the">the</span>
				</span>
				Day
			</h1>
			{/* 
				Don't forget className not class (above) 
				Add variables example below. This refers to element, then tagline on the props object
				Also note that in React dev tools a component can be selected, then use $r in console to get information about it
			*/}
			<h3 className="tagline"><span>{props.tagline}</span></h3>
		</header>
	)
}	

export default Header;