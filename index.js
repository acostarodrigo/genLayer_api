require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const { myLogger } = require("./middleware/myLogger");

const whiteListed = process.env.SERVER_CORS_WHITELISTED.split(",");
const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (whiteListed.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(
        new Error(
          `Not allowed by CORS: ${origin}. Allowed sites are ${whiteListed}`
        )
      );
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(myLogger());

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(fileUpload());

// Public directory
app.use(express.static("public"));

// routes
app.use("/api/file", require("./routes/file"));

app.listen(process.env.PORT || process.env.SERVER_PORT, () => {
  console.log("Listening in port " + process.env.SERVER_PORT);
  console.log("CORS enabled for " + whiteListed.join(", "));
});
