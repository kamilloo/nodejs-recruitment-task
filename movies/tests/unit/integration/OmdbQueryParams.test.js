const chai = require('chai');
const omdbQueryParams = require("../../../src/integration/OmdbQueryParams")

describe('Omdb Query Params', () => {

    it('build Query Params ',  () => {

        //GIVEN
        let title = "Guardians of   the    Galaxy  Vol. 2";
        let expectedTitle = "Guardians+of+the+Galaxy+Vol.+2";

        //WHEN
        let queryParams = omdbQueryParams.build(title);

        //THEN
        chai.expect(queryParams.get('t')).to.be.eql(expectedTitle)

    });

})