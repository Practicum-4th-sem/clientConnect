const app = require("./app");
const connectDb = require("./mongo/mongo");

const port = process.env.PORT || 5000;
connectDb();
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
