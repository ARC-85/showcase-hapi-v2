import Mongoose from "mongoose";
import Boom from "@hapi/boom";

const { Schema } = Mongoose;

const clientUserSchema = new Schema({
  clientFirstName: String,
  clientLastName: String,
  clientEmail: String,
  clientPassword: String,
});

export const ClientUser = Mongoose.model("ClientUser", clientUserSchema);