const connectToMongo = require("./db");
const express = require("express");

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));
app.use("/comments", require("./routes/comments"));
app.use("/vote", require("./routes/votes"));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
