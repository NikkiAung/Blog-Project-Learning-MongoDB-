const Blog = require('../models/Blog');

const BlogController = {
    index : async(req, res) => {
        let blogs = await Blog.find().sort({createdAt:-1});
    
        res.render('home', {
            blogs,
            title: 'home' 
        });
    },
    store : async (req, res) => {
        console.log(req.body);
        const {title, intro, body} = req.body;
      
        let blog = new Blog({
            title, 
            intro,
            body
        })
    
        await blog.save();
    
        res.redirect('/')
    },
    create: (req, res)=> {
        res.render('blogs/create',{
            title: 'Create'
        })
    },
    destroy : async (req, res, next) => {
        try {
            let id = req.params.id;
            await Blog.findByIdAndDelete(id);
            res.redirect('/')
        } catch (error) {
            console.log(error);
            next();
        }
    },
    show : async (req, res, next) => {
        try {
            let id = req.params.id;
            let blog = await Blog.findById(id);
            res.render('blogs/show.ejs',{
                blog,
                title: 'Blog Detail'
            });
        } catch (error) {
            console.log(error);
            next();
        }
    }
}



module.exports = BlogController;