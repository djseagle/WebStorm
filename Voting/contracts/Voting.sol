pragma solidity ^0.4.24;

contract  Vote {
    //定义方案数组

    struct Proposal {
        bytes32 name;
        uint voteCount;
    }

    //定义投票数组
    struct Voter {
        bool voted;

        uint voteIndex;

        uint weitht;

        address delegate;

    }



    uint public AllVoters = 0;     //所有参与投票的人

    uint public AllVotedCount = 0;  //投票的数量

    uint public AgreeedCounts = 0; //赞成票数量



    address public chairperson;

    mapping(address => Voter) public voters;

    Proposal[] public proposals;

    uint public VotingTimeEnd;



    event VotingResult(bytes32 name, uint voteCount);  //event 事件



    //初始化投票时间以及方案

    constructor (uint durationMunites, bytes32[] proposalNames) public {

        chairperson = msg.sender;

        voters[chairperson].weitht = 1;

        VotingTimeEnd = now + (durationMunites * 10 minutes);

        for(uint i=0;i<proposalNames.length;i++){

            proposals.push(Proposal({name:proposalNames[i],voteCount:0}));

        }

    }



    function authorize(address _voter) public {

        require(msg.sender == chairperson);

        require(!voters[_voter].voted);

        voters[_voter].weitht = 1;

        AllVoters++;

    }



    function delegateFunc(address to) public view {

        Voter storage sender = voters[msg.sender];

        require(!sender.voted,"voted already");

        require(to != msg.sender, "self-delegate is not allowed");

        //loop check

        while(voters[to].delegate  != address(0)){

            to = voters[to].delegate;

            require(to != msg.sender, "Found loop in delegation");

        }

    }



    //投票

    function voting(uint _voteIndex) public {



        require(now < VotingTimeEnd);

        require(!voters[msg.sender].voted);



        //Voter storage sender = voters[msg.sender];

        voters[msg.sender].voted = true;

        voters[msg.sender].voteIndex = _voteIndex;



        proposals[_voteIndex].voteCount += voters[msg.sender].weitht;

        AllVotedCount++;

    }



    //投票结果统计

    function endVote() public returns (bool) {

        require(now >= VotingTimeEnd);    //投票结束



        uint proposalsLen = proposals.length;     //先取出长度

        for (uint j=0; j<proposalsLen; j++) {

            emit VotingResult(proposals[j].name, proposals[j].voteCount);       //emit

            AgreeedCounts += proposals[j].voteCount;

        }



        //当系统内超过2/3的人参与投票且1/2以上的投了赞成票，则投票确认，否则投票否决。

        if (AllVotedCount == 0 || AllVoters == 0) throw;

        if ( uint(AllVotedCount*100 / AllVoters) > uint(2*100 / 3)) {

            if (uint(AgreeedCounts*100 / AllVotedCount) > uint(1*100 / 2)){

                return true;

            }

        } else throw;



    }



}
