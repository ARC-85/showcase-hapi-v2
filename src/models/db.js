import { userMemStore } from "./mem/user-mem-store.js";
import { portfolioMemStore } from "./mem/portfolio-mem-store.js";
import { projectMemStore } from "./mem/project-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { portfolioJsonStore } from "./json/portfolio-json-store.js";
import { projectJsonStore } from "./json/project-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { clientUserMongoStore } from "./mongo/client-user-mongo-store.js";
import { portfolioMongoStore } from "./mongo/portfolio-mongo-store.js";
import { projectMongoStore } from "./mongo/project-mongo-store.js";
import { favouriteMongoStore } from "./mongo/favourite-mongo-store.js";
import { reviewMongoStore } from "./mongo/review-mongo-store.js";

export const db = {
  userStore: null,
  clientUserStore: null,
  portfolioStore: null,
  projectStore: null,
  favouriteStore: null,
  reviewStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.portfolioStore = portfolioJsonStore;
        this.projectStore = projectJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.clientUserStore = clientUserMongoStore;
        this.portfolioStore = portfolioMongoStore;
        this.projectStore = projectMongoStore;
        this.favouriteStore = favouriteMongoStore;
        this.reviewStore = reviewMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.portfolioStore = portfolioMemStore;
        this.projectStore = projectMemStore;
    }
  },
};