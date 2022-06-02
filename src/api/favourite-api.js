import Boom from "@hapi/boom";
import { IdSpec, FavouriteArraySpec, FavouriteSpec, FavouriteSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const favouriteApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const favourites = await db.favouriteStore.getAllFavourites();
        return favourites;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: FavouriteArraySpec, failAction: validationError },
    description: "Get all favourites",
    notes: "Returns all favourites",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const favourite = await db.favouriteStore.getFavouriteById(request.params.id);
        if (!favourite) {
          return Boom.notFound("No Favourite with this id");
        }
        return favourite;
      } catch (err) {
        return Boom.serverUnavailable("No Favourite with this id");
      }
    },
    tags: ["api"],
    description: "Find a Favourite",
    notes: "Returns a favourite",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: FavouriteSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const favourite = request.payload;
        const newFavourite = await db.favouriteStore.addFavourite(favourite);
        if (newFavourite) {
          return h.response(newFavourite).code(201);
        }
        return Boom.badImplementation("error creating favourite");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Favourite",
    notes: "Returns the newly created favourite",
    validate: { payload: FavouriteSpec, failAction: validationError },
    response: { schema: FavouriteSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const favourite = await db.favouriteStore.getFavouriteById(request.params.id);
        if (!favourite) {
          return Boom.notFound("No Favourite with this id");
        }
        await db.favouriteStore.deleteFavouriteById(favourite._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Favourite with this id");
      }
    },
    tags: ["api"],
    description: "Delete a favourite",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.favouriteStore.deleteAllFavourites();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all FavouriteApi",
  },
};