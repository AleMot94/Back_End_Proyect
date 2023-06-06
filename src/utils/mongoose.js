import { connect } from "mongoose";
export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://alejandro1031m:UWj8WnywnULhodYx@ale-cluster0.cywkeum.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("plug to mongo");
  } catch (error) {
    console.log(error);
    throw "can not connect to the db";
  }
}
