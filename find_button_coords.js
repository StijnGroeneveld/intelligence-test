const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const appjs = fs.readFileSync('app.js', 'utf8');

console.log("AppJS Edit Button HTML snippet:");
const lines = appjs.split('\n');
const startLine = 1639;
const endLine = 1648;
for(let i = startLine-1; i < endLine; i++) {
   console.log(lines[i]);
}
