const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./index'); // Update this path accordingly
const mongoose = require('mongoose');
const { exec } = require('child_process');

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
    if (mongoose.connection.readyState === 1) { // Check if connection is established
      mongoose.connection.close(() => {
        console.log('MongoDB connection closed.');
        done();
      });
    } else {
      console.log('MongoDB connection not established.');
      done(); // Call done() to signal that the tests are complete
    }
  });

  // Automatically exit after all tests pass
  after(() => {
    exec('kill $(pgrep -f "node test.js")'); // Kill the test process after all tests pass
  });
});
