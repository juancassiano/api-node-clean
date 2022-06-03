const request = require("supertest");
const app = require("../config/app");

describe("Content-Type Middleware", () => {
  test("Should return Json content type as default", async () => {
    app.get("/test_content_type", (req, res) => {
      res.send({});
    });
    const res = await request(app)
      .get("/test_content_type")
      .expect("content-type", /json/);
  });
});
