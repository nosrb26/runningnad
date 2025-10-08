// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract runningnadleaderboard {
    struct PlayerScore {
        uint256 bestScore;
        uint256 totalScore;
        uint256 gamesPlayed;
        uint256 lastTime;
    }

    mapping(address => PlayerScore) public scores;
    address[] public players;

    function saveScore(uint256 _score, uint256 _time) external {
        PlayerScore storage p = scores[msg.sender];

        // add player if new
        if(p.gamesPlayed == 0) {
            players.push(msg.sender);
        }

        // Best score
        if(_score > p.bestScore) {
            p.bestScore = _score;
        }

        // all number of parties
        p.totalScore += _score;
        p.gamesPlayed += 1;
        p.lastTime = _time;
    }

    // leaderboard by best score
    function getBestScores() external view returns(address[] memory, uint256[] memory, uint256[] memory) {
        uint256 len = players.length;
        address[] memory addrs = new address[](len);
        uint256[] memory bests = new uint256[](len);
        uint256[] memory times = new uint256[](len);

        for(uint i=0; i<len; i++){
            address p = players[i];
            addrs[i] = p;
            bests[i] = scores[p].bestScore;
            times[i] = scores[p].lastTime;
        }
        return (addrs, bests, times);
    }

    // Leaderboard in total
    function getTotalScores() external view returns(address[] memory, uint256[] memory, uint256[] memory) {
        uint256 len = players.length;
        address[] memory addrs = new address[](len);
        uint256[] memory totals = new uint256[](len);
        uint256[] memory games = new uint256[](len);

        for(uint i=0; i<len; i++){
            address p = players[i];
            addrs[i] = p;
            totals[i] = scores[p].totalScore;
            games[i] = scores[p].gamesPlayed;
        }
        return (addrs, totals, games);
    }
}
