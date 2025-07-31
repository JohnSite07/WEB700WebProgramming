const LegoData = require("./modules/legoSets");
const legoData = new LegoData();
const express = require('express');
const app = express();
const path = require('path')

// Static middleware for serving public files
app.use(express.static(__dirname + '/public'));

const HTTP_PORT = process.env.PORT || 8080;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Add urlencoded middleware
app.use(express.urlencoded({ extended: true}))

// Update routes to use res.render instead of res.sendFile
app.get('/', (req, res) => {
    res.render('home');
});

app.get('about', (req, res) => {
    res.render('about');
});

app.get('/lego/addSet', (req, res) => {
    legoData.getAllThemes()
        .then(themes => {
            res.render('addSet', { themes});
        })
        .catch(err => {
            res.status(500).render('addSet', { themes: [] });
        });
});

app.post('lego/addSet', async (req, res) => {
    try {
        let foundTheme = await legoData.getThemeById(req.body.theme_id);
        req.body.theme = foundTheme.name;
        await legoData.addSet(req.body);
        res.redirect('/lego/sets');

    } catch (error) {
        res.status(422).render('addSet', { themes: await legoData.getAllThemes(), error: err});
    }
});

legoData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("Server started...")
        });
    })
    .catch((err) => {
        console.log(`Initialization failed: ${err}`);
    });

app.get("/lego/sets", (req, res) => {
    if (req.query.theme) {
        legoData.getSetsByTheme(req.query.theme)
        .then(data => {
            res.render('sets', { sets: data});
        })
        .catch(err => {
            res.status(404).render('404');
        });
    }
});

app.get('lego/sets/:set_num', (req, res) => {
    legoData.getSetByNum(req.params.set_num)
        .then(data => {
            res.render('set', { set: data});
        })
        .catch(err => {
            res.status(404).render('404');
        });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404');
});