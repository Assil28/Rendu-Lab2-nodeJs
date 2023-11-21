//Importation des modules :
var http = require("http");
var fs = require("fs");
var path = require("path");

//Création du serveur HTTP :
http.createServer(function (req, res) {

//Cette ligne affiche dans la console la méthode HTTP (GET, POST, etc.) et l'URL de la requête à chaque fois qu'une requête est reçue.
    console.log(`${req.method} request for ${req.url}`);

//Si l'URL de la requête est "/", le script lit le fichier "./public/index.html" en UTF-8 et renvoie son contenu en tant que réponse avec le type de contenu "text/html".
    if (req.url === "/") {
        fs.readFile("./public/index.html", "UTF-8", function (err, html) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });
    } 
    
//Si l'URL de la requête se termine par ".css", le script lit le fichier correspondant dans le répertoire "./public/", crée un flux de fichier et le renvoie en tant que réponse avec le type de contenu "text/css".
    else if (req.url.match(/.css$/)) {
        var cssPath = path.join(__dirname, 'public', req.url);
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, { "Content-Type": "text/css" });
        fileStream.pipe(res);
    }

 //Si l'URL de la requête se termine par ".jpg", le script lit le fichier correspondant dans le répertoire "./public/", crée un flux d'image et le renvoie en tant que réponse avec le type de contenu "image/jpeg".   
    else if (req.url.match(/.jpg$/)) {
        var imgPath = path.join(__dirname, 'public', req.url);
        var imgStream = fs.createReadStream(imgPath);
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        imgStream.pipe(res);
    } 

//Si l'URL de la requête ne correspond à aucun des cas précédents, le script renvoie une réponse 404 avec le type de contenu "text/plain" et le message "404 File Not Found".
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 File Not Found");
    }
}).listen(3000);
console.log("File server running on port 3000");