/* Add HTML + CSS to setup page for functional testing */
require('../helper').loadAssets();

/* Require file to test */
var theMazeCube = require('../../src/scripts/the-maze-cube');

/* Start Test */
describe('the-maze-cube module can ', function () {

    it('print the sum to the dom', function () {
        new theMazeCube().write([1,2,3]);

        expect(document.getElementById('demo-functional').innerHTML).toBe('6');

    });

});