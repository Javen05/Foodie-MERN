CREATE DATABASE  IF NOT EXISTS `foodiedb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `foodiedb`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: foodiedb
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `idCategory` int NOT NULL AUTO_INCREMENT,
  `idRestaurant` int NOT NULL,
  `category` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`idCategory`),
  KEY `categoryOfRestaurant_idx` (`idRestaurant`),
  CONSTRAINT `categoryOfRestaurant` FOREIGN KEY (`idRestaurant`) REFERENCES `restaurants` (`idRestaurant`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,1,'Chinese Hotpot'),(2,2,'Western'),(3,3,'Fast Food'),(4,4,'Western'),(5,5,'Thai Hotpot'),(6,6,'Indian'),(7,7,'Japanese'),(8,8,'Fast Food'),(9,1,'Good Food'),(10,1,'Premium'),(12,10,'Food'),(13,2,'Steak'),(14,3,'Halal'),(15,3,'Burger'),(16,4,'Affordable'),(17,6,'Prata'),(18,6,'Curry'),(19,7,'Sashimi'),(20,7,'Sushi'),(21,8,'Fried Chicken'),(22,11,'Pizza'),(23,12,'Sushi roll'),(31,15,'Mexican'),(32,12,'Salad'),(33,15,'Salad'),(34,15,'Wrap'),(35,15,'Burrito'),(36,10,'Very Very Long Category ajdnwudonuefawewf'),(37,10,'Pot'),(38,10,'                                                '),(39,10,'ok'),(40,10,'Nice'),(41,10,'Nice'),(42,10,'nice'),(43,10,'nice '),(44,10,'Nicer'),(47,10,'long generic text here'),(48,10,'Lorem epsum'),(49,10,'gdrgruofnuoewf'),(50,10,'afefewrerfewfewd'),(51,10,'efwfewgegge4geg'),(52,10,'Cool'),(53,10,'Steamboat'),(54,1,'Steamboat'),(55,5,'Steamboat');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-24 14:23:15
