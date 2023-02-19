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
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `idRestaurant` int NOT NULL,
  `idAccount` int NOT NULL DEFAULT '0',
  `rating` enum('1','2','3','4','5') COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `review` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `date` date NOT NULL,
  `edited` enum('T','F') COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'F',
  PRIMARY KEY (`idRestaurant`,`idAccount`),
  KEY `reviewOnRestaurant_idx` (`idRestaurant`),
  KEY `reviewByAccount_idx` (`idAccount`),
  CONSTRAINT `reviewByAccount` FOREIGN KEY (`idAccount`) REFERENCES `accounts` (`idAccount`) ON DELETE CASCADE,
  CONSTRAINT `reviewOnRestaurant` FOREIGN KEY (`idRestaurant`) REFERENCES `restaurants` (`idRestaurant`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,'2','dsfe','2022-12-20','T'),(1,2,'4','Great Food and Service','2022-12-27','T'),(1,6,'3','Ok','2022-12-26','F'),(1,7,'1','bobby no like the food :(','2022-12-15','T'),(1,9,'5','Lao Gan Ma','2022-12-19','F'),(2,1,'5','Nice','2022-12-22','T'),(2,2,'5','i love astons <3','2022-12-27','F'),(2,6,'1','sASD','2022-12-18','F'),(2,13,'1','d                                                  d     \n    \n                                rrfrrffffff','2022-12-28','F'),(3,1,'5','McDonalds had a cow.','2022-12-27','T'),(3,2,'5','I\'m lovin it','2022-12-27','T'),(3,6,'5','This is edited','2023-01-02','T'),(3,7,'4','Bobby enjoyed the food here :)','2022-12-15','F'),(3,11,'4','meh','2022-12-27','F'),(4,1,'2','awd','2022-12-19','T'),(4,2,'4','asdw','2022-12-27','F'),(4,6,'4','edited 123','2023-01-02','T'),(4,9,'3','Test','2022-12-19','F'),(5,2,'3','IM A PRO CODER !!!','2022-12-27','F'),(5,3,'4','refs','2022-12-19','F'),(5,6,'2','I love pork <3','2022-12-18','F'),(5,7,'4','Bobby enjoyed the food here :)','2022-12-15','F'),(5,9,'3','Nice','2022-12-19','F'),(5,13,'4','I loved the food there. I would definitely come back another time!','2022-12-28','F'),(6,2,'4','I love prata','2022-12-27','F'),(7,2,'3','sadw dq fer f  r  er      rf fr  r f  fr rf rf f r fr rf rf rf f rf     ff f f f f f f  f ff f f f  ff f  f f ff  f f f  f f f f f f  f f f ff  f  f f f f f f      ffffff f f  f f f f f  f f     oqmdipw wk ke kv ek k sr v tv e ver fj wv rev eav aerv erv erv. This comment is exactly one-hundred words long. sidmnawini ae f f f f  f','2022-12-29','F'),(7,6,'3','AWFQEAWFQWD','2022-12-18','F'),(7,12,'5','I love sushi with teh','2022-12-27','F'),(8,1,'5','I love popeyes','2022-12-22','F'),(8,6,'4','Nice','2022-12-18','F'),(8,13,'5','I like fried Chicken','2022-12-28','F'),(10,1,'','Long comment here\naoifnwiniwn fewinoiew voikewn\niwqfoiewnfokwef','2022-12-27','T'),(10,2,'2','iaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jgiaenfunewfnwe fjw fj ji gwji 54jiw gji54w wgji 5j  wjo jverji gejge3 jg','2022-12-27','F'),(10,13,'4','Goofy Ahh Restaurant','2022-12-28','T'),(11,6,'5','FIRST','2022-12-26','F'),(11,13,'1','I dont like','2022-12-28','F'),(15,6,'5','This is my favourites, go-to restaurant since young. I LUVVVV this restaurant so much :0 :o :O','2022-12-26','F');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-07 18:38:16
