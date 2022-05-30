import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
  userType: Joi.string().example("Client").optional(),
  portfolios: Joi.array().optional().example([]),
  favourites: Joi.array().optional().example([]),
  reviews: Joi.array().optional().example([]),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const ClientUserCredentialsSpec = Joi.object()
  .keys({
    clientEmail: Joi.string().email().example("homer@simpson.com").required(),
    clientPassword: Joi.string().example("secret").required(),
  })
  .label("ClientUserCredentials");

export const ClientUserSpec = ClientUserCredentialsSpec.keys({
  clientFirstName: Joi.string().example("Homer").required(),
  clientLastName: Joi.string().example("Simpson").required(),
  favourites: Joi.array().optional().example([]),
}).label("ClientUserDetails");

export const ClientUserSpecPlus = ClientUserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ClientUserDetailsPlus");

export const ClientUserArray = Joi.array().items(ClientUserSpecPlus).label("UserArray");

export const ProjectSpec = Joi.object()
  .keys({
    projectTitle: Joi.string().required().example("Cartoor Farmhouse"),
    latitude: Joi.string().required().example("53.02"),
    longitude: Joi.string().required().example("-9.38"),
    styleDescription: Joi.string().allow("").optional().example("Modern"),
    projectDescription: Joi.string().required().example("An old farmhouse extension"),
    areaSqM: Joi.number().allow("").optional().example("40"),
    priceEu: Joi.number().allow("").optional().example("80000"),
    image1: Joi.string().allow("").optional().example("https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg"),
    image2: Joi.string().allow("").optional().example("https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg"),
    image3: Joi.string().allow("").optional().example("https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg"),
    portfolioid: IdSpec,
    portfolioCategory: Joi.string().optional().example("Extensions"),
    averageRating: Joi.number().allow("").optional().example("4"),
    reviews: Joi.array().optional().example([]),
  })
  .label("Project");

export const ProjectSpecPlus = ProjectSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ProjectPlus");

export const ProjectArraySpec = Joi.array().items(ProjectSpecPlus).label("ProjectArray");

export const PortfolioSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Budget"),
    portfolioCategory: Joi.string().required().example("Extensions"),
    userid: IdSpec,
    projects: ProjectArraySpec,
  })
  .label("Portfolio");

export const PortfolioSpecPlus = PortfolioSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PortfolioPlus");

export const PortfolioArraySpec = Joi.array().items(PortfolioSpecPlus).label("PortfolioArray");

export const FavouriteSpec = Joi.object()
  .keys({
    favouriteProjectTitle: Joi.string().required().example("Cartoor Farmhouse"),
    favouriteLatitude: Joi.string().required().example("53.02"),
    favouriteLongitude: Joi.string().required().example("-9.38"),
    favouriteStyleDescription: Joi.string().allow("").optional().example("Modern"),
    favouriteProjectDescription: Joi.string().required().example("An old farmhouse extension"),
    favouriteAreaSqM: Joi.number().allow("").optional().example("40"),
    favouritePriceEu: Joi.number().allow("").optional().example("80000"),
    favouriteImage1: Joi.string().allow("").optional().example("https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg"),
    favouriteImage2: Joi.string().allow("").optional().example("https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg"),
    favouriteImage3: Joi.string().allow("").optional().example("https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg"),
    userid: IdSpec,
    projectid: IdSpec,
  })
  .label("Favourite");

export const FavouriteSpecPlus = FavouriteSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("FavouritePlus");

export const FavouriteArraySpec = Joi.array().items(FavouriteSpecPlus).label("FavouriteArray");

export const ReviewSpec = Joi.object()
  .keys({
    reviewTitle: Joi.string().allow("").optional().example("Looks Great!"),
    rating: Joi.number().required().example("5"),
    comment: Joi.string().allow("").optional().example("How long did it take?"),
    reply: Joi.string().allow("").optional().example("About 4 months."),
    userid: IdSpec,
    projectid: IdSpec,
  })
  .label("Review");

export const ReviewSpecPlus = ReviewSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ReviewPlus");

export const ReviewArraySpec = Joi.array().items(ReviewSpecPlus).label("ReviewArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");

  export const AdminUserSpec = Joi.object()
  .keys({
    userEmail: Joi.string().email().example("homer@simpson.com").required(),
  })
  .label("AdminUserSpec");