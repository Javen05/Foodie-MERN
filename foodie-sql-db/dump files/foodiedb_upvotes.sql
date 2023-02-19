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
-- Table structure for table `upvotes`
--

DROP TABLE IF EXISTS `upvotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upvotes` (
  `idRestaurant` int NOT NULL,
  `idAccount` int NOT NULL,
  `idComment` int NOT NULL DEFAULT '0',
  `accountId` int NOT NULL,
  `vote` enum('L','D') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`idRestaurant`,`idAccount`,`accountId`,`idComment`),
  KEY `voteOnComment_idx` (`idComment`),
  KEY `votedByAccount_idx` (`accountId`),
  CONSTRAINT `votedByAccount` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`idAccount`) ON DELETE CASCADE,
  CONSTRAINT `voteOnComment` FOREIGN KEY (`idComment`) REFERENCES `comments` (`idComment`) ON DELETE CASCADE,
  CONSTRAINT `voteOnReview` FOREIGN KEY (`idRestaurant`, `idAccount`) REFERENCES `reviews` (`idRestaurant`, `idAccount`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upvotes`
--

LOCK TABLES `upvotes` WRITE;
/*!40000 ALTER TABLE `upvotes` DISABLE KEYS */;
INSERT INTO `upvotes` VALUES (1,1,0,1,'L'),(1,1,0,2,'L'),(1,1,0,3,'L'),(1,1,0,4,'L'),(1,1,0,9,'D'),(1,2,0,1,'L'),(1,2,0,2,'L'),(1,2,0,6,'L'),(1,2,0,9,'L'),(1,6,0,1,'D'),(1,6,0,2,'D'),(1,6,0,6,'D'),(1,6,0,9,'D'),(1,7,0,2,'D'),(1,7,0,6,'L'),(1,7,0,9,'D'),(1,9,0,1,'L'),(1,9,0,2,'L'),(1,9,0,6,'L'),(1,9,0,9,'L'),(2,1,0,1,'L'),(2,1,0,2,'L'),(2,1,0,3,'L'),(2,1,0,6,'L'),(2,2,0,2,'L'),(2,2,0,6,'L'),(2,6,0,1,'L'),(2,6,0,2,'L'),(2,6,0,6,'D'),(2,13,0,2,'L'),(2,13,0,6,'D'),(3,1,0,6,'D'),(3,1,0,49,'D'),(3,2,0,2,'L'),(3,2,0,6,'L'),(3,6,0,1,'L'),(3,6,0,49,'L'),(3,7,0,2,'L'),(3,11,0,2,'D'),(4,1,0,6,'D'),(4,2,0,2,'L'),(4,2,0,6,'L'),(4,9,0,6,'L'),(5,2,0,2,'D'),(5,3,0,2,'L'),(5,3,0,10,'L'),(5,3,0,13,'L'),(5,6,0,2,'D'),(5,6,0,10,'L'),(5,7,0,2,'L'),(5,7,0,6,'L'),(5,7,0,10,'L'),(5,9,0,10,'L'),(5,13,0,2,'L'),(5,13,0,13,'L'),(7,2,0,2,'L'),(7,6,0,2,'D'),(7,6,0,6,'D'),(7,12,0,2,'L'),(7,12,0,6,'L'),(7,12,0,12,'L'),(8,1,0,1,'L'),(8,6,0,1,'L'),(8,6,0,6,'L'),(8,49,0,1,'L'),(10,2,0,1,'D'),(10,13,0,1,'L'),(15,6,0,1,'L'),(15,6,0,6,'L');
/*!40000 ALTER TABLE `upvotes` ENABLE KEYS */;
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
