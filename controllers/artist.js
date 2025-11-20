const artistService = require("../services/artist");


function list(req, res){
 const artists = artistService.findAll();
 res.status(200).json(artists);
}


function read(req,res){
  const  artistId = req.params.id;
  const artist = artistService.find(artistId);
  if (artist){
    res.status(200).json(artist);
  }else {
    res.status(404).json({message: "artiste non trouvee"})
  }
}

function create(req, res){
  const datas = req.body
  const createdArtist = artistService.create(datas);
  if(createdArtist){
    res.status(201).json({message: 'artiste cree avec succes'});

  }else{
    res.status(400).json({message: 'erreur de creation'})
  }
}

function update(req, res){
  const artistId = req.params.id;
  const datas = req.body
  const updatedArtist = artistService.update(artistId, datas);
  if(updatedArtist){
     res.status(200).json({message: 'artiste modifiee'});
  }else {
    res.status(400).json({message: 'erreur de modification de l artiste'})
  }
}

function remove(req, res){
  const  artistId = req.params.id; 
  const removedArtist =  artistService.remove(artistId);
  if(removedArtist){
   res.status(200).json({message:'artiste effacer avec succes'});
  }else{
   res.status(400).json({message:'erreur de suppression de l\' artiste'});
  }
}


module.exports = {list, read, create, update, remove}


