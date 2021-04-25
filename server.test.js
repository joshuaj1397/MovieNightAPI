require('dotenv').config();
const mongoose = require('mongoose');
const supertest = require("supertest");
const app = require('./server');

mongoose.set('useFindAndModify', false);



const MovieNightModel = require('./api/models/movieNight');
const MovieModel = require('./api/models/movie');
const UserModel = require('./api/models/user');


beforeEach((done) => {
  mongoose.connect(process.env.TESTDBURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

describe('Movie endpoints', () => {
  it('GET /api/movies/:id', async () => {
    const names = ['Ohmar', 'Joshue'];
    const users = await Promise.all(
      names.map(
        name => new Promise((resolve, reject) => UserModel.create({name: name}, (err, user) => resolve(user.id)))
      )
    );
    const movie = await MovieModel.create({
      imdb_link:'https://www.imdb.com/title/tt0816692/',
      rotten_tomatoes_link: 'https://www.rottentomatoes.com/m/interstellar_2014',
      votes: users
    });
    await supertest(app).get('/api/movies/'+movie._id)
    .expect(200)
    .then((response) =>{
      expect(() => JSON.stringify(response.body)).not.toThrow();

      expect(response.body.imdb_link).toBe('https://www.imdb.com/title/tt0816692/');
      expect(response.body.rotten_tomatoes_link).toBe('https://www.rottentomatoes.com/m/interstellar_2014');
      expect(response.body.votes).toStrictEqual(users);
    });
  });

  it('POST /api/movies', async () => {
    const user = await UserModel.create({
      name: 'Ohmar'
    });
    await supertest(app).post('/api/movies')
    .send({
      imdb_link:'https://www.imdb.com/title/tt0816692/',
      rotten_tomatoes_link: 'https://www.rottentomatoes.com/m/interstellar_2014',
      votes: [user]
    })
    .set('Accept', 'application/json')
    .expect(201)
    .then(response =>{
      MovieModel.findOne({imdb_link: 'https://www.imdb.com/title/tt0816692/'});
    });
  });
});
describe('Movie Night endpoints', () => {
  it('GET /api/movieNights', () => {
    throw('stub');
  });

  it('POST /api/movieNights', () => {
    throw('stub');
  });
});


afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});
