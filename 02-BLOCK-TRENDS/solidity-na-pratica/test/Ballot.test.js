const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ballot Contract", function () {
    let Ballot, ballot, owner, addr1, addr2, addr3;

    beforeEach(async function () {
        [owner, addr1, addr2, addr3] = await ethers.getSigners();
        
        // Criação das propostas
        const proposalNames = [
            ethers.encodeBytes32String("Proposal 1"),
            ethers.encodeBytes32String("Proposal 2"),
            ethers.encodeBytes32String("Proposal 3")
        ];

        // Fazendo o deploy do contrato
        Ballot = await ethers.getContractFactory("Ballot");
        ballot = await Ballot.deploy(proposalNames);
    });

    it("Deve definir o chairperson corretamente", async function () {
        expect(await ballot.chairperson()).to.equal(owner.address);
    });

    it("Deve permitir que o chairperson conceda direito de voto", async function () {
        await ballot.giveRightToVote(addr1.address);
        const voter = await ballot.voters(addr1.address);
        expect(voter.weight).to.equal(1);
    });

    it("Deve falhar ao conceder direito de voto duas vezes", async function () {
        await ballot.giveRightToVote(addr1.address);
        await expect(ballot.giveRightToVote(addr1.address)).to.be.reverted;
    });

    it("Usuário comum não pode conceder direito de voto", async function () {
        await expect(ballot.connect(addr1).giveRightToVote(addr2.address)).to.be.revertedWith("Only chairperson can give right to vote");
    });

    it("Deve permitir a delegação de votos", async function () {
        await ballot.giveRightToVote(addr1.address);
        await ballot.giveRightToVote(addr2.address);

        await ballot.connect(addr1).delegate(addr2.address);

        const voter = await ballot.voters(addr1.address);
        expect(voter.voted).to.equal(true);
        expect(voter.delegate).to.equal(addr2.address);
    });

    it("Não deve permitir auto-delegação", async function () {
        await ballot.giveRightToVote(addr1.address);
        await expect(ballot.connect(addr1).delegate(addr1.address)).to.be.revertedWith("Self-delegation is disallowed");
    });

    it("Deve permitir votação e contar votos corretamente", async function () {
        await ballot.giveRightToVote(addr1.address);
        await ballot.connect(addr1).vote(0); // Votando na primeira proposta

        const proposal = await ballot.proposals(0);
        expect(proposal.voteCount).to.equal(1);
    });

    it("Deve permitir delegação de votos e contar corretamente", async function () {
        await ballot.giveRightToVote(addr1.address);
        await ballot.giveRightToVote(addr2.address);
        
        await ballot.connect(addr1).delegate(addr2.address);
        await ballot.connect(addr2).vote(1);

        const proposal = await ballot.proposals(1);
        expect(proposal.voteCount).to.equal(2); // O peso do voto de addr1 foi somado ao de addr2
    });

    it("Deve retornar a proposta vencedora corretamente", async function () {
        await ballot.giveRightToVote(addr1.address);
        await ballot.giveRightToVote(addr2.address);
        await ballot.giveRightToVote(addr3.address);

        await ballot.connect(addr1).vote(0); // 1 voto na Proposal 1
        await ballot.connect(addr2).vote(1); // 1 voto na Proposal 2
        await ballot.connect(addr3).vote(1); // 1 voto na Proposal 2

        const winnerIndex = await ballot.winningProposal();
        expect(winnerIndex).to.equal(1); // Proposal 2 deve ser a vencedora

        const winnerName = await ballot.winnerName();
        expect(ethers.decodeBytes32String(winnerName)).to.equal("Proposal 2");
    });
});
