const express = require("express");
const mongodb = require("mongodb");
const dotenv = require("dotenv");
const path = require("path");

const router = express.Router();
dotenv.config({ path: path.resolve(__dirname, "../../../config/config.env") });

// Get Posts
router.get("/", async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add Post
router.post("/", async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date(),
    });
    res.status(201).send();
});

// Delete Post
router.delete("/:id", async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({
        _id: new mongodb.ObjectId(req.params.id),
    });
    res.status(200).send();
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(process.env.DB_URL);

    return client.db("test").collection("posts");
}

module.exports = router;
