const { Post, Upload } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  try {
    res.render("homepage", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/mush-room", async (req, res) => {
  const postData = await Post.findAll().catch((err) => {
    res.json(err);
  });
  const mushrooms = postData.map((mushroom) => mushroom.get({ plain: true }));
  res.render("mush-room", { mushrooms, loggedIn: req.session.loggedIn });
});

router.get("/mush-room/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    console.log(postData);
    if (!postData) {
      res.status(404).json({ message: "No mushroom with this id!" });
      return;
    }
    const mushroom = postData.get({ plain: true });
    res.render("shroom", { mushroom });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("login");
});

router.post("/upload", async (req, res) => {
  try {
    const uploadData = await Upload.create({
      latitude: req.body.lat,
      longitude: req.body.lon,
      url: req.body.url,
    });
    console.log("UPLOAD DATA: ", uploadData);
    res.status(200).json(uploadData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get("/upload", async (req, res) => {

  res.render("upload");
});
module.exports = router;
