import { useEffect, useState } from 'react'

function App() {
  // status
  const [data, setData] = useState(null); //stockage des données
  const [isLoading, setIsLoading] = useState(true); //pour les chargements
  const [error, setError] = useState(null); //pour gestion des erreurs


  // comportement
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/artists');
        console.log(response);
        if (!response.ok) {
          throw new Error (`Erreur HTTP: ${response.status}`);
        }
        const items = await response.json();
        setData(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); //Tableau de dependance vide

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


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
      <button>click</button>
      <p>{JSON.stringify(data, null, 2)}</p>
    </main>

    <footer>
    </footer>
    </>
  )
}

export default App
