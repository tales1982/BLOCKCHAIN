const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
    it("Deve contar corretamente os votos para um candidato", async () => {
        const instance = await Voting.deployed();
        await instance.voteForCandidate("Alice", { from: accounts[0] });
        const totalVotes = await instance.totalVotesFor("Alice");
        assert.equal(totalVotes.toNumber(), 1, "O número de votos deve ser 1");
    });
});
