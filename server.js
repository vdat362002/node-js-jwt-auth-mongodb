const app = require("./app/app");

// set port, listen for requests
const port  = process.env.PORT || 8080;
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

process.on("SIGINT", () => {
  console.info("SIGINT signal received.");
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
  });
});