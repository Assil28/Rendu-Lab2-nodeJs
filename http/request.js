//Importation des modules
var https = require("https");
var fs = require("fs");


//Options de la requête HTTPS :
/*Le script va interroger le serveur Wikipedia à l'adresse "en.wikipedia.org"
 sur le port 443 (par défaut pour les connexions HTTPS) en utilisant la méthode HTTP GET pour récupérer la page sur "George_Washington".*/
var options = {
    hostname: "en.wikipedia.org",
    port: 443,
    path: "/wiki/George_Washington",
    method: "GET"
};

//Création de la requête HTTPS
var req = https.request(options, function (res) {
    var responseBody = "";
    console.log("Response from server started.");
    console.log(`Server Status: ${res.statusCode} `);
    console.log("Response Headers: %j", res.headers);

    //Gestion de la réponse du serveur :

    //la réponse du serveur doit être interprétée comme une chaîne de caractères en UTF-8
    res.setEncoding("UTF-8");

    //est utilisé pour afficher une partie des données reçues dès qu'elles commencent à arriver
    res.once("data", function (chunk) {
        console.log(chunk);
    })
    ;

//est appelé chaque fois qu'un morceau de données est reçu, et il concatène ces morceaux dans la variable responseBody.
    res.on("data", function (chunk) {
        console.log(`--chunk-- ${chunk.length}`);
        responseBody += chunk;
    });

//est appelé lorsque la réponse est entièrement reçue. À ce stade, le contenu total de la page est stocké dans responseBody.
    res.on("end", function () {

     //Écriture du contenu dans un fichier local :   
        fs.writeFile("george-washington.html", responseBody, function (err) {
            if (err) {
                throw err;
            }
            console.log("File Downloaded");
        });
    });
}
);

//Gestion des erreurs de la requête HTTPS :
req.on("error", function (err) {
    console.log(`problem with request: ${err.message}`);
});

//Fin de la requête HTTPS :
req.end();
