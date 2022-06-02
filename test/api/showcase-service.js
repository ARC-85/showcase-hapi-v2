import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const showcaseService = {
  showcaseUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.showcaseUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.showcaseUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.showcaseUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.showcaseUrl}/api/users`);
    return res.data;
  },

  async deleteUser(id) {
    const response = await axios.delete(`${this.showcaseUrl}/api/users/${id}`);
    return response;
  },

  async createPortfolio(portfolio) {
    const res = await axios.post(`${this.showcaseUrl}/api/portfolios`, portfolio);
    return res.data;
  },

  async deleteAllPortfolios() {
    const response = await axios.delete(`${this.showcaseUrl}/api/portfolios`);
    return response.data;
  },

  async deletePortfolio(id) {
    const response = await axios.delete(`${this.showcaseUrl}/api/portfolios/${id}`);
    return response;
  },

  async getAllPortfolios() {
    const res = await axios.get(`${this.showcaseUrl}/api/portfolios`);
    return res.data;
  },

  async getPortfolio(id) {
    const res = await axios.get(`${this.showcaseUrl}/api/portfolios/${id}`);
    return res.data;
  },

  async getAllProjects() {
    const res = await axios.get(`${this.showcaseUrl}/api/projects`);
    return res.data;
  },

  async createProject(id, project) {
    const res = await axios.post(`${this.showcaseUrl}/api/portfolios/${id}/projects`, project);
    return res.data;
  },

  async deleteAllProjects() {
    const res = await axios.delete(`${this.showcaseUrl}/api/projects`);
    return res.data;
  },

  async getProject(id) {
    const res = await axios.get(`${this.showcaseUrl}/api/projects/${id}`);
    return res.data;
  },

  async deleteProject(id) {
    const res = await axios.delete(`${this.showcaseUrl}/api/projects/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.showcaseUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${  response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  async createAnswer(answer) {
    const res = await axios.post(`${this.showcaseUrl}/api/answers`, answer);
    return res.data;
  },

  async deleteAllAnswers() {
    const response = await axios.delete(`${this.showcaseUrl}/api/answers`);
    return response.data;
  },

  async deleteAnswer(id) {
    const response = await axios.delete(`${this.showcaseUrl}/api/answers/${id}`);
    return response;
  },

  async getAllAnswers() {
    const res = await axios.get(`${this.showcaseUrl}/api/answers`);
    return res.data;
  },

  async getAnswer(id) {
    const res = await axios.get(`${this.showcaseUrl}/api/answers/${id}`);
    return res.data;
  },

  async createDiscussion(discussion) {
    const res = await axios.post(`${this.showcaseUrl}/api/discussions`, discussion);
    return res.data;
  },

  async deleteAllDiscussions() {
    const response = await axios.delete(`${this.showcaseUrl}/api/discussions`);
    return response.data;
  },

  async deleteDiscussion(id) {
    const response = await axios.delete(`${this.showcaseUrl}/api/discussions/${id}`);
    return response;
  },

  async getAllDiscussions() {
    const res = await axios.get(`${this.showcaseUrl}/api/discussions`);
    return res.data;
  },

  async getDiscussion(id) {
    const res = await axios.get(`${this.showcaseUrl}/api/discussions/${id}`);
    return res.data;
  },

  async createFavourite(favourite) {
    const res = await axios.post(`${this.showcaseUrl}/api/favourites`, favourite);
    return res.data;
  },

  async deleteAllFavourites() {
    const response = await axios.delete(`${this.showcaseUrl}/api/favourites`);
    return response.data;
  },

  async deleteFavourite(id) {
    const response = await axios.delete(`${this.showcaseUrl}/api/favourites/${id}`);
    return response;
  },

  async getAllFavourites() {
    const res = await axios.get(`${this.showcaseUrl}/api/favourites`);
    return res.data;
  },

  async getFavourite(id) {
    const res = await axios.get(`${this.showcaseUrl}/api/favourites/${id}`);
    return res.data;
  },

  async createNotice(notice) {
    const res = await axios.post(`${this.showcaseUrl}/api/notices`, notice);
    return res.data;
  },

  async deleteAllNotices() {
    const response = await axios.delete(`${this.showcaseUrl}/api/notices`);
    return response.data;
  },

  async deleteNotice(id) {
    const response = await axios.delete(`${this.showcaseUrl}/api/notices/${id}`);
    return response;
  },

  async getAllNotices() {
    const res = await axios.get(`${this.showcaseUrl}/api/notices`);
    return res.data;
  },

  async getNotice(id) {
    const res = await axios.get(`${this.showcaseUrl}/api/notices/${id}`);
    return res.data;
  },

  async createReview(review) {
    const res = await axios.post(`${this.showcaseUrl}/api/reviews`, review);
    return res.data;
  },

  async deleteAllReviews() {
    const response = await axios.delete(`${this.showcaseUrl}/api/reviews`);
    return response.data;
  },

  async deleteReview(id) {
    const response = await axios.delete(`${this.showcaseUrl}/api/reviews/${id}`);
    return response;
  },

  async getAllReviews() {
    const res = await axios.get(`${this.showcaseUrl}/api/reviews`);
    return res.data;
  },

  async getReview(id) {
    const res = await axios.get(`${this.showcaseUrl}/api/reviews/${id}`);
    return res.data;
  },



};
