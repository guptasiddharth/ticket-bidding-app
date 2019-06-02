import React from 'react'
class AddProject extends React.Component{

		constructor(props){
			super(props);
			this.handleSubmit =this.handleSubmit.bind(this);
		}

		handleSubmit(){
			alert("Submitted Event");
		}

		render(){
		return(	<div>
				<div className='container'>
					<form onSubmit={(event) => {
        event.preventDefault()
        this.props.addEvent(this.refs.name.value,this.refs.deadline.value)
        this.props.updateEvents()
      }}>
					    
					    Event Name : <input ref="name" type="text" name="project" /> <br/> <br/>
					    Deadline(seconds): <input ref="deadline" type="number" name="deadline" /> <br/> <br/>
					    <input type="submit" className="btn btn-primary float-right" value="Submit"/>
					 </form>
				</div>
			</div>
			)
		}
	}
	export default AddProject
	