import { assert } from "chai";
import { showcaseService } from "./showcase-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, maggieCredentials, exampleAnswer, testAnswers } from "../fixtures.js";

suite("Answer API tests", () => {

  let user = null;

  setup(async () => {
    showcaseService.clearAuth();
    user = await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    await showcaseService.deleteAllAnswers();
    await showcaseService.deleteAllUsers();
    user = await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    exampleAnswer.userid = user._id;
  });

  teardown(async () => {});

  test("create answer", async () => {
    const returnedAnswer = await showcaseService.createAnswer(exampleAnswer);
    assert.isNotNull(returnedAnswer);
    assertSubset(exampleAnswer, returnedAnswer);
  });

  test("delete a answer", async () => {
    const answer = await showcaseService.createAnswer(exampleAnswer);
    const response = await showcaseService.deleteAnswer(answer._id);
    assert.equal(response.status, 204);
    try {
      const returnedAnswer = await showcaseService.getAnswer(answer.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Answer with this id", "Incorrect Response Message");
    }
  });

  test("create multiple answers", async () => {
    for (let i = 0; i < testAnswers.length; i += 1) {
      testAnswers[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await showcaseService.createAnswer(testAnswers[i]);
    }
    let returnedLists = await showcaseService.getAllAnswers();
    assert.equal(returnedLists.length, testAnswers.length);
    await showcaseService.deleteAllAnswers();
    returnedLists = await showcaseService.getAllAnswers();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant answer", async () => {
    try {
      const response = await showcaseService.deleteAnswer("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Answer with this id", "Incorrect Response Message");
    }
  });
});