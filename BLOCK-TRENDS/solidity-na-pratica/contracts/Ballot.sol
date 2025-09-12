// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Ballot
 * @author Tales
 * @notice Implements voting process along with vote delegation
 */
contract Ballot {
    
    struct Voter {
        uint weight; // Weight is accumulated by delegation
        bool voted; // If true, that person already voted
        address delegate; // Person delegated to
        uint vote; // Index of the voted proposal
    }

    struct Proposal {
        // Short name (up to 32 bytes)
        bytes32 name;
        // Number of accumulated votes
        uint voteCount;
    }

    address public chairperson;
    mapping(address => Voter) public voters;
    Proposal[] public proposals;

    /**
     * @dev Create a new ballot to choose one of `proposalNames`
     * @param proposalNames Names of proposals
     */
    constructor(bytes32[] memory proposalNames) {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;

        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    /**
     * @dev Give `voter` the right to vote on this ballot. May only be called by 'chairperson'. 
     * @param voter Address of voter
     */
    function giveRightToVote(address voter) public {
        require(msg.sender == chairperson, "Only chairperson can give right to vote");
        require(!voters[voter].voted, "The voter already voted");
        require(voters[voter].weight == 0, "Voter already has right to vote");
        
        voters[voter].weight = 1;
    }

    /**
     * @dev Delegate your vote to another voter
     * @param to Address to which vote is delegated
     */
    function delegate(address to) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You already voted");
        require(to != msg.sender, "Self-delegation is disallowed");

        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;
            require(to != msg.sender, "Found loop in delegation");
        }

        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate_ = voters[to];

        if (delegate_.voted) {
            proposals[delegate_.vote].voteCount += sender.weight;
        } else {
            delegate_.weight += sender.weight;
        }
    }

    /**
     * @dev Give your vote (including votes delegated to you) to proposal `proposals[proposal].name`
     * @param proposal Index of proposal in the proposal array
     */
    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted");

        sender.voted = true;
        sender.vote = proposal;
        proposals[proposal].voteCount += sender.weight;
    }

    /**
     * @dev Computes the winning proposal taking all previous votes into account.
     * @return winningProposal_ Index of winning proposal in the proposal array
     */
    function winningProposal() public view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    /**
     * @dev Calls winningProposal() function to get the index of the winner contained in the proposals array
     * @return winnerName_ The name of the winner
     */
    function winnerName() public view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}
