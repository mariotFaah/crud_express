import { useEffect, useState } from 'react'

function App() {
  // status
  const [data, setData] = useState([]); //stockage des données
  const [isLoading, setIsLoading] = useState(true); //pour les chargements
  const [error, setError] = useState(null); //pour gestion des erreurs
  const [selectedArtistId, setSelectedArtistId] = useState(0);
  const [aiResult, setAiResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);


  // comportement
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/artists');
        console.log(response);
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const items = await response.json(); //json du endpoint

        console.log("Donnée : '", typeof items, "', contenu :", items);
        // console.log("Donne 1:", items[0]);
        setData(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); //Tableau de dependance vide

  if (isLoading) return <div>Loading...</div>; // affichage pendant le chargement
  if (error) return <div>Error: {error}</div>; // erreur de chargement

  // fonction pour interroger l'API AI
  async function askAI(artistId) {
    setAiResult('');
    setAiError(null);
    setAiLoading(true);
    try {
      const resp = await fetch('http://localhost:3000/api/artists/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artistId })
      });
      if (!resp.ok) throw new Error(`Erreur serveur: ${resp.status}`);
      const body = await resp.json(); // { result: 'texte généré' }
      setAiResult(body.result || JSON.stringify(body));
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  }

  // Changement de sélection d'artiste
  const handleChange = (event) => {
    setSelectedArtistId(event.target.value); // mise à jour de l'ID de l'artiste sélectionné
  }

  function artistList() {
    if (!data || data.length === 0) {
      return <p>Aucun artiste trouvé.</p>;
    }

    return (
      <div className='artist-selection'>
        <select name="artistId" id="artistId" value={selectedArtistId} onChange={handleChange}>
          {data.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.id}
              {artist.name}
            </option>
          ))}
        </select>

        <div className='artist-selection-list'> {/* affichage dynamique des résultats */}
          {console.log('Debug:', Object.values(data[selectedArtistId]))} {/* debug */}
          <div>
            {Object.values(data[selectedArtistId]).map((value, index) => (
              <div key={index}>
                <p>- {value}</p>
              </div>
            ))}
            <button>modify</button>
            <button>delete</button>
          </div>
        </div>
      </div>
    )
  }


  // rendu
  return (
    <>
      <header className='header'>
        <span>Logo</span>
        <nav>
          <a href="">acceuil</a>
          <a href="">Album</a>
          <a href="">À propos</a>
          <a href="">Contacts</a>
        </nav>
      </header>

      <main>
        <div className='main-artist'>
          {artistList()}

          {/* affichage globale */}
          {/* <p className='data-display'>{JSON.stringify(data, null, 2)}</p> */}
        </div>
      </main>

      <footer>
      </footer>
    </>
  )
}

export default App
