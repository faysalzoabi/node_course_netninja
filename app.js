const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');
const app = express();

//Connect to mongodb
const dbURI = "mongodb+srv://netninja:test1234@cluster0-omoj4.mongodb.net/note-tuts?retryWrites=true&w=majority"
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then((result) => app.listen(3000))
        .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

//listen for requests
// we dont want to listen to request until connection to db is established
// app.listen(3000);


// app.use((req, res, next) => {
//     console.log('new request made');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// })

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// } )


// app.get('all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })


// app.get('/single-blog', (req, res) => {
//     Blog.findById('5ef86f877dae705368db643c')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

app.get('/', (req, res) => {
    // res.send('<p>home page</p>');
    // res.sendFile('./views/index.html', {root: __dirname})
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet.' },
    //     {title: 'mario finds stars', snippet: 'Lorem ipsum dolor sit amet.' },
    //     {title: 'How to defeat browser', snippet: 'Lorem ipsum dolor sit amet' },
    // ]
    // res.render('index', {title: 'Home', blogs: blogs});
    res.redirect('/blogs');
});



// app.use((req, res, next) => {
//     console.log('in the next middleware');
//     next();
// })


app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
    // res.sendFile('./views/about.html', {root: __dirname});
    // res.send('<p>about page</p>')
}); 



// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// })

app.use('/blogs', blogRoutes);

//gonne fire if the request reach this point and didnt match the above
//if it didnt reach it wont fire
//use this function for every incoming request regardless of url if the code reach this point
//if nothing matches
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', {root: __dirname})
    res.status(404).render('404', {title: '404'});
})