import Route from '@ember/routing/route';
import { service } from '@ember/service';
import fetch from 'fetch';

export default class ApplicationRoute extends Route {
  @service store;

  async beforeModel() {
    return await fetch('/field.json')
      .then((response) => response.json())
      .then((data) => {
        data.forEach((team) => {
          team.id = team.teamName;
          this.store.createRecord('team', team);
        });
      })
      .catch((error) => {
        console.error('Error fetching JSON file:', error);
      });
  }

  async model() {
    return await this.store.findAll('team');
  }
}
