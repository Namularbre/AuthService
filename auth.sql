CREATE DATABASE `auth` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

-- auth.users definition

CREATE TABLE `users` (
    `username` varchar(100) NOT NULL,
    `idUser` int(11) NOT NULL AUTO_INCREMENT,
    `password` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`idUser`),
    UNIQUE KEY `users_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- auth.sessions definition

CREATE TABLE `sessions` (
    `idSession` int(11) NOT NULL AUTO_INCREMENT,
    `idUser` int(11) DEFAULT NULL,
    `token` varchar(255) NOT NULL,
    `expirationDate` datetime NOT NULL,
    PRIMARY KEY (`idSession`),
    KEY `sessions_users_FK` (`idUser`),
    CONSTRAINT `sessions_users_FK` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
