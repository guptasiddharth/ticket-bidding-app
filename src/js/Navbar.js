import React from 'react'
	class Navbar extends React.Component{

		constructor(props){
			super(props);
			this.change = this.change.bind(this);
		}

		change(page){
			this.props.change(page);
		}

		render(){
		
			return(	<nav className='navbar navbar-default'>
				<div className='container'>
					<div className='navbar-header'>
						<a className='navbar-brand' href='#'>{this.props.brand}</a>
					</div>
					<div id='navbar'>
						<ul className='nav'>
							
							<li className={(this.props.currentPage === 'publicProjects') ? 'active' : ''}><a onClick={this.change.bind(this,'publicProjects')} href='#'>SHOW EVENTS</a></li>
							<li className={(this.props.currentPage === 'addProjects') ? 'active' : ''}><a onClick={this.change.bind(this,'addProjects')} href='#'>ADD EVENT</a></li>
							
						</ul>	
					</div>	
				</div>
			</nav>
			)
		}
	}
	export default Navbar