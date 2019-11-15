const server = require("./api/server");
const request = require ("supertest");
const db = require ("./database/dbConfig");
const authModel = require ("./auth/users-model");

// Test 1 : Server is running 
describe('server', () => {
    it('expect a 200 status', () => {
       return request(server)
          .get('/')
          .expect(200);
    });
 });

 // Clear tables before running each test

 describe("auth-router", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("POST /api/auth/register", () => {
    it("user should be created with 201", async () => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "admin2", password: "admin" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it("response use JSON", async () => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "admin", password: "admin" })
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
});

