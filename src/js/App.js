import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import EventBid from '../../build/contracts/EventBid.json'
import Content from './Content'
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: null,
      candidates: []
    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    this.web3 = new Web3(this.web3Provider)

    this.dao = TruffleContract(EventBid)
    this.dao.setProvider(this.web3Provider)   

    this.updateEvents = this.updateEvents.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.bidEvent = this.bidEvent.bind(this);
    this.endBidding = this.endBidding.bind(this);
    this.withdraw = this.withdraw.bind(this);
 
  }

  componentDidMount() {
    // TODO: Refactor with promise chain
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.dao.deployed().then((daoInstance) => {
        this.daoInstance = daoInstance
        this.updateEvents()
      })
    })
  } 


  addEvent(eventName, endTimeInSeconds) {
    console.log("address    :   ",this.state.account)
    this.daoInstance.generateEvent(eventName, endTimeInSeconds, { from: this.state.account, gas:500000}).then((result) =>
      console.log(result)
    )

    this.updateEvents();
  }

  bidEvent(eventId, account, amount) {
    console.log("eventId ",eventId.toNumber()," account ",account," amount ",amount)
    this.daoInstance.bid(eventId, { from: account, value: amount, gas:500000 }).then((result) =>
      console.log(result)
    )
    this.updateEvents();
  }

  endBidding(eventId) {
    console.log("eventId ",eventId.toNumber())
    this.daoInstance.biddingClose(eventId, { from: this.state.account, gas:500000 }).then((result) =>
      console.log(result)
    )
    this.updateEvents();
  }

  withdraw(eventId,account) {
    console.log("eventId ",eventId.toNumber())
    this.daoInstance.withdraw(eventId, { from: account, gas:500000 }).then((result) =>
      console.log(result)
    )
    this.updateEvents();
  }

  updateEvents(){
    this.daoInstance.getCount().then((eventCount) => {
      this.setState({ candidates: [] })
          for (var i = 1; i <= eventCount; i++) {
            this.daoInstance.fetchTicket(i).then((candidate) => {
              const candidates = [...this.state.candidates]
              candidates.push({
                index : candidate
              });
              this.setState({ candidates: candidates })
            });
          }
        })
    console.log(this.state.candidates)
    console.log(JSON.stringify(this.state.candidates))
  }

  render() {

        return (
          <div class='row'>
            <div class='col-lg-12 text-center' >
              <br/>
               <Content
                    account={this.state.account}
                    candidates={this.state.candidates}
                    bidEvent={this.bidEvent}
                    endBidding={this.endBidding}
                    withdraw={this.withdraw}
                    updateEvents={this.updateEvents}
                    addEvent={this.addEvent} />
            </div>
          </div>
        )
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)
