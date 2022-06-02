import Boom from "@hapi/boom";
import { IdSpec, AnswerArraySpec, AnswerSpec, AnswerSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const answerApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const answers = await db.answerStore.getAllAnswers();
        return answers;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: AnswerArraySpec, failAction: validationError },
    description: "Get all answers",
    notes: "Returns all answers",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const answer = await db.answerStore.getAnswerById(request.params.id);
        if (!answer) {
          return Boom.notFound("No Answer with this id");
        }
        return answer;
      } catch (err) {
        return Boom.serverUnavailable("No Answer with this id");
      }
    },
    tags: ["api"],
    description: "Find a Answer",
    notes: "Returns a answer",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: AnswerSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const answer = request.payload;
        const newAnswer = await db.answerStore.addAnswer(answer);
        if (newAnswer) {
          return h.response(newAnswer).code(201);
        }
        return Boom.badImplementation("error creating answer");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Answer",
    notes: "Returns the newly created answer",
    validate: { payload: AnswerSpec, failAction: validationError },
    response: { schema: AnswerSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const answer = await db.answerStore.getAnswerById(request.params.id);
        if (!answer) {
          return Boom.notFound("No Answer with this id");
        }
        await db.answerStore.deleteAnswerById(answer._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Answer with this id");
      }
    },
    tags: ["api"],
    description: "Delete a answer",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.answerStore.deleteAllAnswers();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all AnswerApi",
  },
};