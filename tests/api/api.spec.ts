import chai from "chai";
import request from "supertest";
import { Author } from "../../src/models";
import { getItem, emptyTable, setData } from "../helpers/dynamoDBHelper";
import { v4 } from "uuid";

const expect = chai.expect;
const APP_URL = "http://localhost:3000"; // Assuming that it's deploying serverless mode offline

let demoAuthors: Author[];

describe("Author Endpoints tests using SUPERTEST: ", function () {
  describe("GET /authors", function () {
    beforeEach(async () => {
      await emptyTable({ tableName: "Authors", hashKey: ["authorId"] });

      demoAuthors = [
        {
          authorId: v4(),
          firstName: "Walter",
          lastName: "Lee",
          email: "wlee@example.com",
          createdAt: new Date().toISOString(),
        },
        {
          authorId: v4(),
          firstName: "Davy",
          lastName: "Jonas",
          email: "djonas@example.com",
          createdAt: new Date().toISOString(),
        },
        {
          authorId: v4(),
          firstName: "Paul",
          lastName: "Hugh",
          email: "phugh@example.com",
          createdAt: new Date().toISOString(),
        },
      ];
      await setData({ tableName: "Authors", items: demoAuthors });
    });

    it("This request should obtain 3 authors in response", function (done) {
      request(APP_URL)
        .get("/dev/authors")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          // response.body contain the response data
          expect(response.body.length).to.equal(3);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("POST /authors", function () {
    it("This request should store an author within the database and obtain a new author in response", function (done) {
      request(APP_URL)
        .post("/dev/authors")
        .send({
          firstName: "Freddy",
          lastName: "Linch",
          email: "flinch@example.com",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .then(async (response) => {
          // response.body contain the response data
          const toCompare = (await getItem({
            tableName: "Authors",
            key: {
              authorId: response.body.authorId,
            },
          })) as Author;
          expect(toCompare.authorId).to.equal(response.body.authorId);
          expect(toCompare.firstName).to.equal("Freddy");
          expect(toCompare.lastName).to.equal("Linch");
          expect(toCompare.email).to.equal("flinch@example.com");
          done();
        })
        .catch((err) => done(err));
    });
  });
});


describe("People Endpoints tests using SUPERTEST: ", function () {
  describe("GET /people", function () {
  
    it("This request should obtain people in response when each person only has to have 16 attributes otherwise it means the API has changed in of its attributes", function (done) {
      request(APP_URL)
        .get("/dev/people")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          // response.body contain the response data
          expect(response.body.recuento).is.not.undefined;
          expect(response.body.siguiente).is.not.undefined;
          expect(response.body.anterior).is.not.undefined;
          response.body.resultados.forEach(item => {
            const keys = Object.keys(item);
            expect(keys.length).to.equal(16); // only 16 attributes have been mapped for the Person model in SWAPI
          })
          done();
        })
        .catch((err) => done(err));
    });
  });

});
