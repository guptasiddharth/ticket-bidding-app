pragma solidity >=0.4.22 <0.6.0;

contract EventBid {
    
    address payable public ownerAddress;
    
    uint public eventCount;

    struct Ticket{
        mapping(address => uint) bids;
        address topBidder;
        uint topBid;
        string eventName;
        bool eventEnded;
        uint time;
        uint eventId;
    }
    
    mapping( uint => Ticket ) public tickets;

    event topBidIncreased(uint eventId, address bidder, uint bidAmount);
    event eventResult(uint eventId, address winner, uint bidAmount);
    event newEventAdded(uint eventId);

    // The following is a so-called natspec comment,
    // recognizable by the three slashes.
    // It will be shown when the user is asked to
    // confirm a transaction.

    /// Create an auction with `_biddingTime`
    /// seconds for bidding on behalf of the
    /// beneficiary address `_beneficiary`.
    constructor() public {
        ownerAddress = msg.sender;
    }
    
    function getCount() view public returns (uint){
        return this.eventCount();
    }
    
    modifier onlyManager(address user){
        require(user==ownerAddress);
            _;
    }

    function fetchTicket(uint eventId) public view returns (uint, string memory, uint, address, uint, uint) {
        if(now>=tickets[eventId].time){
        return (tickets[eventId].eventId,tickets[eventId].eventName,tickets[eventId].topBid,tickets[eventId].topBidder,tickets[eventId].time,1);
        }else{
        return (tickets[eventId].eventId,tickets[eventId].eventName,tickets[eventId].topBid,tickets[eventId].topBidder,tickets[eventId].time,0);
        }
    }

    function generateEvent(string memory name, uint time) public onlyManager(msg.sender) {
        // require(time>10800); tickets[eventCount].time=now+time-3600;
        eventCount+=1;
        tickets[eventCount].eventName=name;
        tickets[eventCount].time=now+time;         
        tickets[eventCount].eventId=eventCount;        
        //emit showDate(now, now+time);
        emit newEventAdded(eventCount);
    }

    function bid(uint eventId) public payable {

        require(eventCount>0);
        if(now>=tickets[eventId].time)
            biddingClose(eventId);
        require(now<tickets[eventId].time);
        require(msg.value > tickets[eventId].topBid);

        if (tickets[eventId].topBid != 0) {
            tickets[eventId].bids[tickets[eventId].topBidder] += tickets[eventId].topBid;
        }
        tickets[eventId].topBidder = msg.sender;
        tickets[eventId].topBid = msg.value;
        emit topBidIncreased(eventId, msg.sender, msg.value);
    }

    function withdraw(uint eventId) public returns (bool) {
        if(now>=tickets[eventId].time)
            biddingClose(eventId);
        uint bidAmount = tickets[eventId].bids[msg.sender];
        if (bidAmount > 0) {
            tickets[eventId].bids[msg.sender] = 0;

            if (!msg.sender.send(bidAmount)) {
                tickets[eventId].bids[msg.sender] = bidAmount;
                return false;
            }
        }
        return true;
    }

    function biddingClose(uint eventId) public {

        require(now >= tickets[eventId].time); // auction did not yet end
        require(!tickets[eventId].eventEnded); // this function has already been called

        tickets[eventId].eventEnded = true;

        emit eventResult(eventId, tickets[eventId].topBidder, tickets[eventId].topBid);

        ownerAddress.transfer(tickets[eventId].topBid);
    }
}