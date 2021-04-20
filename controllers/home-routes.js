const { Post, Upload, User } = require("../models");
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

// router.get("/mush-room/:id", async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: [
//             'id',
//           ],
//         },
//       ],
//     });
//     console.log(postData);
//     if (!postData) {
//       res.status(404).json({ message: "No mushroom with this id!" });
//       return;
//     }
//     const mushroom = postData.get({ plain: true });
//     res.render("shroom", { mushroom, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.get('/mush-room/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'mushroom_name',
      'description',
      'url'
    ],
    include: [
      {
        model: User,
        attributes: ['id']
      }
    ]
  })
    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'User does not have nay posts!' });
        return;
      }
      const mushroom = postData.get({ plain: true });
      console.log(mushroom);
      res.render('shroom', { mushroom, loggedIn: req.session.loggedIn });


    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
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
