const { ApolloServer } = require("@apollo/server");
const mongoose = require("mongoose");
const config = require("./configs/config");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(config.MONGODB_URI);
    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB();

const app = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = app;
