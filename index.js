var path = require('path');
var hapi = require('hapi');
var inert = require('inert');
var vision = require('vision');

var server = new hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
    }
});

server.connection({ port: 3000 });

server.register(inert, function () {});

// Set public directory as root for static files
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      index: true
    }
  }
});

// Load JsRender library
var jsrender = require('jsrender');

server.register( vision , function (err) {

  if (err) {
    throw err;
  }

////////////////////////////////////////////////////////////////
// Set JsRender as the template engine for Hapi
  server.views({
    engines: { html: jsrender },
    relativeTo: __dirname,
    path: 'templates'
  });

  var data = {
		people: [
			{name: "Jim"}, 
			{name: "Pedro"}
		] 
	};

////////////////////////////////////////////////////////////////
// Render layout.html template as 'home page' using Hapi
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      // Render helloworld.html template
      console.log("context:",data);
      return reply.view('layout', data);
    }
  });
});

////////////////////////////////////////////////////////////////
server.start(function (err) {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
