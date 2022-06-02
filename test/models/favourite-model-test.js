import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testDiscussions, exampleDiscussion } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Discussion Model tests", () => {

setup(async () => {
    db.init("mongo");
    await db.discussionStore.deleteAllDiscussions();
    for (let i = 0; i < testDiscussions.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testDiscussions[i] = await db.discussionStore.addDiscussion(testDiscussions[i]);
    }
  });

  test("create a discussion", async () => {
    const discussion = await db.discussionStore.addDiscussion(exampleDiscussion);
    assertSubset(exampleDiscussion, discussion);
    assert.isDefined(discussion._id);
  });

  test("delete all discussions", async () => {
    let returnedDiscussions = await db.discussionStore.getAllDiscussions();
    assert.equal(returnedDiscussions.length, 3);
    await db.discussionStore.deleteAllDiscussions();
    returnedDiscussions = await db.discussionStore.getAllDiscussions();
    assert.equal(returnedDiscussions.length, 0);
  });

  test("get a discussion - success", async () => {
    const discussion = await db.discussionStore.addDiscussion(exampleDiscussion);
    const returnedDiscussion = await db.discussionStore.getDiscussionById(discussion._id);
    assertSubset(returnedDiscussion, discussion);
  });

  test("delete One Discussion - success", async () => {
    const id = testDiscussions[0]._id;
    await db.discussionStore.deleteDiscussionById(id);
    const returnedDiscussions = await db.discussionStore.getAllDiscussions();
    assert.equal(returnedDiscussions.length, testDiscussions.length - 1);
    const deletedDiscussion = await db.discussionStore.getDiscussionById(id);
    assert.isNull(deletedDiscussion);
  });

  test("get a discussion - bad params", async () => {
    assert.isNull(await db.discussionStore.getDiscussionById(""));
    assert.isNull(await db.discussionStore.getDiscussionById());
  });

  test("delete One Discussion - fail", async () => {
    await db.discussionStore.deleteDiscussionById("bad-id");
    const allDiscussions = await db.discussionStore.getAllDiscussions();
    assert.equal(testDiscussions.length, allDiscussions.length);
  });
});