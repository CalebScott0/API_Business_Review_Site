const server = require("./server");
const PORT = process.env.port || 8080;
require("dotenv").config();


server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
