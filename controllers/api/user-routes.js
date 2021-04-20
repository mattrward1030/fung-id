const router = require("express").Router();
const { request } = require("express");
const { User } = require("../../models");
const { Post } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const userdata = await User.findAll({
      include: { model: Post },
    });

    res.status(200).json(userdata);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//posts
router.post("/post", async (req, res) => {
  try {
    const postData = await Post.create({
      mushroom_name: req.body.mushroomName,
      description: req.body.description,
      url: req.body.url,
      latitude: req.body.lat,
      longitude: req.body.lon,
    });
    // req.session.save(() => {
    //   req.session.loggedIn = true;

    // });
    res.status(200).json(postData);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
