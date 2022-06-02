import { assert } from "chai";
import { showcaseService } from "./showcase-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, maggieCredentials, exampleReview, testReviews } from "../fixtures.js";

suite("Review API tests", () => {

  let user = null;

  setup(async () => {
    showcaseService.clearAuth();
    user = await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    await showcaseService.deleteAllReviews();
    await showcaseService.deleteAllUsers();
    user = await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    exampleReview.userid = user._id;
  });

  teardown(async () => {});

  test("create review", async () => {
    const returnedReview = await showcaseService.createReview(exampleReview);
    assert.isNotNull(returnedReview);
    assertSubset(exampleReview, returnedReview);
  });

  test("delete a review", async () => {
    const review = await showcaseService.createReview(exampleReview);
    const response = await showcaseService.deleteReview(review._id);
    assert.equal(response.status, 204);
    try {
      const returnedReview = await showcaseService.getReview(review.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Review with this id", "Incorrect Response Message");
    }
  });

  test("create multiple reviews", async () => {
    for (let i = 0; i < testReviews.length; i += 1) {
      testReviews[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await showcaseService.createReview(testReviews[i]);
    }
    let returnedLists = await showcaseService.getAllReviews();
    assert.equal(returnedLists.length, testReviews.length);
    await showcaseService.deleteAllReviews();
    returnedLists = await showcaseService.getAllReviews();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant review", async () => {
    try {
      const response = await showcaseService.deleteReview("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Review with this id", "Incorrect Response Message");
    }
  });
});