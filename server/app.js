const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const mongoose = require("mongoose");
const dbParams = require("./config/db_config.js")
const schema = require("./schema/schema.js");

const app = express();

//connect mongodb database
mongoose.connect(`mongodb+srv://${dbParams.DB_USER}:${dbParams.DB_PASSWORD}@${dbParams.DB_CLUSTER}.ysops.mongodb.net/${dbParams.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once("open", ()=>{console.log("MongoDB connection done !");});

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000,()=>{console.log("server started at port 4000 !!")});