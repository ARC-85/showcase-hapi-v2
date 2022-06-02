import { assert } from "chai";
import { showcaseService } from "./showcase-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, maggieCredentials, exampleDiscussion, testDiscussions } from "../fixtures.js";

suite("Discussion API tests", () => {

  let user = null;

  setup(async () => {
    showcaseService.clearAuth();
    user = await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    await showcaseService.deleteAllDiscussions();
    await showcaseService.deleteAllUsers();
    user = await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    exampleDiscussion.userid = user._id;
  });

  teardown(async () => {});

  test("create discussion", async () => {
    const returnedDiscussion = await showcaseService.createDiscussion(exampleDiscussion);
    assert.isNotNull(returnedDiscussion);
    assertSubset(exampleDiscussion, returnedDiscussion);
  });

  test("delete a discussion", async () => {
    const discussion = await showcaseService.createDiscussion(exampleDiscussion);
    const response = await showcaseService.deleteDiscussion(discussion._id);
    assert.equal(response.status, 204);
    try {
      const returnedDiscussion = await showcaseService.getDiscussion(discussion.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Discussion with this id", "Incorrect Response Message");
    }
  });

  test("create multiple discussions", async () => {
    for (let i = 0; i < testDiscussions.length; i += 1) {
      testDiscussions[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await showcaseService.createDiscussion(testDiscussions[i]);
    }
    let returnedLists = await showcaseService.getAllDiscussions();
    assert.equal(returnedLists.length, testDiscussions.length);
    await showcaseService.deleteAllDiscussions();
    returnedLists = await showcaseService.getAllDiscussions();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant discussion", async () => {
    try {
      const response = await showcaseService.deleteDiscussion("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Discussion with this id", "Incorrect Response Message");
    }
  });
});