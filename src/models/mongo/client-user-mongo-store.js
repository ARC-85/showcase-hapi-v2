import { ClientUser } from "./client-user.js";
import { favouriteMongoStore } from "./favourite-mongo-store.js";

export const clientUserMongoStore = {
  async getAllClientUsers() {
    const clientUsers = await ClientUser.find().lean();
    return clientUsers;
  },

  async getClientUserById(id) {
    if (id) {
      const clientUser = await ClientUser.findOne({ _id: id }).lean();
      if (clientUser) {
        clientUser.favourites = await favouriteMongoStore.getClientUserFavourites(clientUser._id);
      } 
      return clientUser;
    }
    return null;
  },

  async addClientUser(clientUser) {
    const newClientUser = new ClientUser(clientUser);
    const clientUserObj = await newClientUser.save();
    const u = await this.getClientUserById(clientUserObj._id);
    return u;
  },

  async getClientUserByEmail(clientEmail) {
    const clientUser = await ClientUser.findOne({ clientEmail: clientEmail }).lean();
    if (clientUser) {
      clientUser.favourites = await favouriteMongoStore.getClientUserFavourites(clientUser._id);
    } 
    return clientUser;
  },

  async deleteClientUserById(id) {
    try {
      await ClientUser.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await ClientUser.deleteMany({});
  },

  async updateClientUser(clientUser, updatedClientUser) {
    clientUser.clientFirstName = updatedClientUser.clientFirstName;
    clientUser.clientLastName = updatedClientUser.clientLastName;
    clientUser.clientEmail = updatedClientUser.clientEmail;
    clientUser.clientPassword = updatedClientUser.clientPassword;
    const query = { _id: clientUser._id };
    const updatedValues = { $set: {clientFirstName: clientUser.clientFirstName, clientLastName: clientUser.clientLastName, clientEmail: clientUser.clientEmail, clientPassword: clientUser.clientPassword} };
    await ClientUser.updateOne(query, updatedValues);
  },
};