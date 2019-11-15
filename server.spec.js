const server = require("./api/server");
const request = require ("supertest");

describe('server', () => {
    it('expect a 200 status', () => {
       return request(server)
          .get('/')
          .expect(200);
    });
 });
 