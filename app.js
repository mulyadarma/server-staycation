var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var multer = require("multer");
var upload = multer({ dest: "upload/" });

// connect method-override agar dpt melakukan update data
const methodOverride = require("method-override");

// agar memunculkan notifikasi saat melakukan CRUD
const session = require("express-session");
const flash = require("connect-flash");

// connect mongoose
const mongoose = require("mongoose");

// di dapat di web mongoose versi 5.9.7
// myapp adalah nama database bisa di liat di MongoDB Compass
// cara menjalankan MongoDB di terminal : brew services start mongodb-community@4.4
mongoose.connect(
  "mongodb+srv://sandy:sandystaycation@cluster0.nnpzsxs.mongodb.net/db_staycation?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// router admin
const adminRouter = require("./routes/admin");
const apiRouter = require("./routes/api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// menghubungkan file css dan js sb admin2 agar bisa terbaca
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

// mengunakan adminRouter
app.use("/admin", adminRouter);

// mengunakan apiRouter
app.use("/api/v1/member", apiRouter);

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
