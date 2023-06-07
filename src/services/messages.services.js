import { MessagesModel } from "../DAO/models/message.model.js";

class MessagesServices {
  async validateAddMessage(user, message) {
    if (!user || !message) {
      console.log("validation error: please complete the fields.");
      throw "VALIDATION ERROR";
    }
  }

  async getAllMessages() {
    const messages = MessagesModel.find({});
    return messages;
  }

  async addMessage({ user, message }) {
    this.validateAddMessage(user, message);
    const messageCreate = await MessagesModel.create({
      user,
      message,
    });
    return messageCreate;
  }
}

export const messagesServices = new MessagesServices();
