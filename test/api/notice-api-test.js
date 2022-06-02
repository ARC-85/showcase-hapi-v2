import { assert } from "chai";
import { showcaseService } from "./showcase-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, maggieCredentials, exampleNotice, testNotices } from "../fixtures.js";

suite("Notice API tests", () => {

  let user = null;

  setup(async () => {
    showcaseService.clearAuth();
    user = await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    await showcaseService.deleteAllNotices();
    await showcaseService.deleteAllUsers();
    user = await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    exampleNotice.userid = user._id;
  });

  teardown(async () => {});

  test("create notice", async () => {
    const returnedNotice = await showcaseService.createNotice(exampleNotice);
    assert.isNotNull(returnedNotice);
    assertSubset(exampleNotice, returnedNotice);
  });

  test("delete a notice", async () => {
    const notice = await showcaseService.createNotice(exampleNotice);
    const response = await showcaseService.deleteNotice(notice._id);
    assert.equal(response.status, 204);
    try {
      const returnedNotice = await showcaseService.getNotice(notice.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Notice with this id", "Incorrect Response Message");
    }
  });

  test("create multiple notices", async () => {
    for (let i = 0; i < testNotices.length; i += 1) {
      testNotices[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await showcaseService.createNotice(testNotices[i]);
    }
    let returnedLists = await showcaseService.getAllNotices();
    assert.equal(returnedLists.length, testNotices.length);
    await showcaseService.deleteAllNotices();
    returnedLists = await showcaseService.getAllNotices();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant notice", async () => {
    try {
      const response = await showcaseService.deleteNotice("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Notice with this id", "Incorrect Response Message");
    }
  });
});