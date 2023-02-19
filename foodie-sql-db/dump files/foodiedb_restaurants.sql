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
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `idRestaurant` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `idAccount` int DEFAULT NULL,
  `menu` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`idRestaurant`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `idRestaurant_UNIQUE` (`idRestaurant`),
  KEY `restaurantAccount_idx` (`idAccount`),
  CONSTRAINT `restaurantAccount` FOREIGN KEY (`idAccount`) REFERENCES `accounts` (`idAccount`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'Hai Di Lao','A popular hot pot restaurant chain, known for its excellent service and food quality.',1,'HaiDiLao','2022-12-14'),(2,'Astons','A wide variety of quality and affordable western food for all.',1,'Astons','2022-12-14'),(3,'McDonalds','The most popular fast foodchain restaurant worldwide.',1,'McDonalds','2022-01-14'),(4,'Pepper Lunch','Pepper Lunch is the original Japanese D-I-Y Teppan restaurant, with over 350 stores in 15 countries all over the world. Pepper Lunch promises a dynamic and fresh culinary experience for everyone by presenting the novel concept of sizzling Steaks, Curry Rice, and not forgetting our signature Pepper Rice. All at affordable prices!',1,'PepperLunch','2022-12-14'),(5,'Mookata','Affordable Steamboat franchise',1,NULL,'2022-12-10'),(6,'Prata Wala','A place for indian delicacies',1,NULL,'2022-12-01'),(7,'Sushi Teh','Known for japanese cuisine like sashimi and sushi',1,NULL,'2022-12-14'),(8,'Popeyes','Mouth-watering crunch and juicy fried chicken bursting with Louisiana flavor, since 1972.',1,NULL,'2022-01-20'),(10,'Example of Restaurant with very long name','Test',1,NULL,'2022-12-26'),(11,'Pizza Hut','Pizza Hut is an American multinational restaurant chain and international franchise founded in 1958 in Wichita, Kansas by Dan and Frank Carney',2,'PizzaHut','2022-12-25'),(12,'Makisan','The Maki-San brand is one of the most famous in Singapore, punching well above its weight since its first outlet opened at The Cathay in 2012. Now with over 20 outlets island wide, it\'s definitely the go-to place for consumers looking for something more than just the average sushi or salad.',2,'Makisan','2022-12-26'),(15,'Stuff\'d','Founded in 2014 by CEO Adrian Ang, they’ve got a deliberate focus on healthiness. We serve fresh-made kebabs, burritos, salads, and bowls that are both delicious for you.',2,'Stuffd','2022-12-26');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-24 14:23:16
