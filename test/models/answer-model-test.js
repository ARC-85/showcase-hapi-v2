import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testAnswers, exampleAnswer } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Answer Model tests", () => {

setup(async () => {
    db.init("mongo");
    await db.answerStore.deleteAllAnswers();
    for (let i = 0; i < testAnswers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testAnswers[i] = await db.answerStore.addAnswer(testAnswers[i]);
    }
  });

  test("create a answer", async () => {
    const answer = await db.answerStore.addAnswer(exampleAnswer);
    assertSubset(exampleAnswer, answer);
    assert.isDefined(answer._id);
  });

  test("delete all answers", async () => {
    let returnedAnswers = await db.answerStore.getAllAnswers();
    assert.equal(returnedAnswers.length, 3);
    await db.answerStore.deleteAllAnswers();
    returnedAnswers = await db.answerStore.getAllAnswers();
    assert.equal(returnedAnswers.length, 0);
  });

  test("get a answer - success", async () => {
    const answer = await db.answerStore.addAnswer(exampleAnswer);
    const returnedAnswer = await db.answerStore.getAnswerById(answer._id);
    assertSubset(returnedAnswer, answer);
  });

  test("delete One Answer - success", async () => {
    const id = testAnswers[0]._id;
    await db.answerStore.deleteAnswerById(id);
    const returnedAnswers = await db.answerStore.getAllAnswers();
    assert.equal(returnedAnswers.length, testAnswers.length - 1);
    const deletedAnswer = await db.answerStore.getAnswerById(id);
    assert.isNull(deletedAnswer);
  });

  test("get a answer - bad params", async () => {
    assert.isNull(await db.answerStore.getAnswerById(""));
    assert.isNull(await db.answerStore.getAnswerById());
  });

  test("delete One Answer - fail", async () => {
    await db.answerStore.deleteAnswerById("bad-id");
    const allAnswers = await db.answerStore.getAllAnswers();
    assert.equal(testAnswers.length, allAnswers.length);
  });
});