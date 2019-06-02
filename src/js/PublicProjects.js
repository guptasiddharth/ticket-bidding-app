import React from 'react'

	class PublicProjects extends React.Component{

		render(){
		return(	<div>
				<div className='container'>
					<Table1 candidates={this.props.candidates}
                    bidEvent={this.props.bidEvent}
                    withdraw={this.props.withdraw}
                    endBidding={this.props.endBidding}
                    addEvent={this.props.addEvent} />
				</div>
			</div>
			)
		}
	}
 
class Table1 extends React.Component {
  render() {
    return (
      <table class='table'>
        <thead>
          <tr>
            <th>EventID</th>
            <th>EventName</th>
            <th>HighestBid</th>
            <th>Deadline</th>
            <th>HighestBidder</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.candidates.map((candidate) => {
            let backgroundColor = 'red';
            console.log("return value   ",candidate.index[5].toNumber());
            
            if(candidate.index[5].toNumber()==0){
              backgroundColor = 'green';
              return(
              <tr>
                <td>{candidate.index[0].toNumber()}</td>
                <td>{candidate.index[1]}</td>
                <td>{candidate.index[2].toString()}</td>  
                <td style={{backgroundColor}}>{candidate.index[4].toString()}</td>
                <td>{candidate.index[3]}</td>
                <td>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    this.props.bidEvent(candidate.index[0],this.refs.address.value,this.refs.amount.value) }}>
                      <input ref="address" type="text" name="address" placeholder="address"/> 
                      <input ref="amount" type="number" name="bidprice" placeholder="bid amount (wei)"/> 
                      <input type="submit" className="btn btn-primary float-right" value="BID"/>
                  </form>
                </td>
                <td>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    this.props.withdraw(candidate.index[0],this.refs.addresss.value) }}>
                      <input ref="addresss" type="text" name="addresss" placeholder="address"/> 
                      <input type="submit" className="btn btn-primary float-right" value="WITHDRAW"/>
                  </form>
                </td>
              </tr>
            )
            }else{
              return(
              <tr>
                <td>{candidate.index[0].toNumber()}</td>
                <td>{candidate.index[1]}</td>
                <td>{candidate.index[2].toString()}</td>  
                <td style={{backgroundColor}}>{candidate.index[4].toString()}</td>
                <td>{candidate.index[3]}</td>
                <td>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    this.props.withdraw(candidate.index[0],this.refs.address.value) }}>
                      <input ref="address" type="text" name="address" placeholder="address"/> 
                      <input type="submit" className="btn btn-primary float-right" value="WITHDRAW"/>
                  </form>
                </td>
                <td>
                  EVENT CLOSED
                </td>
              </tr>
            )
            } 
          }
          )}
        </tbody>
      </table>
    )
  }
}
	export default PublicProjects