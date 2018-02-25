var path = require('path');
module.exports = function (app) {
  console.log("hello");
  app.get("/", function(req, res){
    console.log("home hit");
    res.sendFile(path.join(__dirname, "../public/html/titleScreen.html"))
  })

  app.get("/loginSignup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/loginSignup.html"))
  })




  app.get('*', function (req, res) {
    console.log(req.session.user)
    res.sendFile(path.join(__dirname, "../public/html/titleScreen.html"))
  })
}