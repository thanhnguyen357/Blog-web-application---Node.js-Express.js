import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

let posts = [];
let nextId = 1;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render("index", { posts });
});

app.get('/create', (req, res) => {
    res.render("create");
});

app.post('/create', (req, res) => {
    const {title, content} = req.body;
    const newPost = {
        id : nextId++,
        title,
        content
    };
    posts.push(newPost);
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    res.render("edit", { post });
});

app.post('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    const post = posts.find(p => p.id === id);

    if (post) {
        post.title = title;
        post.content = content;
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
