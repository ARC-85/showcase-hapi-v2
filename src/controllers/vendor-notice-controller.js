import { db } from "../models/db.js";
import { NoticeSpec } from "../models/joi-schemas.js";

export const vendorNoticeController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const notices = await db.noticeStore.getAllNotices();
      const viewData = {
        title: "Client User Notices",
        user: loggedInUser,
        notices: notices,
      };
      return h.view("vendor-notices-view", viewData);
    },
  },

  categoryFilter: {
    handler: async function (request, h) {
      // const loggedInClientUser = request.auth.credentials;
      // const favourites = await db.favouriteStore.getClientUserFavourites(loggedInClientUser._id);
      const noticeCategory = await request.payload.noticeCategory;
      const notices = await db.noticeStore.getNoticesByCategory(noticeCategory);
      const viewData = {
        title: "Showcase Notices",
        // user: loggedInClientUser,
        notices: notices,
      };
      return h.view("vendor-notices-view", viewData);
    },
  },

  deleteNotice: {
    handler: async function (request, h) {
      const notice = await db.noticeStore.getNoticeById(request.params.id);
      await db.noticeStore.deleteNotice(notice._id);
      return h.redirect("/vendornotices");
    },
  },

};