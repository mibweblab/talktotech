const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', function(done) {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          message: 'API - 👋🌎🌍🌏'
        },
        done
      );
  });
});

describe('POST /api/v1/messages', () => {
  it('responds with inserted message', done => {
    const result = {
      name: 'a-háček_',
      message: 'My name is weird but you should accept',
      latitude: -90,
      longitude: 180
    };
    request(app)
      .post('/api/v1/messages')
      .send(result)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        // console.log(response);
        done();
      });
  });
  // it('Can sign up with a name that has diacritics', done => {
  //   //å -háček_
  //   const result = {
  //     name: 'å -háček_',
  //     message: 'My name is weird but you should accept',
  //     latitude: -90,
  //     longitude: 180
  //   };
  //   request(app)
  //     .post('/api/v1/messages')
  //     .send(result)
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .then(response => {
  //       console.log(response);
  //       done();
  //     });
  // });
});
