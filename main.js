const express = require('express');
const gtts = require('gtts.js').gTTS;
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine',"ejs");

app.get('/',(req,res)=>{
    res.render('index.ejs');
});

app.post('/',(req,res) => {
    var text = req.body.text;   //in ejs file the name in textarea is text
    const speech = new gtts(text)
    speech.save("output.mp3")
    .then(()=>{
        res.download("output.mp3");
    }).catch((err)=>{
        console.log("error occured")
    })
})

var port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})