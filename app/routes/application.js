import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { v4 } from "ember-uuid";
import fetch from 'fetch';

export default class ApplicationRoute extends Route {
  @service store;

  beforeModel() {
    return fetch('/field.json')
      .then(response => response.json())
      .then(data => {
        data.forEach(team => {
          let id = v4();
          team.id = id;
          this.store.createRecord('team', team);
        });
      })
      .catch(error => {
        console.error('Error fetching JSON file:', error);
      });
  }

  async model() {
    return await this.store.findAll('team');
  }
}


