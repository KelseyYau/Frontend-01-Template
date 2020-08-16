import { add } from '../src/add.js'
let assert = require('assert');




it('add(3, 4) should be 7', function () {
  assert.equal(add(3, 4), 7);
});

// test('foo', t => {
//   if (mod.add(3, 4) === 7) {
//     t.pass();
//   }
// });