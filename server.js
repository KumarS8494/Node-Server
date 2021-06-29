{ /****const http = require('http');

http.createServer((req, res) => {
    res.write('<html>')
    res.write('<head> <title> NodeJs App </title> </head>')
    res.write('<body> <h1> Hello Suman Ji</h1> </body>')
    res.write('</html>')
    res.end()
    //console.log(req);
}).listen(3002); ***/}

const fs = require('fs');

//Synchronous

const data = fs.readFileSync('./data.json', 'utf8')
console.log(data)

//asynchronous way

fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) return console.log(err);
    console.log(data)
})