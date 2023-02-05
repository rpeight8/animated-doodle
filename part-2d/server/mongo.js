const mongoose = require("mongoose");

const MONGO_URI = `mongodb+srv://${process.argv[2]}:${process.argv[3]}@cluster0.btspzny.mongodb.net/phoneBookDB?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    console.log(MONGO_URI);
    const connection = await mongoose.connect(MONGO_URI, {});
    console.log(`MongoDB Connected: ${connection.connection.host}`);

    const PersonSchema = new mongoose.Schema({
      name: String,
      number: String,
    });

    const Person = mongoose.model("Person", PersonSchema);

    const newPerson = new Person({
      name: process.argv[4],
      number: process.argv[5],
    });

    newPerson.save().then((result) => {
      console.log(`added ${result.name} number ${result.number} to phonebook`);
      mongoose.connection.close();
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB();
