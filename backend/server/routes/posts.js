const express = require('express')
const _ = require('underscore')
let { verifyToken, verifyAdmin } = require('../middlewares/authentication')
let app = express()

let Post = require('../models/post')

// Get all Posts
app.get('/posts', (req, res) => {
    Post.find({state: true})
        .sort('date')
        .populate('creator', 'name email')
        .exec((err, posts) => {
            if (err){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                posts
            })
        })
})

// Create new Post
app.post('/posts', [verifyToken], (req, res) => {
    let body = req.body
    let post = new Post({
        title: body.title,
        date: body.date,
        body: body.body,
        creator: req.user._id
        // subject: asd
    })

    post.save((err, postDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            post: postDB
        })
    })
})

// Update Post values
app.put('/posts/:id', [verifyToken], (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['title', 'votes', 'favs']);
    if (body.votes){
        body["meta.votes"] = body.votes
        delete body.votes
    }
    if (body.favs){
        body["meta.favs"] = body.favs
        delete body.favs
    }

    console.log(body);

    Post.findByIdAndUpdate(
        id,
        body,
        {new: true, runValidators: true,  context: 'query'},
        (err, postDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!postDB){
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `Post with id ${id} not found`
                    }
                })
            }

            res.json({
                ok: true,
                post: postDB
            })
        }
    )
})

// Delete Post
app.delete('/posts/:id', [verifyToken], (req, res) => {
    let id = req.params.id

    Post.findByIdAndUpdate(id, {state: false}, {new: true}, (err, postDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!postDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: `Post with id ${id} not found`
                }
            })
        }

        res.json({
            ok: true,
            message: `Post with id ${id} deleted`,
            post: postDB
        })
    })
})

module.exports = app
