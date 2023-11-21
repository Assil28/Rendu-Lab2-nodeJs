//Importation des modules :
var http = require("http");
var data = require("./data/inventory");

//Création du serveur HTTP :
http.createServer(function(req, res) {

// Si l'URL de la requête est "/", le serveur renvoie l'ensemble des données d'inventaire au format JSON.   
if (req.url === "/") {
res.writeHead(200, {"Content-Type": "text/json"});
res.end(JSON.stringify(data));
} 

//Si l'URL est "/instock", la fonction listInStock est appelée pour filtrer les articles en stock et renvoyer le résultat au format JSON.
else if (req.url === "/instock") {
listInStock(res);
} 


//Si l'URL est "/onorder", la fonction listOnBackOrder est appelée pour filtrer les articles en commande et renvoyer le résultat au format JSON.
else if (req.url === "/onorder") {
listOnBackOrder(res);
} 

//Si l'URL ne correspond à aucune des routes spécifiées, le serveur renvoie une réponse 404 avec le message "Whoops... Data not found".
else {
res.writeHead(404, {"Content-Type": "text/plain"});
res.end("Whoops... Data not found");
}

}).listen(3000);


console.log("Server listening on port 3000");


//Fonctions auxiliaires pour filtrer les données
/*Ces fonctions utilisent la méthode filter pour 
filtrer les données d'inventaire en fonction de l'état 
d'approvisionnement ("In stock" ou "On back order") 
et renvoient le résultat au format JSON.*/

function listInStock(res) {
var inStock = data.filter(function(item) {
return item.avail === "In stock";
});

res.end(JSON.stringify(inStock));
}

function listOnBackOrder(res) {
var onOrder = data.filter(function(item) {
return item.avail === "On back order";
});
res.end(JSON.stringify(onOrder));
}