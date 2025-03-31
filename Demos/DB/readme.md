#Demo 04 - Database
Création d'une Api sécurisée

1. Installation des dépendances

```bash
npm install express mssql uuid bcrypt jsonwebtoken cors

```

Ces dépendances incluent:
- 'express': Framework pour construire des applications web
- 'mssql': Librairie pour se connecter à une DB SqlServer
- 'uuid' : Générer des id uniques
- 'bcrypt' : Permet de hasher les mdp
- 'jsonwebtoken' : Génrer et vérifier les tokens JWT
- 'cors' : Middleware pour gérer les requêtes Cross-origins

2. Création d'un fichier '.gitignore'

```bash
npx gitignore node

```

3. 