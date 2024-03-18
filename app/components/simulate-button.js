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

const regions = ['midwest', 'east', 'south', 'west'];

export default class SimulateButtonComponent extends Component {
  @service store;

  @tracked teams = [];
  @tracked roundName = 'Round of 64';
  @tracked roundMatchups = A();

  constructor() {
    super(...arguments);
    this.loadTeams(() => {
      this.initBracket();
    });
  }

  async loadTeams(callback) {
    const teams = await this.store.peekAll('team');
    this.teams = await teams.toArray().map((team) => ({
      teamName: team.teamName,
      seed: team.seed,
      region: team.region,
    }));
    callback();
  }

  @action
  async initBracket() {
    for (const region of regions) {
      for (const matchup of firstRoundMatchups) {
        const team1Promise = new Promise((resolve, reject) => {
          const team1 = this.teams.find(
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
          const team2 = this.teams.find(
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
}
