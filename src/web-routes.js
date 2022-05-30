import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { clientDashboardController } from "./controllers/client-dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { clientAboutController } from "./controllers/client-about-controller.js";
import { portfolioController } from "./controllers/portfolio-controller.js";
import { projectController } from "./controllers/project-controller.js";
import { clientProjectController } from "./controllers/client-project-controller.js";
import { favouritesController } from "./controllers/favourites-controller.js";
import { adminController } from "./controllers/admin-controller.js";
import { reviewsController } from "./controllers/reviews-controller.js";
import { projectReviewsController } from "./controllers/project-reviews-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  // { method: "GET", path: "/clientsignup", config: accountsController.showClientSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/clientlogin", config: accountsController.showClientLogin },
  { method: "GET", path: "/adminlogin", config: accountsController.showAdminLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  // { method: "POST", path: "/clientregister", config: accountsController.clientSignup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "POST", path: "/clientauthenticate", config: accountsController.clientLogin },
  { method: "POST", path: "/adminauthenticate", config: accountsController.adminLogin },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "GET", path: "/clientdashboard", config: clientDashboardController.index },
  { method: "POST", path: "/dashboard/addportfolio", config: dashboardController.addPortfolio },
  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/clientabout", config: clientAboutController.index },
  { method: "GET", path: "/portfolio/{id}", config: portfolioController.index },
  { method: "POST", path: "/portfolio/{id}/addproject", config: portfolioController.addProject },
  { method: "GET", path: "/dashboard/deleteportfolio/{id}", config: dashboardController.deletePortfolio },
  { method: "GET", path: "/portfolio/{id}/deleteproject/{projectid}", config: portfolioController.deleteProject },
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
  { method: "GET", path: "/project/{id}", config: projectController.index },
  { method: "GET", path: "/clientproject/{id}", config: clientProjectController.index },
  { method: "POST", path: "/project/{id}/updateproject", config: projectController.updateProject },
  { method: "POST", path: "/project/{id}/updateprojecttitle", config: projectController.updateProjectTitle },
  { method: "POST", path: "/project/{id}/updateimage1", config: projectController.updateImage1 },
  { method: "POST", path: "/project/{id}/updateimage2", config: projectController.updateImage2 },
  { method: "POST", path: "/project/{id}/updateimage3", config: projectController.updateImage3 },
  { method: "GET", path: "/admindashboard", config: adminController.index },
  { method: "GET", path: "/admindashboard/deleteuser/{id}", config: adminController.deleteUser },
  { method: "POST", path: "/userstats", config: adminController.userStats },
  { method: "POST", path: "/updateprofile", config: accountsController.updateProfile },
  { method: "GET", path: "/profile", config: accountsController.showProfile },
  { method: "GET", path: "/clientprofile", config: accountsController.showClientProfile },
  { method: "GET", path: "/favourites", config: favouritesController.index },
  { method: "GET", path: "/addfavourite/{id}", config: clientProjectController.addFavourite },
  { method: "GET", path: "/favourites/deletefavourite/{id}", config: favouritesController.deleteFavourite },
  { method: "POST", path: "/filterprojects", config: clientDashboardController.categoryFilter },
  { method: "POST", path: "/clientproject/{id}/addreview", config: clientProjectController.addReview },
  { method: "GET", path: "/reviews", config: reviewsController.index },
  { method: "GET", path: "/reviews/deletereview/{id}", config: reviewsController.deleteReview },
  { method: "GET", path: "/project/{id}/projectreviews", config: projectReviewsController.index },
  { method: "POST", path: "/project/{id}/updatereply/{reviewid}", config: projectReviewsController.updateReply },
];