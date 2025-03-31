#Demo 04 - Database
Création d'une Api sécurisée

1. Création du projet

```bash
    npm init -y

```

2. Installation des dépendances

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

3. Création d'un fichier '.gitignore'

```bash
    npx gitignore node

```

4. Création du fichier .env

```
    # Configurations Server
    PORT=3000 
    NODE_ENV=development 

    # Configurations DB
    DB_USER=user01
    DB_PASSWORD=Test1234=
    DB_SERVER=localhost 
    DB_NAME=TaskManager 
    DB_ENCRYPT=false 
    DB_TRUST_SERVER_CERTIFICATE=true 

    # Config JWT (json web token): Clés secrète token + date expiration
    JWT_SECRET=MacleSecrete 
    JWT_EXPIRE_IN=86400 
```

5. Créer un script pour lancer le projet en tenant compte de l'environnement dans .env

```bash
    "start":"node --env-file=.env --watch src/app.js",
```

6. Création du user01 dans SSMS

Dans Databases, connection/logins: click droit et new login
- Général
    - user01
    - SqlServer Authentication
    - Mdp: Test1234=
    - Décocher 3 puis 2
- Server roles
    Cocher le sysadmin
Dans l'idéal il faudrait donner les différents accès en lecture ou en écriture au user, pour quelles DB,...

