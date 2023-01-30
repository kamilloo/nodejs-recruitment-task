export class MovieController {
    get = (req) => {
        Movie.getAll().then(
            (movies) => movies
        )}
}