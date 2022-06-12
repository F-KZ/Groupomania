-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--


/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,5,3,'Rejoignez la garde de nuit, la bas vous aurez une vrai valeur ! #gardeDeNuit','2021-09-08 15:12:29',NULL),(2,2,2,'Ca ressemble aux senzus niveau goût ? ','2021-09-08 15:13:06',NULL),(3,2,5,'Je peux demander à maitrer Kaio de nous téléporter aux bahamas ne t\'inquiète pas ! ;)\n','2021-09-08 15:13:30',NULL),(4,4,5,'L\'hiver à partir de quand ? à partir d\'aujourd\'hui ? parce que c\'est pas une science exacte ! ','2021-09-08 15:14:24',NULL),(5,4,2,'Une fois dame Séli en a fait une comme ça... je vous raconte pas la soirée !','2021-09-08 15:14:42',NULL);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  KEY `userId` (`userId`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,1,'Bonjour à tous !','Bonjour à tous, je vous souhaite la bienvenue sur Groupomania, je suis le modérateur de ce réseau, profitez de ses fonctionnalités en partageant des liens, des images ou des GIFS ! \n','','2021-09-08 15:00:27',NULL,'http://localhost:4200/images/1631106026758giphy.gif'),(2,3,'Mamamia','J\'ai essayé la dernière tarte de chez \"Jerry\'s elle est délicieuse ! ','','2021-09-08 15:03:24',NULL,'http://localhost:4200/images/1631106204055tarte-aux-myrtilles-alsace-recette-678x508.jpg'),(3,4,'On en a gros !','Des semaines que ça bouge pas ! On nous utilise trop souvent pour arriver à ses fins ! \nOn en a gros !','https://fr.wikiquote.org/wiki/Kaamelott/Perceval','2021-09-08 15:05:43',NULL,'http://localhost:4200/images/1631106343165200w.webp'),(4,2,'Cherche la 5ème boule','Bonjour je cherche la 5ème boule pour ressusciter encore une fois Krilin...\n','','2021-09-08 15:07:43',NULL,'http://localhost:4200/images/1631106462513téléchargement.jpg'),(5,5,'Attention...','L\'hiver vient. . .','','2021-09-08 15:11:51',NULL,'http://localhost:4200/images/1631106710704giphy (1).gif');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(70) NOT NULL,
  `bio` text,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `imageUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Admin','Groupomania','admin@hotmail.com','$2b$15$NvRkV7nhT//eyLLMlSwv0u9IzxcDAQAaX.fUk9W5ktsoYj.T/y/cS','Je suis l\'administrateur et le modérateur de ce réseau social. ',1,'http://localhost:4200/images/charlemagne.jpeg'),(2,'Steve','Rogers','captain@hotmail.com','$2b$15$wqEFkRBMCU0P5h.PNFDp5OYm9EUyAlgFYl7NGAeC6.ejqNAqeONxq','',0,'http://localhost:4200/images/captain.jpeg'),(3,'Charles','Xavier','charles.xavier@hotmail.com','$2b$15$xN2ayiztQojzZyBTj.ioNOJQTO93N0QTb7yrzzNbEw90rRvYElxPW','',0,'http://localhost:4200/images/charles.jpeg'),(4,'Anthony','Joshua','anthony.joshua@hotmail.com','$2b$15$SeuxQgJogIO1hMdKbyaGa.ibAkKZkwuvYiPmHSxZ1KOIqO5Or5zVa',' meilleur boxeur UK ',0,'http://localhost:4200/images/anthony.jpeg'),(5,'Maxime','Lasalle','maxime.lasalle@hotmail.com','$2b$15$8lbYK87w3EBkuA1nxRvcJu2qAclSFe7wPlp1TZb21ijvAhOIVXOpa','Directeur ressources humaines ',0,'http://localhost:4200/images/maxime.jpeg'),(6,'Harry','Potter','harry.potter@hotmail.com','$2b$15$nSFE/AoTn0VdQfVfNLfWv.DR0Wg2F2CfgPZnUi.IRmvdsA79F0Njq','',0,'http://localhost:4200/images/16311070351911200629-le-jeune-daniel-radcliffe-dans-harry-potter-a-l-ecole-des-sorciers.jpg'),(7,'Martin','Dupont','martin.dupont@hotmail.com','$2b$15$X2FYKuUmM81UamoTRT6SsOsk/aQyFKxZUINzBsZxWahO6SSkyeq6G',NULL,0,'http://localhost:4200/images/imageProfilDéfaut.png');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-08 16:40:14
