import { db } from "../models/db.js";
import { FavouriteSpec } from "../models/joi-schemas.js";

export const clientProjectController = {
  index: {
    handler: async function (request, h) {
      const project = await db.projectStore.getProjectById(request.params.id);
      const viewData = {
        title: "Project",
        project: project,
      };
      return h.view("client-project-view", viewData);
    },
  },

  addFavourite: {
    /* validate: {
      payload: FavouriteSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("client-dashboard-view", { title: "Add Favourite error", errors: error.details }).takeover().code(400);
      },
    }, */
    handler: async function (request, h) {
      const loggedInClientUser = request.auth.credentials;
      const project = await db.projectStore.getProjectById(request.params.id);
      const newFavourite = {
        userid: loggedInClientUser._id,
        projectid: project._id,
        favouriteProjectTitle: project.projectTitle,
        favouriteLatitude: project.latitude,
        favouriteLongitude: project.longitude,
        favouriteStyleDescription: project.styleDescription,
        favouriteProjectDescription: project.projectDescription,
        favouriteAreaSqM: project.areaSqM,
        favouritePriceEu: project.priceEu,
        favouriteImage1: project.image1,
        favouriteImage2: project.image2,
        favouriteImage3: project.image3,
      };
      await db.favouriteStore.addFavourite(newFavourite);
      console.log("this is new favourite");
      console.log(newFavourite);
      return h.redirect("/favourites");
    },
  },

};