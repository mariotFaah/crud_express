const { loadData, saveData, validateData } = require("../utils/dataManager");

const filename ="artists";

let artists = loadData(filename);
function findAll(){ 
  return artists;
};

function find(id) { 
  return artists.find((artist) => artist.id === parseInt(id));
}

function create(newArtist) { 
  if(!validateData(newArtist, ['name', 'country', 'genres'])) return false; 
  const id = artists.length > 0 ? artists[artists.length -1].id + 1 : 1;
  const artist = { id, ...newArtist};
  artists.push(artist);
  saveData(filename, artists);
  return artist;
}



function update(id, updatedArtist) {
  // Vérifie les clés requises
  if (!validateData(updatedArtist, ["name", "country", "genres"])) return false;

  // Charge les artistes
  const artists = loadData("artists") || [];

  // Cherche l’artiste à modifier
  const index = artists.findIndex(a => a.id === parseInt(id));
  if (index === -1) return false; // artiste non trouvé

  // Met à jour l’artiste
  artists[index] = { id: parseInt(id), ...updatedArtist };

  // Sauvegarde
  saveData("artists", artists);

  return artists[index];
}



function remove(id) { 
  const index = artists.findIndex(artist => artist.id === parseInt(id));
  if(index === -1) return false;
  artists.splice(index, 1);
  saveData(filename, artists);
  return true
}

module.exports = { findAll, find, create, update, remove };
