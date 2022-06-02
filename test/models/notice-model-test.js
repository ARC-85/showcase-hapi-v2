import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testNotices, exampleNotice } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Notice Model tests", () => {

setup(async () => {
    db.init("mongo");
    await db.noticeStore.deleteAllNotices();
    for (let i = 0; i < testNotices.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testNotices[i] = await db.noticeStore.addNotice(testNotices[i]);
    }
  });

  test("create a notice", async () => {
    const notice = await db.noticeStore.addNotice(exampleNotice);
    assertSubset(exampleNotice, notice);
    assert.isDefined(notice._id);
  });

  test("delete all notices", async () => {
    let returnedNotices = await db.noticeStore.getAllNotices();
    assert.equal(returnedNotices.length, 3);
    await db.noticeStore.deleteAllNotices();
    returnedNotices = await db.noticeStore.getAllNotices();
    assert.equal(returnedNotices.length, 0);
  });

  test("get a notice - success", async () => {
    const notice = await db.noticeStore.addNotice(exampleNotice);
    const returnedNotice = await db.noticeStore.getNoticeById(notice._id);
    assertSubset(returnedNotice, notice);
  });

  test("delete One Notice - success", async () => {
    const id = testNotices[0]._id;
    await db.noticeStore.deleteNotice(id);
    const returnedNotices = await db.noticeStore.getAllNotices();
    assert.equal(returnedNotices.length, testNotices.length - 1);
    const deletedNotice = await db.noticeStore.getNoticeById(id);
    assert.isNull(deletedNotice);
  });

  test("get a notice - bad params", async () => {
    assert.isNull(await db.noticeStore.getNoticeById(""));
    assert.isNull(await db.noticeStore.getNoticeById());
  });

  test("delete One Notice - fail", async () => {
    await db.noticeStore.deleteNotice("bad-id");
    const allNotices = await db.noticeStore.getAllNotices();
    assert.equal(testNotices.length, allNotices.length);
  });
});