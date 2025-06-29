# 📝 Cahier des Charges — Application de Prise de Notes « NoteZapp »

---

## Présentation du projet

**NoteZapp** est une application web de prise de notes moderne pensée pour l’organisation personnelle.  
Elle permet la création, l’organisation, la catégorisation et la gestion de notes de différents types (simples, tâches, agenda), le tout dans une interface élégante et responsive.

---

## Fonctionnalités attendues

#### Authentification
🚫 *Logique non encore mise en place*

### Gestion des notes

#### Création de notes 
- **Catégories** disponibles à la création :
  - **Journal**, **Document**, **ClassNotes**, **Thoughts**    ✅ *Déjà fait*
    
    ➡️ *Création et affichage déjà mis en place* (**modification non encore réalisée**)
  - **TaskList**  
    ➡️ *Ajout spécifique d’une checklist (liste de tâches à cocher).*
    
    *L’affichage doit proposer une présentation adaptée à une todo-list, distincte des autres notes.*  🚫 *Pas encore réalisée*
  - **Planner**  
    ➡️ *Ajout spécifique d’un événement à planifier (calendrier).* 🚫 *Pas encore réalisée*
    
    *L’affichage doit ressembler à un agenda ou une liste d’événements, différent des autres notes.*
    
- **Titre** obligatoire
- **Contenu** (éditeur riche)
- **Tags** facultatifs
- **Date** : générée automatiquement à la création

Actuellement, lors de la création d’une note, l’utilisateur saisit d’abord le contenu puis choisit la catégorie. Pour la suite, il serait préférable de sélectionner la catégorie en premier, afin d’adapter dynamiquement le formulaire à l’affichage spécifique des TaskList et Planner.

#### Affichage des notes
- Vue par **catégorie**  ✅ *Déjà fait*
  *Chaque catégorie aura son propre affichage (notamment pour TaskList & Planner qui auront une vue différente des autres notes).* 🚫 *Pas encore réalisée*
- Vue **corbeille** : Les notes qui sont supprimées, et c'est ici ou on peut soit les supprimer definitivement soit les récupérer. ✅ *Déjà fait*
- Vue **favoris** : Les notes mises en favoris. ✅ *Déjà fait*
- Vue **toutes notes** ✅ *Déjà fait*
- Affichage des tags sur les cartes ✅ *Déjà fait*

#### Modification
- Modification des notes  
  🚫 *Pas encore réalisée* pour toutes les catégories

#### Suppression
- **Suppression douce** (passage en corbeille)  
  ✅ *Déjà fait*
- **Restauration** depuis la corbeille 🚫 *Pas encore réalisée*
- **Suppression définitive** 🚫  *Pas encore réalisée*

---

### Favoris
- Ajout/Suppression d’une note aux favoris via une étoile en haut à droite de la note ✅ *Déjà fait*
- Filtrage des notes favorites dans une vue dédiée ✅ *Déjà fait*

---

### Tags
- Ajout de tags libres à la création/modification ✅ *Déjà fait*
- Affichage des tags sur les cartes de notes ✅ *Déjà fait*

---

### ScratchPad
- Bloc de prise de notes rapide  
  🚫 *Logique non encore mise en place*

---

### Recherche 🚫 *Pas encore réalisée*
- Recherche avancée dans la barre de recherche par :
  - Mot-clé (texte du contenu)
  - Titre
  - Tag
  - Catégorie

---

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

## Présentation de l'état d'avancement du site actuel
### La landing page

accessible depuis : http://localhost:5173/
![image](https://github.com/user-attachments/assets/b10e2c6b-c345-41bd-b2ec-8fe992a7735f)

### Espace utilisateur
accessible en cliquant sur le bouton essayer du header ou commencer gratuitement via le lien : http://localhost:5173/user-home
![image](https://github.com/user-attachments/assets/a9b610e2-6a1d-4670-9f7a-b2608a0b4a1d)

### Page d'ajout de note
accessible en clique sur nouvelle note du sidebar via le lien : http://localhost:5173/user-home
![image](https://github.com/user-attachments/assets/8e175bf3-02d9-4da1-8137-4a321c7d6499)

Plusieurs modifs sont à prévoir pour cette page, notamment l'affichage de l'editeur de text etc.

---

  ## Tâches à réaliser

1. **Authentification**(en cours par Meryem)  
   L’utilisateur clique sur « Commencer gratuitement » et est redirigé vers la page d’authentification. Une fois authentifié, il accède à son espace personnel pour gérer ses notes.

2. **Gestion des TaskList**  ✅ *Déjà fait*
   Une des catégories de notes proposées est la TaskList, présentée sous forme de To-Do List. Lors de la création, l’utilisateur saisit les tâches à réaliser. Après ajout, la TaskList doit s’afficher différemment des autres notes, en format checklist interactive (avec possibilité de cocher/décocher chaque tâche).  
   > *Pour l’instant, l’affichage est statique.*  
   ![image](https://github.com/user-attachments/assets/1a72e8ac-3ce2-4897-a219-8489a88dde18)

3. **Gestion des Planners**  
   Le Planner est une catégorie de note sous forme de calendrier. À la création, l’utilisateur peut ajouter des événements (réunions, voyages, examens…). L’affichage doit être un calendrier interactif, distinct des autres types de notes, permettant de consulter ses événements.  
   > *Respecter le thème du site pour l’affichage.*  
   ![image](https://github.com/user-attachments/assets/ed579b37-3708-45b8-9842-ae6ff7b67386)

4. **Modification des notes**
   Permettre la modification d’une note via l’icône dédiée sur la NoteCard.

6.  **Affichage d’une note**
   
   Permettre l’affichage détaillé d’une note au clic.

8.  **Suppression définitive des notes** ✅ *Déjà fait*
   
   Actuellement, seule la suppression douce (déplacement en corbeille) est implémentée. Il faudra permettre la suppression définitive d’une note depuis la corbeille (action irréversible).

10.  **Restauration de notes depuis la corbeille** ✅ *Déjà fait*
    
   Permettre la récupération d’une note supprimée depuis la corbeille.

12. **Suppression automatique après délai**  ✅ *Déjà fait*
   Mettre en place un timer : après 14 jours en corbeille, une note est supprimée définitivement si elle n’a pas été restaurée.

13. **Recherche de notes**  ✅ *Déjà fait*
   Ajouter une barre de recherche permettant de filtrer les notes par :
   - Titre
   - Tags
   - Mots-clés présents dans le contenu

11. **Gestion des notes épinglées**  ✅ *Déjà fait*
    Permettre d’épingler une note grâce à l’icône « pin » sur la NoteCard. Les notes épinglées sont affichées en priorité.

12. **ScratchPad**  
    Implémenter et intégrer la logique du scratchpad.






