const router = require("express").Router();
const { Post, Comment, User } = require("../models");

//TODO import models

// { User, Comment, Post }

// TODO: Import the custom middleware
const express = require("express");
const { authCheck } = require("./middleware/auth");

// TODO: route for homepage with all blog posts. NO LOGIN NEEDED.
router.get("/", async (req, res) => {
  try {
    const dbAllPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    console.log(dbAllPosts);

    const allPosts = dbAllPosts.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      allPosts,
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
    const dpPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["comment_text", ["created_at", "comment_created_at"]],
          include: [
            {
              model: User,
              attributes: [["username", "commenter"]],
            },
          ],
        },
      ],
    });
    // const dbPostComments = await Comment.findAll({
    //   where: {
    //     post_id: req.params.id,
    //   },
    //   attributes: ["comment_text", ["created_at", "commentCreatedAt"]],
    //   include: [
    //     {
    //       model: User,
    //       attributes: [["username", "commenter"]],
    //     },
    //   ],
    // });

    // const allComments = dbPostComments.map((post) => post.get({ plain: true }));
    const currentPost = dpPostData.get({ plain: true });
    console.log(currentPost);
    // console.log(allComments);
    res.render("postview", {
      currentPost,
      // allComments,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// TODO: create a user dashboard showing their posts and comments. Must be logged in.
router.get("/users/:id", authCheck, async (req, res) => {});

// login route logic
router.get("/login", (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect("/");
  //   return;
  // }

  res.render("login");
});

module.exports = router;
