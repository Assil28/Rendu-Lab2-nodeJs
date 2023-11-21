
//Importation du module http :
var http = require("http");

//Création du serveur HTTP :
/*Un serveur HTTP est créé en utilisant la fonction http.createServer. Cette fonction prend en argument une fonction de rappel qui sera exécutée 
chaque fois qu'une requête est reçue.*/
var server = http.createServer(function (req, res) {

//Gestion des requêtes et des réponses :

    //configure les en-têtes de la réponse avec le code de statut 200 (OK) et le type de contenu text/html.
    res.writeHead(200, { "Content-Type": "text/html" });

// envoie le contenu de la réponse au client. Dans ce cas, le contenu est une chaîne de texte HTML qui inclut des informations sur l'URL de la requête (req.url) et la méthode HTTP utilisée (req.method).
    res.end(`
<!DOCTYPE html>
<html>
<head>
<title>HTML Response</title>
</head>
<body>
<h1>Serving HTML Text</h1>
<p>${req.url}</p>
<p>${req.method}</p>
</body>
</html>
`);
});

//Démarrage du serveur :
server.listen(3000);
console.log("Server listening on port 3000");