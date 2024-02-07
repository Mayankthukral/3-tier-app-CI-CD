const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./index'); // Update this path accordingly
const mongoose = require('mongoose');

chai.use(chaiHttp);

const { expect } = chai;

describe('Tasks API', () => {
  it('should create a new task', async () => {
    const res = await chai
      .request(app)
      .post('/tasks')
      .send({
        title: 'Task 1',
        description: 'Description for Task 1',
      });

    expect(res).to.have.status(200);
    expect(res.body).to.be.a('object');
    expect(res.body.title).to.equal('Task 1');
    expect(res.body.description).to.equal('Description for Task 1');
  });

  it('should get all tasks', async () => {
    const res = await chai.request(app).get('/tasks');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  // Add similar modifications for the other test cases (PUT, DELETE)...

  after((done) => {
    mongoose.connection.close(() => {
      done();
    });
  });
});

