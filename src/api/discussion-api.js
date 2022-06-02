import Boom from "@hapi/boom";
import { IdSpec, DiscussionArraySpec, DiscussionSpec, DiscussionSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const discussionApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const discussions = await db.discussionStore.getAllDiscussions();
        return discussions;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: DiscussionArraySpec, failAction: validationError },
    description: "Get all discussions",
    notes: "Returns all discussions",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const discussion = await db.discussionStore.getDiscussionById(request.params.id);
        if (!discussion) {
          return Boom.notFound("No Discussion with this id");
        }
        return discussion;
      } catch (err) {
        return Boom.serverUnavailable("No Discussion with this id");
      }
    },
    tags: ["api"],
    description: "Find a Discussion",
    notes: "Returns a discussion",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: DiscussionSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const discussion = request.payload;
        const newDiscussion = await db.discussionStore.addDiscussion(discussion);
        if (newDiscussion) {
          return h.response(newDiscussion).code(201);
        }
        return Boom.badImplementation("error creating discussion");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Discussion",
    notes: "Returns the newly created discussion",
    validate: { payload: DiscussionSpec, failAction: validationError },
    response: { schema: DiscussionSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const discussion = await db.discussionStore.getDiscussionById(request.params.id);
        if (!discussion) {
          return Boom.notFound("No Discussion with this id");
        }
        await db.discussionStore.deleteDiscussionById(discussion._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Discussion with this id");
      }
    },
    tags: ["api"],
    description: "Delete a discussion",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.discussionStore.deleteAllDiscussions();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all DiscussionApi",
  },
};