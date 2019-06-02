import React from 'react'
import Theme from './Theme'

class Content extends React.Component {
  render() {
    return (
      <div>
        <h3>Welcome Bidder, </h3>
        <Theme candidates={this.props.candidates}
                    bidEvent={this.props.bidEvent}
                    addEvent={this.props.addEvent}
                    endBidding={this.props.endBidding}
                    withdraw={this.props.withdraw}
                    updateEvents={this.props.updateEvents} />
        <hr/>
        <p> Account: {this.props.account}</p>
        
      </div>
    )
  }
}

export default Content
