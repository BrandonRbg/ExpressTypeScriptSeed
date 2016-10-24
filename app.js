"use strict";
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var indexRoute = require("./routes/index");
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
        console.log("Started server!");
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "jade");
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(express.static(path.join(__dirname, "bower_components")));
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    };
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        var index = new indexRoute.Index();
        router.get("/", index.index.bind(index.index));
        router.post("/user", index.index.bind(index.index));
        this.app.use(router);
    };
    return Server;
}());
var server = Server.bootstrap();
module.exports = server.app;
