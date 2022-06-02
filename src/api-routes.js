import { userApi } from "./api/user-api.js";
import { portfolioApi } from "./api/portfolio-api.js";
import { projectApi } from "./api/project-api.js";
import { answerApi } from "./api/answer-api.js";
import { discussionApi } from "./api/discussion-api.js";
import { favouriteApi } from "./api/favourite-api.js";
import { noticeApi } from "./api/notice-api.js";
import { reviewApi } from "./api/review-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/portfolios", config: portfolioApi.create },
  { method: "DELETE", path: "/api/portfolios", config: portfolioApi.deleteAll },
  { method: "GET", path: "/api/portfolios", config: portfolioApi.find },
  { method: "GET", path: "/api/portfolios/{id}", config: portfolioApi.findOne },
  { method: "DELETE", path: "/api/portfolios/{id}", config: portfolioApi.deleteOne },
  { method: "GET", path: "/api/projects", config: projectApi.find },
  { method: "GET", path: "/api/projects/{id}", config: projectApi.findOne },
  { method: "POST", path: "/api/portfolios/{id}/projects", config: projectApi.create },
  { method: "DELETE", path: "/api/projects", config: projectApi.deleteAll },
  { method: "DELETE", path: "/api/projects/{id}", config: projectApi.deleteOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
  { method: "GET", path: "/api/answers", config: answerApi.find },
  { method: "GET", path: "/api/answers/{id}", config: answerApi.findOne },
  { method: "POST", path: "/api/answers", config: answerApi.create },
  { method: "DELETE", path: "/api/answers", config: answerApi.deleteAll },
  { method: "DELETE", path: "/api/answers/{id}", config: answerApi.deleteOne },
  { method: "GET", path: "/api/discussions", config: discussionApi.find },
  { method: "GET", path: "/api/discussions/{id}", config: discussionApi.findOne },
  { method: "POST", path: "/api/discussions", config: discussionApi.create },
  { method: "DELETE", path: "/api/discussions", config: discussionApi.deleteAll },
  { method: "DELETE", path: "/api/discussions/{id}", config: discussionApi.deleteOne },
  { method: "GET", path: "/api/favourites", config: favouriteApi.find },
  { method: "GET", path: "/api/favourites/{id}", config: favouriteApi.findOne },
  { method: "POST", path: "/api/favourites", config: favouriteApi.create },
  { method: "DELETE", path: "/api/favourites", config: favouriteApi.deleteAll },
  { method: "DELETE", path: "/api/favourites/{id}", config: favouriteApi.deleteOne },
  { method: "GET", path: "/api/notices", config: noticeApi.find },
  { method: "GET", path: "/api/notices/{id}", config: noticeApi.findOne },
  { method: "POST", path: "/api/notices", config: noticeApi.create },
  { method: "DELETE", path: "/api/notices", config: noticeApi.deleteAll },
  { method: "DELETE", path: "/api/notices/{id}", config: noticeApi.deleteOne },
  { method: "GET", path: "/api/reviews", config: reviewApi.find },
  { method: "GET", path: "/api/reviews/{id}", config: reviewApi.findOne },
  { method: "POST", path: "/api/reviews", config: reviewApi.create },
  { method: "DELETE", path: "/api/reviews", config: reviewApi.deleteAll },
  { method: "DELETE", path: "/api/reviews/{id}", config: reviewApi.deleteOne },
];