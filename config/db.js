const mongoose = require("mongoose");

const dburl = "mongodb+srv://pramodyamadushani:RPM20011229@cluster0.mjvpw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("strictQuery", true);

const connection = async () => {
    try {
        await mongoose.connect(dburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected~");
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
};

module.exports = connection;
