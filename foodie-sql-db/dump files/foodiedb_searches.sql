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
-- Table structure for table `searches`
--

DROP TABLE IF EXISTS `searches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `searches` (
  `idSearch` int NOT NULL AUTO_INCREMENT,
  `idAccount` int DEFAULT NULL,
  `searchQuery` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`idSearch`),
  KEY `searchByAccount_idx` (`idAccount`),
  CONSTRAINT `searchByAccount` FOREIGN KEY (`idAccount`) REFERENCES `accounts` (`idAccount`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=1014 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `searches`
--

LOCK TABLES `searches` WRITE;
/*!40000 ALTER TABLE `searches` DISABLE KEYS */;
INSERT INTO `searches` VALUES (921,1,'hotpot','2022-12-20 07:49:08'),(922,6,'pepper','2022-12-20 12:17:26'),(923,10,'eston','2022-12-26 03:32:14'),(924,10,'aston','2022-12-26 03:32:27'),(925,10,'peper lunch','2022-12-26 03:32:40'),(926,6,'aston','2022-12-26 05:24:28'),(927,6,'astons','2022-12-26 05:24:57'),(928,6,'aston','2022-12-26 05:25:08'),(929,10,'mcdonalds','2022-12-28 01:34:35'),(930,10,'pepper lunch','2022-12-28 01:34:40'),(931,10,'ASTON','2022-12-28 01:41:36'),(932,10,'pepper lunch','2022-12-28 01:42:47'),(933,10,'pepper lunch','2022-12-28 01:43:46'),(934,10,'astons','2022-12-28 01:47:23'),(935,10,'astom','2022-12-28 01:47:34'),(936,10,'aston','2022-12-28 01:49:40'),(937,10,'mcdonal','2022-12-28 01:50:14'),(938,10,'PEPPER','2022-12-28 01:50:24'),(939,10,'PEPPER LUNCH','2022-12-28 01:50:28'),(940,10,'PEPPER LUNCH','2022-12-28 01:51:10'),(941,10,'ice cream','2022-12-28 01:56:29'),(942,2,'John','2022-12-28 05:33:44'),(943,2,'Pepper Lunch','2022-12-28 05:37:20'),(944,2,'J','2022-12-28 05:43:07'),(945,2,'hai','2022-12-28 05:46:36'),(946,2,'hai di lao','2022-12-28 05:46:48'),(947,2,'sdawd','2022-12-28 05:51:25'),(948,2,'lao','2022-12-28 05:52:29'),(949,2,'HAI DI LAO','2022-12-28 05:55:50'),(950,2,'HAI DI LAO','2022-12-28 05:57:35'),(951,2,'BLA','2022-12-28 06:02:13'),(952,2,'mala','2022-12-28 06:14:13'),(965,2,'rubbish','2022-12-28 06:14:13'),(966,1,'rubbish','2022-12-28 06:14:13'),(967,4,'mala','2022-12-28 06:14:13'),(968,11,'rubbish','2022-12-28 06:14:13'),(969,6,'rubbish','2022-12-28 06:14:13'),(970,7,'KFC','2022-12-28 06:14:13'),(971,13,'western','2022-12-28 07:00:38'),(972,13,'sda','2022-12-28 09:23:53'),(973,13,'h','2022-12-28 09:24:02'),(974,2,'John','2022-12-28 10:29:56'),(975,2,'hi','2022-12-28 10:32:07'),(976,2,'pizza','2022-12-28 10:34:00'),(977,2,'pizza','2022-12-28 10:39:26'),(978,6,'mcdon','2023-01-01 07:55:23'),(979,6,'sushe','2023-01-01 08:00:19'),(980,6,'resterant','2023-01-01 08:00:27'),(981,6,'eston','2023-01-01 08:00:33'),(982,6,'makiisan','2023-01-01 08:00:42'),(983,2,'maki','2023-01-02 02:43:05'),(984,2,'\\','2023-01-02 02:43:11'),(985,2,'\\','2023-01-02 02:43:11'),(986,6,'ast','2023-01-02 05:53:25'),(987,6,'makiis','2023-01-02 05:53:35'),(988,6,'makiisan','2023-01-02 05:53:38'),(989,1,'popeye','2023-01-02 07:24:47'),(990,1,'makii','2023-01-04 03:23:01'),(991,1,'makiisan','2023-01-04 03:23:04'),(992,1,'ast','2023-01-04 03:23:51'),(993,1,'ton','2023-01-04 03:24:02'),(994,2,'di','2023-01-07 09:26:00'),(995,1,'hai','2023-01-09 11:22:14'),(996,1,'hai di','2023-01-09 11:22:57'),(997,1,'hai di','2023-01-09 11:24:26'),(998,1,'p','2023-01-09 11:24:35'),(999,49,'peper lunch','2023-01-16 03:21:58'),(1000,49,'peper','2023-01-16 03:22:03'),(1001,49,'aston','2023-01-16 03:22:16'),(1002,NULL,'aston','2023-01-16 03:45:14'),(1003,NULL,'makisan','2023-01-16 03:45:36'),(1004,NULL,'h','2023-01-16 03:45:48'),(1005,NULL,'h','2023-01-16 03:46:00'),(1006,NULL,'unc','2023-01-16 03:46:23'),(1007,NULL,'oka','2023-01-16 03:46:29'),(1008,1,'pop','2023-01-16 03:47:45'),(1009,NULL,'as','2023-01-16 03:48:23'),(1010,NULL,'pepper lunch','2023-01-16 05:24:20'),(1011,NULL,'ast','2023-01-16 12:45:25'),(1012,NULL,'Javen','2023-01-17 06:58:49');
/*!40000 ALTER TABLE `searches` ENABLE KEYS */;
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
