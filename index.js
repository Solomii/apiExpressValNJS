require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = require("./app");

app.listen(PORT, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server started on :${PORT}`);
});