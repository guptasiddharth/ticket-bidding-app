import React from 'react'
import AddProject from './AddProject'
import PublicProjects from './PublicProjects'

	class Page extends React.Component{

		render(){
		return(	<div>
				<div className='container'>
					
					{(() => {
				        switch (this.props.currentPage) {
				          case "addProjects": return <AddProject candidates={this.props.candidates} bidEvent={this.props.bidEvent} addEvent={this.props.addEvent} updateEvents={this.props.updateEvents} />;
				          case "publicProjects": return <PublicProjects withdraw={this.props.withdraw} endBidding={this.props.endBidding} candidates={this.props.candidates} bidEvent={this.props.bidEvent} updateEvents={this.props.updateEvents} addEvent={this.props.addEvent} />;
				    	}
				    })()}
					 
				</div>
			</div>
			)
		}
	}
export default Page