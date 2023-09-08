const app = require("./app/app");

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


process.on("SIGINT", () => {
  console.info("SIGINT signal received.");
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
  });
});