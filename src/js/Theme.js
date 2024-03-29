import React from 'react'
import Navbar from './Navbar'
import Page from './Page'
class Theme extends React.Component{

		constructor(props){
			super(props);
			this.handleChange = this.handleChange.bind(this);
			
		    this.state = {
		     currentPage : 'publicProjects'
		    };
		}

		handleChange(page){
			this.setState({currentPage: page});
		}
		

		render(){
		return(	<div>
				<Navbar currentPage={this.state.currentPage} brand='TICKET BIDDING' change={this.handleChange} />
				<Page currentPage={this.state.currentPage} 
					candidates={this.props.candidates}
                    bidEvent={this.props.bidEvent}
                    endBidding={this.props.endBidding}
                    withdraw={this.props.withdraw}
                    addEvent={this.props.addEvent}
                    updateEvents={this.props.updateEvents} />
			</div>
			)
		}
	}
export default Theme