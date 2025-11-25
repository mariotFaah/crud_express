const artistService = require("../services/artist");


function list(req, res) {
  const artists = artistService.findAll();
  res.status(200).json(artists);
}


function read(req, res) {
  const artistId = req.params.id;
  const artist = artistService.find(artistId);
  if (artist) {
    res.status(200).json(artist);
  } else {
    res.status(404).json({ message: "artiste non trouvee" })
  }
}

function create(req, res) {
  const datas = req.body
  const createdArtist = artistService.create(datas);
  if (createdArtist) {
    res.status(201).json({ message: 'artiste cree avec succes' });

  } else {
    res.status(400).json({ message: 'erreur de creation' })
  }
}

function update(req, res) {
  const artistId = req.params.id;
  const datas = req.body
  const updatedArtist = artistService.update(artistId, datas);
  if (updatedArtist) {
    res.status(200).json({ message: 'artiste modifiee' });
  } else {
    res.status(400).json({ message: 'erreur de modification de l artiste' })
  }
}

function remove(req, res) {
  const artistId = req.params.id;
  const removedArtist = artistService.remove(artistId);
  if (removedArtist) {
    res.status(200).json({ message: 'artiste effacer avec succes' });
  } else {
    res.status(400).json({ message: 'erreur de suppression de l\' artiste' });
  }
}

// fonction pour suggérer des informations sur un artiste via l'API OpenAI
async function suggest(req, res) {
  try {
    const { artistId, prompt } = req.body || {}; // artistId optionnel
    const artist = artistId ? artistService.find(artistId) : null;

    const userPrompt = prompt || 'Donne une courte description de l artiste, propose 3 titres ou idées de playlists adaptées.';
    let fullPrompt = userPrompt;
    if (artist) {
      const genres = Array.isArray(artist.genres) ? artist.genres.join(', ') : (artist.genres || 'Inconnu');
      fullPrompt = `Voici l'artiste : ${artist.name} (${artist.country}). Genres: ${genres}. ${userPrompt}`;
    }

    // check API key
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY non configurée sur le serveur' });
    }

    const OpenAI = require('openai');
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: fullPrompt }],
      max_tokens: 400,
    });

    const text = completion?.choices?.[0]?.message?.content || completion?.choices?.[0]?.text || '';
    return res.status(200).json({ result: text });
  } catch (err) {
    console.error('AI suggest error:', err);
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { list, read, create, update, remove, suggest }