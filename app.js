var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let dotenv = require("dotenv");
let cors = require("cors");
let bodyParser = require("body-parser");
const dbConnect = require("./config/dbConnection");

var indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let referencesRouter = require("./routes/references");
let brandsRouter = require("./routes/brands");
let buyerRouter = require("./routes/buyers");
let categoryRouter = require("./routes/categories");
let colorRouter = require("./routes/colors");
let decorationRouter = require("./routes/decorations");
let fabricFinishRouter = require("./routes/fabricFinishes");
let fabricRouter = require("./routes/fabrics");
let gsmRouter = require("./routes/gsm");
let knitTypeRouter = require("./routes/knitTypes");
let productTypesRouter = require("./routes/productTypes");
let lengthRouter = require("./routes/lengths");
let measurementChartRouter = require("./routes/measurementChart");
let neckRouter = require("./routes/necks");
let packingMethodRouter = require("./routes/packingMethod");
let printEmbRouter = require("./routes/printEmb");
let sizeRouter = require("./routes/sizes");
let sleeveRouter = require("./routes/sleeves");
let stitchDetailRouter = require("./routes/stitchDetails");
let styleRouter = require("./routes/style");
let productRouter = require("./routes/products");
let purchaseRouter = require("./routes/purchaseOrders");
let stockRouter = require("./routes/stocks");
let stockOutRouter = require("./routes/stockOut");
let reportRouter = require("./routes/reports");
let notificationRouter = require("./routes/notification");

dotenv.config();
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors()
  // {
  // origin: ['http://localhost:5173'],
  // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // credentials: true,
  // }
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/references", referencesRouter);
app.use("/brands", brandsRouter);
app.use("/buyers", buyerRouter);
app.use("/categories", categoryRouter);
app.use("/colors", colorRouter);
app.use("/decorations", decorationRouter);
app.use("/fabricFinishes", fabricFinishRouter);
app.use("/fabrics", fabricRouter);
app.use("/gsms", gsmRouter);
app.use("/knitTypes", knitTypeRouter);
app.use("/lengths", lengthRouter);
app.use("/mesurementCharts", measurementChartRouter);
app.use("/necks", neckRouter);
app.use("/productTypes", productTypesRouter);
app.use("/packingMethods", packingMethodRouter);
app.use("/printEmb", printEmbRouter);
app.use("/sizes", sizeRouter);
app.use("/sleeves", sleeveRouter);
app.use("/stitchDetails", stitchDetailRouter);
app.use("/styles", styleRouter);
app.use("/products", productRouter);
app.use("/purchases", purchaseRouter);
app.use("/stocks", stockRouter);
app.use("/stockOut", stockOutRouter);
app.use("/reports", reportRouter);
app.use("/notifications", notificationRouter);

// Test db connection
app.get('/test-db', async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.send('Database connection has been established successfully.');
  } catch (error) {
    res.status(500).send('Unable to connect to the database:', error);
  }
}); 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
