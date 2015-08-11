/* Add HTML + CSS to setup page for functional testing */
require('../helper').loadAssets();

/* Require file to test */
var theMazeCube = require('../../src/scripts/the-maze-cube');

/* Start Test */
describe('the-maze-cube module can ', function () {

    it('sum an array of numbers', function () {

        //expect(new theMazeCube().sum([1,2,3])).toBe(6);

    });

    it('version is attached', function () {

        //expect(new theMazeCube().version).toBe('0.0.0');

    });

});