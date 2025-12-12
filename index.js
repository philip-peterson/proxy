const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Parse the incoming request URL
  const parsedUrl = url.parse(req.url);
  
  // Target URL: google.com + the path from the request
  const targetUrl = `https://news.ycombinator.com${parsedUrl.path}`;
  
  console.log(`Proxying: ${req.url} -> ${targetUrl}`);
  
  // Parse target URL
  const target = url.parse(targetUrl);
  
  // Proxy options
  const options = {
    hostname: target.hostname,
    port: 443,
    path: target.path,
    method: req.method,
    headers: {
      ...req.headers,
      host: target.hostname // Override host header
    }
  };
  
  // Make the proxy request
  const proxyReq = https.request(options, (proxyRes) => {
    // Forward status code and headers
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    
    // Pipe the response back to the client
    proxyRes.pipe(res);
  });
  
  // Handle errors
  proxyReq.on('error', (err) => {
    console.error('Proxy error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Proxy error occurred');
  });
  
  // Pipe the request body to the proxy request
  req.pipe(proxyReq);
});

server.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Example: http://localhost:${PORT}/foo will proxy to https://google.com/foo`);
});
