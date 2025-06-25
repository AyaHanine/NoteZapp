# NoteZapp - Prise de notes rapideAdd commentMore actions

NoteZapp est une application web permettant de créer, éditer, organiser et retrouver facilement ses notes au quotidien.

L’utilisateur peut ajouter des notes, les modifier ou les supprimer, les trier par date ou par titre, les mettre en favori, et les classer par catégories personnalisées. L’application propose également des filtres et une recherche rapide pour retrouver n’importe quelle note instantanément.

NoteZapp est conçue avec Vue.js 3 (Composition API) pour le front-end, Pinia pour la gestion d’état, et consomme une API REST pour stocker et manipuler les notes.
L’application offre une expérience fluide, moderne, et responsive.


## Fonctionnalités principales
- Ajouter, modifier, supprimer des notes.
- Mettre en favori ou retirer des favoris
- Trier et filtrer les notes (par date, favori, catégorie)
- Recherche en temps réel
- Gestion des catégories de notes
- Vue détaillée d’une note
- Interface responsive et design moderne

  
## Tâches à réaliser

- Initialiser le projet Vue.js avec Vue Router et Pinia
- Nettoyer la structure de base du projet
- Concevoir la structure de données d’une note et des catégories
- Créer une page d’accueil affichant la liste des notes
- Implémenter le système de filtres (favoris, catégories, recherche)
- Créer un formulaire pour ajouter/éditer une note (v-model)
- Créer un composant d’affichage individuel d’une note (NoteCard)
- Gérer la mise en favori d’une note
- Ajouter la navigation entre pages (liste, création/édition, détail)
- Mettre en place la gestion des catégories (ajout, suppression)
- Connecter l’application à l’API backend (récupération/envoi des notes)
- Synchroniser l’état local avec l’API via Pinia (CRUD)
- Gérer le style de l’application (responsive, agréable)
- (Optionnel) Ajouter un système de notifications/toasts
- (Optionnel) Gérer un “mode sombre”

## Configuration et lancement du projet

### Pré-requis
- [Node.js et npm](https://nodejs.org/) installés sur votre machine

---

##  Installation et lancement du front-end (Vue.js)

1. **Se placer dans le dossier frontend** :
    ```bash
    cd frontend
    ```

2. **Installer les dépendances** :
    ```bash
    npm install
    ```

3. **Lancer le serveur de développement** :
    ```bash
    npm run dev
    ```
    L’application Vue est accessible sur [http://localhost:5173](http://localhost:5173) (ou le port affiché dans le terminal).

---

##  Installation et lancement du back-end (JSON Server)

Le projet utilise [JSON Server](https://github.com/typicode/json-server) pour simuler une API REST à partir du fichier `db.json`.

1. **Se placer dans le dossier backend** :
    ```bash
    cd ../backend
    ```

2. **Installer les dépendances** :
    ```bash
    npm install
    ```

3. **Lancer le serveur JSON Server** :
    ```bash
    npx json-server --watch db.json --port 3001
    ```
    L’API REST est accessible sur [http://localhost:3001](http://localhost:3001).

    **Routes principales disponibles** :
    - `GET /notes` : liste des notes
    - `POST /notes` : ajouter une note
    - `PUT /notes/:id` : modifier une note
    - `DELETE /notes/:id` : supprimer une note
    - `GET /categories` : liste des catégories

---

##  Choix du backend

Pour le back-end, **JSON Server** a été choisi car il permet :
- De mettre en place une API REST complète en quelques minutes
- De respecter les conventions CRUD utilisées dans le développement moderne
- De simplifier le développement en équipe sans nécessiter de code serveur

Le fichier `db.json` sert de base de données et peut être adapté en fonction des besoins du projet.

---
