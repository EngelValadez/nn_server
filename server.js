var fs = require('fs'),
  path = require('path'),
  express = require('express'), // npm install express --save
  vhost = require('vhost'); // npm install vhost --save
var app = express();

app.get('/health', function(req, res) {
  res.writeHead(200);
  res.end();
});

var virtualHosts = JSON.parse(fs.readFileSync('vhosts.json', 'utf8'));
virtualHosts.forEach(function(virtualHost) {
  var virtualHostApp = express();
  virtualHostApp.use(express.static(path.join(__dirname, virtualHost.path)));
  app.use(vhost(virtualHost.domain, virtualHostApp));
});
app.listen(20);