-- 1.
Use master;

-- 2. Vérifier si DB existe avant d'utiliser Alter Table pour couper les connexions
IF EXISTS (SELECT name FROM sys.databases WHERE name='TaskManager')
BEGIN 
    -- Fermer toutes les connexions actives
        ALTER DATABASE TaskManager SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    -- Supprimer la Database
        DROP DATABASE TaskManager;
END
GO

-- 3. Création DB
CREATE DATABASE TaskManager;
GO

USE TaskManager; 
GO

-- 4. Création des tables
CREATE TABLE 
    [User](
        [Id] UNIQUEIDENTIFIER,
        [Email] NVARCHAR(MAX) NOT NULL,
        [Password] VARBINARY(MAX) NOT NULL,
        CONSTRAINT PK_User Primary Key([Id]),
        CONSTRAINT UK_Email UNIQUE ([Email])
    );

CREATE TABLE 
    [Task](
        [Id] UNIQUEIDENTIFIER,
        [Title] NVARCHAR(MAX) NOT NULL,
        [IsDone] BIT NOT NULL,
        [User_Id] UNIQUEIDENTIFIER NOT NULL,
        CONSTRAINT PK_Task Primary Key([Id]),
        CONSTRAINT FK_Task_User Foreign Key(User_Id) References [User]([Id]) 
    );
