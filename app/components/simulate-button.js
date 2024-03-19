//https://mcubed.net/ncaab/seeds.shtml

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { A } from '@ember/array';

const firstRoundMatchups = [
  [1, 16, 0.013],
  [2, 15, 0.072],
  [3, 14, 0.145],
  [4, 13, 0.211],
  [5, 12, 0.349],
  [6, 11, 0.382],
  [7, 10, 0.391],
  [8, 9, 0.513],
];

const secondRoundMatchups = [
    [1, 8, 0.274],
    [1, 9, 0.104],
    [8, 16,  0.001],
    [9, 16,  0.001],
    [4, 5,  0.427],
    [5, 13, 0.150],
    [4, 12,  0.295],
    [12, 13, 0.250],
    [3, 6,  0.417],
    [6, 14, 0.125],
    [3, 11,  0.333],
    [11, 14, 0.500],
    [2, 7,  0.304],
    [7, 15, 0.667],
    [2, 10,  0.359],
    [10, 15, 0.001],
];

const thirdRoundMatchups = [
    [1, 5, 0.203],
    [1, 12, 0.001],
    [1, 4, 0.295],
    [1, 13, 0.001],
    [5, 16, 0.001],
    [12, 16, 0.001],
    [4, 16, 0.001],
    [13, 16, 0.001],
    [5, 8, 0.750],
    [8, 12, 0.999],
    [4, 8, 0.615],
    [8, 13, 0.001],
    [5, 9, 0.600],
    [9, 12, 0.001],
    [4, 9, 0.600],
    [9, 13, 0.001],
    [2, 3, 0.394],
    [2, 6, 0.278],
    [2, 11, 0.158],
    [2, 14, 0.001],
    [3, 15, 0.333],
    [6, 15, 0.001],
    [11, 15, 0.001],
    [14, 15, 0.001],
    [3, 7, 0.368],
    [7, 11, 0.999],
    [6, 7, 0.333],
    [7, 14, 0.001],
    [3, 10, 0.308],
    [11, 12, 0.001],
    [6, 10, 0.400],
    [10, 14, 0.001],
]

const fourthRoundMatchups = [
    [1, 2, 0.455],
    [1, 3, 0.366],
    [1, 6, 0.294],
    [1, 7, 0.143],
    [1, 10, 0.125],
    [1, 11, 0.444],
    [1, 14, 0.001],
    [1, 15, 0.001],
    [2, 4, 0.500],
    [3, 4, 0.444],
    [4, 6, 0.667],
    [4, 7, 0.667],
    [4, 10, 0.001],
    [4, 11, 0.001],
    [4, 14, 0.001],
    [4, 15, 0.001],
    [2, 5, 0.750],
    [3, 5, 0.500],
    [5, 6, 0.001],
    [5, 7, 0.001],
    [5, 10, 0.001],
    [5, 11, 0.001],
    [5, 14, 0.001],
    [5, 15, 0.001],
    [2, 8, 0.600],
    [3, 8, 0.001],
    [6, 8, 0.750],
    [7, 8, 0.500],
    [8, 10, 0.001],
    [8, 11, 0.001],
    [8, 14, 0.001],
    [8, 15, 0.001],
    [2, 9, 0.333],
    [3, 9, 0.250],
    [6, 9, 0.001],
    [7, 9, 0.001],
    [9, 10, 0.001],
    [9, 11, 0.999],
    [9, 14, 0.001],
    [9, 15, 0.001],
    [2, 12, 0.001],
    [3, 12, 0.001],
    [6, 12, 0.001],
    [7, 12, 0.001],
    [10, 12, 0.001],
    [11, 12, 0.001],
    [12, 14, 0.001],
    [12, 15, 0.001],
    [2, 16, 0.001],
    [3, 16, 0.001],
    [6, 16, 0.001],
    [7, 16, 0.001],
    [10, 16, 0.001],
    [11, 16, 0.001],
    [14, 16, 0.001],
    [15, 16, 0.001],
]

const dittos = [
    [1, 1, 0.500],
    [2, 2, 0.500],
    [3, 3, 0.500],
    [4, 4, 0.500],
    [5, 5, 0.500],
    [6, 6, 0.500],
    [7, 7, 0.500],
    [8, 8, 0.500],
    [9, 9, 0.500],
    [10, 10, 0.500],
    [11, 11, 0.500],
    [12, 12, 0.500],
    [13, 13, 0.500],
    [14, 14, 0.500],
    [15, 15, 0.500],
    [16, 16, 0.500],
]

//this is the dumbest thing I have ever done, why wouldnt I just put all matchups in one array???
const fifthRoundMatchups = firstRoundMatchups.concat(secondRoundMatchups.concat(thirdRoundMatchups.concat(fourthRoundMatchups.concat(dittos))));

const allMatchups = [
    firstRoundMatchups,
    secondRoundMatchups,
    thirdRoundMatchups,
    fourthRoundMatchups,
    fifthRoundMatchups,
];

const teamsPerRound = [64, 32, 16, 8, 4, 2];

const regions = ['midwest', 'east', 'south', 'west'];

const roundNames = [
    'Round of 64',
    'Round of 32',
    'Sweet 16',
    'Elite 8',
    'Final 4',
    'Championship',
]

export default class SimulateButtonComponent extends Component {
  @service store;

  @tracked allTeams = [];
  @tracked finalFour = [];
  @tracked roundName = roundNames[0];
  @tracked round = 0;
  @tracked roundMatchups = A();

  constructor() {
    super(...arguments);
    this.loadTeams(() => {
      this.initBracket();
    });
  }

  async loadTeams(callback) {
    const teams = await this.store.peekAll('team');
    this.allTeams = await teams.toArray().map((team) => ({
      teamName: team.teamName,
      seed: team.seed,
      region: team.region,
    }));
    callback();
  }

  async initBracket() {
    for (const region of regions) {
      for (const matchup of firstRoundMatchups) {
        const team1Promise = new Promise((resolve, reject) => {
          const team1 = this.allTeams.find(
            (team) => team.seed === matchup[0] && team.region === region
          );
          if (team1) {
            resolve(team1);
          } else {
            reject(
              new Error(
                `Team not found for seed ${matchup[0]} in region ${region}`
              )
            );
          }
        });

        const team2Promise = new Promise((resolve, reject) => {
          const team2 = this.allTeams.find(
            (team) => team.seed === matchup[1] && team.region === region
          );
          if (team2) {
            resolve(team2);
          } else {
            reject(
              new Error(
                `Team not found for seed ${matchup[1]} in region ${region}`
              )
            );
          }
        });

        try {
          const [team1, team2] = await Promise.all([
            team1Promise,
            team2Promise,
          ]);
          this.roundMatchups.addObject([team1, team2]);
        } catch (error) {
          console.error(error.message);
        }
      }
    }
  }

  @action
  simulateRound(roundNumber) {
    let advancingTeams = A();
    for (const matchup of this.roundMatchups) {
        const teamOneSeed = matchup[0].seed;
        const teamTwoSeed = matchup[1].seed;

        const chanceOfUpset = (allMatchups[roundNumber].filter(tuple => tuple.includes(teamOneSeed) && tuple.includes(teamTwoSeed)))[0][2];
        const didUpset = this.predictUpset(chanceOfUpset);

        if(didUpset) {
            console.log(matchup[1].teamName + ' (' + matchup[1].seed + ')' + ' upset ' + matchup[0].teamName + '!');
            advancingTeams.addObject(matchup[1]);
        } else {
            advancingTeams.addObject(matchup[0]);
        }
    }
    this.allTeams = advancingTeams.toArray();
    this.round++;
    this.roundName = roundNames[this.round];
    this.roundMatchups.clear();
    this.createRoundMatchups();
  }

  createRoundMatchups() {
    for (const team of this.allTeams) {
        const teamOneSeed = team.seed;
        const teamRegion = team.region;

        const possibleMatchups = allMatchups[this.round].filter(tuple => tuple.includes(teamOneSeed));

        if(this.round >= 4) {
            this.createFinalFourMatchups();
        } else {
            this.findTeam(possibleMatchups, teamOneSeed, teamRegion)
            .then((teamTwo) => {
                if (!this.roundMatchups.find((matchup) => matchup[0].teamName == team.teamName || matchup[1].teamName == team.teamName)) {
                    this.roundMatchups.addObject([team, teamTwo]);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }
  }

  createFinalFourMatchups() {
    
  }

  findTeam(possibleMatchups, teamOneSeed, teamRegion) {
    return new Promise((resolve, reject) => {
        let foundTeam = false;
        
        for (const matchup of possibleMatchups) {
            const teamTwoSeed = matchup.filter(seed => seed !== teamOneSeed && seed >= 1)[0];
            const teamTwo = this.allTeams.find(
                (team) => team.seed === teamTwoSeed && team.region === teamRegion
            );
            
            if (teamTwo) {
                resolve(teamTwo);
                foundTeam = true;
                break;
            }
        }
        
        if (!foundTeam) {
            reject(`No matching team found for seed ${teamOneSeed}`);
        }
    });
}

  predictUpset(probability) {
    return Math.random() < probability;
  }
}
