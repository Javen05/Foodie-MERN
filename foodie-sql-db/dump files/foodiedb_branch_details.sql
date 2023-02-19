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
-- Table structure for table `branch_details`
--

DROP TABLE IF EXISTS `branch_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch_details` (
  `idBranchDetails` int NOT NULL AUTO_INCREMENT,
  `idBranch` int NOT NULL,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `content` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`idBranchDetails`),
  KEY `detailForBranch_idx` (`idBranch`),
  CONSTRAINT `detailForBranch` FOREIGN KEY (`idBranch`) REFERENCES `branches` (`idBranch`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch_details`
--

LOCK TABLES `branch_details` WRITE;
/*!40000 ALTER TABLE `branch_details` DISABLE KEYS */;
INSERT INTO `branch_details` VALUES (1,1,'Phone','9912 4578'),(2,1,'Email','Support@hdl.com'),(3,3,'Email','Support@hdl.com'),(4,3,'Opening Hours','10AM - 11PM'),(5,7,'Opening Hours','10AM - 11PM'),(6,8,'Opening Hours','10AM - 11PM'),(7,9,'Location','820 Tampines Street 81 #01-506 Georgetown Coffee House, Singapore 520820'),(8,10,'Order now','+65 6284 1004'),(9,11,'Order now','+60 3-2282 6032'),(10,12,'Visit our site','https://www.popeyes.com/'),(11,10,'Opening','10AM - 12 PM'),(12,11,'Opening','8AM - 3 AM'),(13,10,'Website','https://www.pizzahut.com.sg'),(14,11,'Website','https://www.pizzahut.com.my'),(15,11,'We are Hiring','https://www.pizzahut.com.my/careers'),(16,11,'Promotion 10% OFF','Ends on 20 Feb. T&C Apply.'),(27,13,'Location','3D River Valley Road #02-04, Singapore 179023'),(28,14,'MRT','Somerset MRT'),(29,14,'Daily','10:30am - 06:00am'),(30,14,'Phone','+65 6835 7227'),(31,14,'Price','S$35 - S$60 per pax'),(32,15,'Locate Us','2 Jurong East Street 21 #03-01 IMM, Singapore 609601'),(33,15,'Daily','10:30am - 06:00am'),(34,15,'Book a Slot','+65 6835 7227'),(35,16,'Daily','10:30am - 06:00am'),(36,16,'Book a Slot','+65 6250 7557'),(37,17,'Unavailable','Under Renovation'),(38,14,'Locate','313 Orchard Road #04-23/24 313@Somerset, Singapore 238895');
/*!40000 ALTER TABLE `branch_details` ENABLE KEYS */;
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
