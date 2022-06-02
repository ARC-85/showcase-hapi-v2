import { assert } from "chai";
import { showcaseService } from "./showcase-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, maggieCredentials, exampleFavourite, testFavourites } from "../fixtures.js";

suite("Favourite API tests", () => {

  let user = null;

  setup(async () => {
    showcaseService.clearAuth();
    user = await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    await showcaseService.deleteAllFavourites();
    await showcaseService.deleteAllUsers();
    user = await showcaseService.createUser(maggie);
    await showcaseService.authenticate(maggieCredentials);
    exampleFavourite.userid = user._id;
  });

  teardown(async () => {});

  test("create favourite", async () => {
    const returnedFavourite = await showcaseService.createFavourite(exampleFavourite);
    assert.isNotNull(returnedFavourite);
    assertSubset(exampleFavourite, returnedFavourite);
  });

  test("delete a favourite", async () => {
    const favourite = await showcaseService.createFavourite(exampleFavourite);
    const response = await showcaseService.deleteFavourite(favourite._id);
    assert.equal(response.status, 204);
    try {
      const returnedFavourite = await showcaseService.getFavourite(favourite.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Favourite with this id", "Incorrect Response Message");
    }
  });

  test("create multiple favourites", async () => {
    for (let i = 0; i < testFavourites.length; i += 1) {
      testFavourites[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await showcaseService.createFavourite(testFavourites[i]);
    }
    let returnedLists = await showcaseService.getAllFavourites();
    assert.equal(returnedLists.length, testFavourites.length);
    await showcaseService.deleteAllFavourites();
    returnedLists = await showcaseService.getAllFavourites();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant favourite", async () => {
    try {
      const response = await showcaseService.deleteFavourite("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Favourite with this id", "Incorrect Response Message");
    }
  });
});