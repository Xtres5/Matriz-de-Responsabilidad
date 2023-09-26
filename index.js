import express from "express";

const app = express();

const PORT= process.env.PORT ?? 80;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("*", (req, res) => {
    res.redirect(301, '/');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`)); 