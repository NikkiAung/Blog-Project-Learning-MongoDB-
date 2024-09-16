const express = require('express');
const Blog = require('../models/Blog');
const BlogController = require('../controllers/BlogController');
const router = express.Router();
router.get('', BlogController.index)

router.post('', BlogController.store)

router.get('/contact-us', (req,res)=> {
    res.render('contact', {
        title : "contact"
    })
})

router.get('/create', BlogController.create)

router.post('/:id/delete', BlogController.destroy)

router.get('/:id', BlogController.show)

module.exports = router;