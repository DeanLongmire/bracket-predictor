import { module, test } from 'qunit';

import { setupTest } from 'bracket-predictor/tests/helpers';

module('Unit | Model | team', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('team', {});
    assert.ok(model);
  });
});
