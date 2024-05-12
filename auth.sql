CREATE DATABASE `auth` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `auth`;

-- auth.users definition

CREATE TABLE `users` (
    `username` varchar(100) NOT NULL,
    `idUser` int(11) NOT NULL AUTO_INCREMENT,
    `password` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`idUser`),
    UNIQUE KEY `users_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- auth.sessions definition

create table sessions
(
    idSession      int              auto_increment primary key,
    idUser         int              null,
    token          varchar(255)     not null,
    expirationDate datetime         not null,
    userLoggedOut  bit default b'0' not null,
    constraint sessions_users_FK
        foreign key (idUser) references users (idUser)
);
