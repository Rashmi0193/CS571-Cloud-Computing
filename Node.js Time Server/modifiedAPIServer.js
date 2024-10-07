//////////////////////////////////////////////////////
//
// Write an HTTP server that serves JSON data when it 
// receives a GET request to the path '/api/parsetime'. 
//

var http = require('http');
var url = require('url');

// Function to parse current time
function parseCurrentTime(time) {
  return {
    year: time.getFullYear(),
    month: String(time.getMonth() + 1).padStart(2, '0'), // Months are 0-based
    date: String(time.getDate()).padStart(2, '0'),
    hour: String(time.getHours()).padStart(2, '0'),
    minute: String(time.getMinutes()).padStart(2, '0')
  };
}
// Function to get UNIX time
function unixtime(time) {
  return { unixtime: time.getTime() };
}

// Create the server
var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true);
  var time = new Date(parsedUrl.query.iso);
  var result;

  // Handle /api/parsetime
  if (/^\/api\/parsetime/.test(req.url)) {
    result = parseCurrentTime(time);
  }
  // Handle /api/unixtime
  else if (/^\/api\/unixtime/.test(req.url)) {
    result = unixtime(time);
  }
else if (/^\/api\/currenttime/.test(req.url)) {
    var currentTime = new Date(); // Get the current time
    result = parseCurrentTime(currentTime); // Use the current time parsing fun>
  }

  // Send the JSON response
  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  } else {
    res.writeHead(404);
    res.end();
  }
});

// Listen on port provided by first argument
server.listen(Number(process.argv[2]));

