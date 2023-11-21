//Importation des modules :
var http = require("http");
var fs = require("fs");

//Création du serveur HTTP :
http.createServer(function (req, res) {

//Gestion des requêtes GET et POST :

  //Si la méthode de la requête est GET, le serveur renvoie le contenu du formulaire HTML au client en utilisant fs.createReadStream pour lire le fichier "./public/form.html" et le pipe vers la réponse (res).
    if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream("./public/form.html", "UTF-8").pipe(res);
    } 
    
  //Si la méthode de la requête est POST, le serveur commence à collecter les données du corps de la requête.
    else if (req.method === "POST") {

    /*Lorsque des données sont reçues dans le corps de la 
    requête POST, la fonction de rappel associée
     à l'événement "data" est appelée à plusieurs reprises,
      et elle concatène les morceaux de données dans la variable body.
       Lorsque la fin de la requête est atteinte (événement "end"), 
       la logique de traitement des données POST est déclenchée.*/
        var body = "";
        req.on("data", function (chunk) {
            body += chunk;
        });
        req.on("end", function () {
            
            /* Après avoir collecté toutes les données POST, le serveur renvoie une réponse au client avec le code de statut 200 (OK), 
            le type de contenu "text/html", 
            et le corps de la réponse contenant les résultats du formulaire, 
            qui dans ce cas sont simplement les données POST affichées.  */
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`
<!DOCTYPE html>
<html>
<head>
<title>Form Results</title>
</head>
<body>
<h1>Your Form Results</h1>
<p>${body}</p>
</body>
</html>
`);
        });
    }
}).listen(3000);
console.log("Form server listening on port 3000");