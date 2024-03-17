import Model, { attr } from '@ember-data/model';

export default class TeamModel extends Model {
  @attr('string') teamName;
  @attr('number') seed;
  @attr('string') region;
}
