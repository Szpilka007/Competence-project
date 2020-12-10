const phi = require('../../src/application/generateHotspots')

test('function phi test', () => {
  expect(phi.phi(1,2)).toBe(0.9030934033163246);
});

test('function lambda test', () => {
  expect(phi.lambda(1,2,3)).toBe(0.33962116701865763);
});