import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testReviews, exampleReview } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Review Model tests", () => {

setup(async () => {
    db.init("mongo");
    await db.reviewStore.deleteAllReviews();
    for (let i = 0; i < testReviews.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testReviews[i] = await db.reviewStore.addReview(testReviews[i]);
    }
  });

  test("create a review", async () => {
    const review = await db.reviewStore.addReview(exampleReview);
    assertSubset(exampleReview, review);
    assert.isDefined(review._id);
  });

  test("delete all reviews", async () => {
    let returnedReviews = await db.reviewStore.getAllReviews();
    assert.equal(returnedReviews.length, 3);
    await db.reviewStore.deleteAllReviews();
    returnedReviews = await db.reviewStore.getAllReviews();
    assert.equal(returnedReviews.length, 0);
  });

  test("get a review - success", async () => {
    const review = await db.reviewStore.addReview(exampleReview);
    const returnedReview = await db.reviewStore.getReviewById(review._id);
    assertSubset(returnedReview, review);
  });

  test("delete One Review - success", async () => {
    const id = testReviews[0]._id;
    await db.reviewStore.deleteReviewById(id);
    const returnedReviews = await db.reviewStore.getAllReviews();
    assert.equal(returnedReviews.length, testReviews.length - 1);
    const deletedReview = await db.reviewStore.getReviewById(id);
    assert.isNull(deletedReview);
  });

  test("get a review - bad params", async () => {
    assert.isNull(await db.reviewStore.getReviewById(""));
    assert.isNull(await db.reviewStore.getReviewById());
  });

  test("delete One Review - fail", async () => {
    await db.reviewStore.deleteReviewById("bad-id");
    const allReviews = await db.reviewStore.getAllReviews();
    assert.equal(testReviews.length, allReviews.length);
  });
});