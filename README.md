# CRUD MAINA KELY

## Pre-requis
Mila miinstalle express elah
```bash
npm install express
```
## Ireto avy ny endpoint

GET 'http://27.0.0.1:3000/api/artist/'

GET 'http://127.0.0.1:3000/api/artist/:id'

POST http://127.0.0.1:3000/api/artists

PUT http://127.0.0.1:3000/api/artists/:id

DELETE http://127.0.0.1:3000/api/artists/:id

Recuper tous les artistes :
```bash
curl http://127.0.0.1:3000/api/artists/

```

Recuperer un artiste specifique
```bash
curl -s http://127.0.0.1:3000/api/artists/2
```

Creer un artiste ramora favori
```bash
curl -s -X POST http://127.0.0.1:3000/api/artists   -H "Content-Type: application/json"   -d '{ 
    "name": "ramora favori",
    "country": "Madagascar",
    "genres": ["Salegy", "Afro"]
  }' | jq
```

modifier un artiste quelconque
```bash
curl -s -X PUT http://127.0.0.1:3000/api/artists/2   -H "Content-Type: application/json"   -d '{
    "name": "Maria Garcia Updated",
    "country": "Spain",
    "genres": ["Latin"]
  }' | jq
```

supprimer l'artiste 
```bash
curl -s -X DELETE http://127.0.0.1:3000/api/artists/4 | jq
```