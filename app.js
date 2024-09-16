const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
const Blog = require('./models/Blog')
var expressLayouts = require('express-ejs-layouts');
const BlogRouter = require('./routes/blogRouter')
let mongoUrl = 'mongodb+srv://anandaooit:test1234@cluster0.xqj5t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const mongoose = require('mongoose');
mongoose.connect(mongoUrl).then(()=> {
    console.log('Connected to db');
    app.listen(3000, () => {
        console.log('Server starts listening on port 3000!')
    })
}).catch(e=> {
    console.log(e);
})


app.set('views', './views')
app.set('view engine', 'ejs')
app.use(expressLayouts);
app.set('layout', 'layouts/default');
app.use(express.static('public'))


app.get('/', async(req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : "about"
    });
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title : "contact"
    });
})

app.use('/blogs',BlogRouter);

app.use((req,res)=> {
    res.status(404).render('404', {
        title : '404 not found'
    });
})

