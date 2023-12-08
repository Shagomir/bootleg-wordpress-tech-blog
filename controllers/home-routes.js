const router = require("express").Router();

//TODO import models

// { User, Comment, Post }

// TODO: Import the custom middleware
const express = require("express");
const { authCheck } = require("./middleware/auth");

// TODO: route for homepage with all blog posts. NO LOGIN NEEDED. 
router.get("/", async (req, res) => {
  try {
    const dbGalleryData = await Gallery.findAll({
      include: [
        {
          model: Painting,
          attributes: ["filename", "description"],
        },
      ],
    });

    const galleries = dbGalleryData.map((gallery) =>
      gallery.get({ plain: true })
    );

    res.render("homepage", {
      galleries,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// TODO: get one post and the comments for it. ADD COMMENT ABILITY if logged in

router.get("/posts/:id", authCheck, async (req, res) => {

  try {
    const dbGalleryData = await Gallery.findByPk(req.params.id, {
      include: [
        {
          model: Painting,
          attributes: [
            "id",
            "title",
            "artist",
            "exhibition_date",
            "filename",
            "description",
          ],
        },
      ],
    });
    const gallery = dbGalleryData.get({ plain: true });
    res.render("gallery", { gallery, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// TODO: create a user dashboard showing their posts and comments. Must be logged in. 
router.get("/users/:id", authCheck, async (req, res) => { })

// login route logic
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
