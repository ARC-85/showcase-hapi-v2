import Boom from "@hapi/boom";
import { IdSpec, NoticeArraySpec, NoticeSpec, NoticeSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const noticeApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const notices = await db.noticeStore.getAllNotices();
        return notices;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: NoticeArraySpec, failAction: validationError },
    description: "Get all notices",
    notes: "Returns all notices",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const notice = await db.noticeStore.getNoticeById(request.params.id);
        if (!notice) {
          return Boom.notFound("No Notice with this id");
        }
        return notice;
      } catch (err) {
        return Boom.serverUnavailable("No Notice with this id");
      }
    },
    tags: ["api"],
    description: "Find a Notice",
    notes: "Returns a notice",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: NoticeSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const notice = request.payload;
        const newNotice = await db.noticeStore.addNotice(notice);
        if (newNotice) {
          return h.response(newNotice).code(201);
        }
        return Boom.badImplementation("error creating notice");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Notice",
    notes: "Returns the newly created notice",
    validate: { payload: NoticeSpec, failAction: validationError },
    response: { schema: NoticeSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const notice = await db.noticeStore.getNoticeById(request.params.id);
        if (!notice) {
          return Boom.notFound("No Notice with this id");
        }
        await db.noticeStore.deleteNoticeById(notice._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Notice with this id");
      }
    },
    tags: ["api"],
    description: "Delete a notice",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.noticeStore.deleteAllNotices();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all NoticeApi",
  },
};