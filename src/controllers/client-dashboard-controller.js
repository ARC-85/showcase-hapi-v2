import { db } from "../models/db.js";


export const clientDashboardController = {
  index: {
    handler: async function (request, h) {
      // const loggedInClientUser = request.auth.credentials;
      // const favourites = await db.favouriteStore.getClientUserFavourites(loggedInClientUser._id);
      const projects = await db.projectStore.getAllProjects();
      const viewData = {
        title: "Showcase Client Dashboard",
        // user: loggedInClientUser,
        projects: projects,
      };
      console.log(projects);
      return h.view("client-dashboard-view", viewData);
    },
  },

  categoryFilter: {
    handler: async function (request, h) {
      // const loggedInClientUser = request.auth.credentials;
      // const favourites = await db.favouriteStore.getClientUserFavourites(loggedInClientUser._id);
      const portfolioCategory = await request.payload.portfolioCategory;
      const projects = await db.projectStore.getProjectsByCategory(portfolioCategory);
      const viewData = {
        title: "Showcase Client Dashboard",
        // user: loggedInClientUser,
        projects: projects,
      };
      return h.view("client-dashboard-view", viewData);
    },
  },

};