const chai = require('chai');
const omdbParser = require("../../../src/integration/OmdbParser")

describe('Omdb Parser', () => {

    it('parse Movie Details successful',  () => {

        //GIVEN
        let expectedGenre = "Action, Adventure, Comedy";
        let expectedTitle = "Guardians of the Galaxy Vol. 2";
        let expectedReleased = "05 May 2017";
        let expectedDirector = "James Gunn";
        let raw = {
            "Title": expectedTitle,
            "Year": "2017",
            "Rated": "PG-13",
            "Released": expectedReleased,
            "Runtime": "136 min",
            "Genre": expectedGenre,
            "Director": expectedDirector,
            "Writer": "James Gunn, Dan Abnett, Andy Lanning",
            "Actors": "Chris Pratt, Zoe Saldana, Dave Bautista"
        }

        //WHEN
        let movieDTO = omdbParser.parse(raw);

        //THEN
        chai.expect(movieDTO.title).to.be.eql(expectedTitle)
        chai.expect(movieDTO.released).to.be.eql(Date.parse(expectedReleased))
        chai.expect(movieDTO.genre).to.be.eql(expectedGenre)
        chai.expect(movieDTO.director).to.be.eql(expectedDirector)

    });

    it('parse Released N/A Movie Details successful',  () => {

        //GIVEN
        let expectedGenre = "Action, Adventure, Comedy";
        let expectedTitle = "Guardians of the Galaxy Vol. 2";
        let expectedReleased = "N/A";
        let expectedDirector = "James Gunn";
        let raw = {
            "Title": expectedTitle,
            "Released": expectedReleased,
            "Genre": expectedGenre,
            "Director": expectedDirector,
        }

        //WHEN
        let movieDTO = omdbParser.parse(raw);

        //THEN
        chai.expect(movieDTO.released).to.be.eql(null)

    });


    it('parse error `Movie Not Found`',  () => {
        //GIVEN
        let error = "Movie not found!";
        let raw = {
            "Response": "False",
            "Error": error
        }

        //WHEN
        let movieDTO = omdbParser.parse(raw);

        //THEN
        chai.expect(movieDTO.valid()).false
        chai.expect(movieDTO.errorMessage).to.be.eql(error)
    });

    it('parse Movie Details failed',  () => {
        //GIVEN
        let raw = {
            "Title": 'title',
            "Released": 'date',
            "Genre": 'action',
        }

        //WHEN
        let movieDTO = omdbParser.parse(raw);

        //THEN
        chai.expect(movieDTO.valid()).false
        chai.expect(movieDTO.errorMessage).to.be.eql("Movie not found!")
    });

})