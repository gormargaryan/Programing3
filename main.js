var express = require("express")
var app = express()

app.get("/name/:anun", function(req, res) {
   res.send("<h1>Hello " + req.params.anun + "!</h1>")
})
app.get("/name", function(req, res) {
   res.redirect("https://google.com/search?q=searchvalue")
})

app.listen(3000, function() {
   console.log("example is running on port 3000")
})