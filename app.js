const express = require('express');
const app = express();

const {default: mongoose } = require('mongoose');
const db = require('./db');

const flash = require('connect-flash');
const handlebars = require('express-handlebars');
const path = require('path');
const session = require('express-session')
const passport = require('passport');


const movieController = require('./movieController')


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())



app.use(flash())
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null;
    next()
})


app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


mongoose.set('strictQuery', true)
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI).then(() => {
    console.log('Connected!!!')
}).catch((err) => {
    console.log("Error" + err)
})


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
    next();
})

app.get('/', (req, res) => {
    res.render('index')
})

app.use(movieController)



app.listen(process.env.PORT || 8088)