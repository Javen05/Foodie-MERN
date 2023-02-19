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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `idAccount` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `picture` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '/defUser',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `phone` int NOT NULL,
  `date` date NOT NULL,
  `role` enum('R','O','M') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'R',
  PRIMARY KEY (`idAccount`),
  UNIQUE KEY `idAccount_UNIQUE` (`idAccount`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'Javen','$2b$10$K0wBwMSeRpeTOP8HS.vHOeC47gAnjkM0W.8.FdiZIAJQDQk1OUaO6','abc.png','Javenlai@yahoo.com',61236123,'2022-12-14','O'),(2,'Joe','$2b$10$jj29ICjP16Qu/fWbUAJol.2Yo7MWHXCFv.6S.HuPkwRMO26R05H5.','/defUser','Javenlai@yahoo.com',92306123,'2022-12-14','O'),(3,'John','$2b$10$mLQnf6mao3l.6Je6/5SSqudGkzYcaZW5v4F4Y2OOCI3s7QIUySTMa','/defUser','Javenlai@yahoo.com',61236123,'2022-12-14','R'),(4,'Johnny','$2b$10$n0vgcB93Uoe0882HXdNJ1eedz/5lqN7uCL/IkBgc.MKFy06CoICLO','/defUser','Javenlai@yahoo.com',61236123,'2022-12-14','R'),(6,'Thom','$2b$10$5YcfHwUIT.MtFXxkpENOeu.9e3mECYT9sbLvIoSlJ.T4u458gD5om','/defUser','thomlow@gmail.com',91238721,'2022-12-15','R'),(7,'Bobby','$2b$10$fe4RkHnHPNWsAJzOmjbxxOq/BzUmty.PZPCx293y3C0rXUIREd1Q6','/defUser','Javenlai@yahoo.com',61236123,'2022-12-15','R'),(9,'dummyacc','$2b$10$0j6QXT/SLQN5.DGk32h58umhJtQWBHtpK8IvhYhO1GWlz8saYFLWC','/defUser','2202934b@student.tp.edu.sg',91234567,'2022-12-19','R'),(10,'Timmy','$2b$10$ZM4fj17NYNE3COpw5iuWIuuRN5qdGEOeBEXuAN21pI3sq3uSvK5dq','/defUser','asnd@skdasa.com',9123,'2022-12-26','R'),(11,'joebob','$2b$10$vUX2hkcOetl8NUqGkuTL9u5uUIKLHNWVcjMpfLqllIggqBbTMFDZS','/defUser','joe33@email.com',9,'2022-12-27','R'),(12,'BabyBoi','$2b$10$ZyzQxHIaYhvF2UBPLSbrjeyr5g0vdCAwkdB6BbD0qxbSx5CQavlBG','/defUser','joebob@gmail.com',91234567,'2022-12-27','R'),(13,'232','$2b$10$n9dKSGeHuYcf7MvgkWbChujqoAoDjfXK1dY.2HtEhKJWQDwN91S7S','/defUser','joe@GMAIL.Com',2,'2022-12-28','R'),(25,'123','$2b$10$ZyzQxHIaYhvF2UBPLSbrjeyr5g0vdCAwkdB6BbD0qxbSx5CQavlBG','/defUser','javenlai@yahoo.com',99991299,'2023-01-09','R'),(26,'ABC','$2b$10$ZyzQxHIaYhvF2UBPLSbrjeyr5g0vdCAwkdB6BbD0qxbSx5CQavlBG','/defUser','javenlai@yahoo.com',99991299,'2023-01-09','R'),(34,'tester','$2b$10$g.OFMXjpOJCH77xIatlabOVlYry7CvyfE0VVCUNO/bqEPQsErGEUm','/defUser','javenlai@yahoo.com',99991299,'2023-01-09','R'),(40,'pop','$2b$10$iQblFjwkihE.ghz2vuFhUudfbueawmjJ0Vr94vL9dRPOOs1GRx/m.','/defUser','Javenlai@yahoo.com',61236123,'2023-01-09','R'),(47,'Josh','$2b$10$WfCn95Hp7aVx0SFmnnf4zezOcGNqPJI6.nMd6XNAYiIq/yutDGrUG','/defUser','Javenlai@yahoo.com',999,'2023-01-13','R'),(48,'joseF','$2b$10$U1ZBRfxhRg9r.7GkcUNfXeoxxJqnCb1flyGVwtAnDPbaYFvMX7b/G','/defUser','javenlai5@gmail.com',9545,'2023-01-14','R'),(49,'tester2','$2b$10$HKZuelV8MWtzPtlIyxKNeOCjkxLgxHMTjtthFgORKPxtEMwTS8P5e','/defUser','2202934b@student.tp.edu.sg',91234567,'2023-01-16','R');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
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
