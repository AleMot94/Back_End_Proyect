import express from "express";

export const routerViewChat = express.Router();

routerViewChat.get("/", (req, res) => {
  return res.render("chatSocket", {});
});
