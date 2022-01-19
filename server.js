const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());





/// the GET and POST section/////
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});





app.use((req, res) => {
  res.status(404).end();
});

////End of GET and POST section/////



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});