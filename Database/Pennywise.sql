CREATE DATABASE  IF NOT EXISTS `pennywise` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pennywise`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pennywise
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `budgets`
--

DROP TABLE IF EXISTS `budgets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `budgets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `startDate` date NOT NULL DEFAULT (curdate()),
  `endDate` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_userId` (`userId`),
  CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budgets`
--

LOCK TABLES `budgets` WRITE;
/*!40000 ALTER TABLE `budgets` DISABLE KEYS */;
INSERT INTO `budgets` VALUES (21,1,90.00,'Test_current','2024-10-31','2024-11-30'),(22,10,2000.00,'Omri cant see me lol','2024-11-07','2024-12-07'),(24,1,100.00,'test from now','2024-11-07','2024-12-07'),(25,2,100.00,'test from now- yuval','2024-11-07','2024-12-07'),(26,1,666.00,'not active','2023-01-01','2023-02-01');
/*!40000 ALTER TABLE `budgets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expensecategories`
--

DROP TABLE IF EXISTS `expensecategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expensecategories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expensecategories`
--

LOCK TABLES `expensecategories` WRITE;
/*!40000 ALTER TABLE `expensecategories` DISABLE KEYS */;
INSERT INTO `expensecategories` VALUES (1,'Transportation'),(2,'Utilities'),(3,'Entertainment'),(4,'Insurance'),(5,'Dining Out'),(6,'Education'),(7,'Savings/Investments'),(8,'Gifts/Donations'),(9,'Travel'),(10,'Home Maintenance'),(11,'Personal Care'),(12,'Pets'),(13,'Childcare'),(14,'Loan Payments'),(15,'Other');
/*!40000 ALTER TABLE `expensecategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `expenseId` int NOT NULL,
  `dateTime` datetime NOT NULL,
  `description` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`userId`),
  KEY `fk_expense_category` (`expenseId`),
  CONSTRAINT `fk_expense_category` FOREIGN KEY (`expenseId`) REFERENCES `expensecategories` (`id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=218 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
INSERT INTO `expenses` VALUES (102,1,150.00,12,'2024-10-04 15:46:00','Brought Doja some snacks'),(103,1,200.00,1,'2024-10-04 15:48:00','Rav Kav'),(104,1,350.00,11,'2024-10-04 15:50:00','UNDIES'),(105,1,55.00,5,'2024-10-02 12:27:00','Wolt order'),(106,1,150.00,8,'2024-10-05 12:42:29','Brought a doll to my baby sister'),(107,1,150.00,2,'2024-10-06 10:18:53','TEST WITHOUT DATE'),(108,1,150.00,5,'2024-10-06 11:25:49','ZIBI EMO TEST'),(109,1,60.00,11,'2024-10-06 12:23:59','What userId Made The Expense?'),(112,1,150.00,8,'2024-01-02 16:12:00','MY BIRTHDAY'),(113,1,200.00,14,'2024-01-01 16:44:00','PIPI KAKI'),(114,1,150.00,2,'2024-10-08 10:25:37','auto recent test'),(115,1,150.00,9,'2024-10-10 11:46:04','This one should have formatted time and date for right now'),(116,1,150.00,9,'2024-10-10 12:08:57','test'),(117,1,150.00,9,'2024-10-10 12:09:12','test'),(118,1,200.00,2,'2024-10-10 12:11:45','wtf123'),(119,1,200.00,1,'2024-10-10 12:11:58','wtf123'),(120,1,200.00,11,'2024-10-10 12:16:21','321'),(121,1,200.00,1,'2024-10-10 12:16:36','321'),(122,1,150.00,2,'2024-10-10 12:23:28','TEST FROM THE FRONT'),(123,1,150.00,5,'2024-10-10 13:03:57','banana'),(124,1,150.00,1,'2024-10-10 13:04:20','banana'),(125,1,666.00,5,'2024-10-10 13:37:24','banana'),(126,1,190.00,12,'2024-10-10 14:09:31','This is simple adding via postman'),(127,1,150.00,8,'2024-10-20 11:05:56','recently test'),(128,1,150.00,3,'2024-10-20 12:03:52','test2'),(130,1,800.00,5,'2024-10-20 12:54:13','TEST'),(131,1,321.00,2,'2024-10-20 13:18:31','test3'),(132,1,200.00,11,'2024-10-20 13:20:27','test4'),(140,1,150.00,1,'2024-10-22 14:42:00','321'),(141,1,50.00,14,'2024-10-22 14:42:00','123'),(142,1,421.00,15,'2024-10-23 13:42:20','is this edited yet?'),(143,1,1313.00,15,'2024-10-23 13:47:00','i want to edit this'),(144,1,11.00,15,'2024-10-24 14:02:35','adding expense to today'),(145,1,10.00,5,'2024-10-25 14:15:08','Coca Cola'),(146,1,10.00,1,'2024-10-25 14:17:00','Bus Ride'),(147,1,10.00,4,'2024-10-25 14:34:37','test'),(148,1,10.00,6,'2024-10-25 14:35:38','test'),(149,1,10.00,14,'2024-10-25 16:59:38','Testing if not undefined in table'),(150,1,10.00,12,'2024-10-25 17:00:41','123'),(151,1,10.00,9,'2024-10-25 17:04:45','Rav Kav'),(152,1,10.00,10,'2024-10-25 17:08:35','test'),(153,1,10.00,15,'2024-10-25 17:10:20','test'),(154,1,10.00,10,'2024-10-25 17:14:43','test'),(155,1,10.00,15,'2024-10-25 17:17:04','test'),(156,1,10.00,2,'2024-10-25 17:37:34','test'),(159,1,15.00,14,'2024-10-26 16:36:38','balagan'),(162,1,23.00,15,'2024-10-31 13:53:42','cocaine'),(171,1,13.00,13,'2024-11-02 16:12:00','TEST FROM THE FRONTTT'),(172,1,50.00,10,'2024-11-03 12:04:00','Roba'),(173,1,12.00,10,'2024-11-03 12:12:00','321'),(174,1,100.00,15,'2024-11-03 12:36:00','highest?'),(175,1,2.00,1,'2024-11-03 12:37:00','lowest?'),(176,9,100.00,2,'2024-11-03 16:00:47','test partnerId - 1'),(177,8,100.00,2,'2024-11-03 16:01:10','test partnerId - 2'),(178,8,90.00,6,'2024-11-05 14:08:00','test'),(179,2,100.00,5,'2024-11-05 14:13:00','מאה שקלללללללל'),(201,2,120.00,5,'2024-10-01 14:30:00','Groceries'),(202,2,45.00,3,'2024-10-05 09:15:00','Coffee with friends'),(203,2,250.00,8,'2024-10-07 18:40:00','New shoes'),(204,2,85.00,11,'2024-10-10 20:00:00','Dinner at restaurant'),(205,2,30.00,9,'2024-10-12 08:30:00','Bus ticket'),(206,2,60.00,14,'2024-10-15 13:50:00','Movie tickets'),(207,2,300.00,15,'2024-10-17 16:20:00','Jacket purchase'),(208,2,20.00,7,'2024-10-20 10:00:00','Snacks for road trip'),(209,2,40.00,6,'2024-10-22 11:25:00','Gym pass'),(210,2,150.00,13,'2024-10-25 14:45:00','Gifts for family'),(211,1,50.00,15,'2024-11-07 11:58:00','test - Omri made this expense'),(212,2,50.00,15,'2024-11-07 11:58:00','test - Yuval made this expense. ALLA E!'),(214,2,1000.00,15,'2024-11-07 14:14:00','Yuvals highest'),(215,2,1.00,15,'2024-11-07 14:14:00','yuvals lowest'),(216,11,10.00,15,'2024-11-12 11:50:00','connection test - testy 2'),(217,10,10.00,15,'2024-11-12 11:51:00','connection test - testy 1');
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partnerrequests`
--

DROP TABLE IF EXISTS `partnerrequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partnerrequests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `requesterId` int NOT NULL,
  `receiverId` int NOT NULL,
  `requestStatus` enum('pending','approved','rejected') DEFAULT 'pending',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `requesterId` (`requesterId`),
  KEY `receiverId` (`receiverId`),
  CONSTRAINT `partnerrequests_ibfk_1` FOREIGN KEY (`requesterId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `partnerrequests_ibfk_2` FOREIGN KEY (`receiverId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partnerrequests`
--

LOCK TABLES `partnerrequests` WRITE;
/*!40000 ALTER TABLE `partnerrequests` DISABLE KEYS */;
INSERT INTO `partnerrequests` VALUES (18,10,11,'approved','2024-11-12 10:23:09','2024-11-12 10:23:29'),(19,1,2,'approved','2024-11-12 10:24:56','2024-11-12 10:25:10');
/*!40000 ALTER TABLE `partnerrequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `partnerId` int DEFAULT NULL,
  `roleId` int DEFAULT '2',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_partner` (`partnerId`),
  KEY `fk_role` (`roleId`),
  CONSTRAINT `fk_partner` FOREIGN KEY (`partnerId`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_role` FOREIGN KEY (`roleId`) REFERENCES `expanse-tracker`.`roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Omri','Shachar','irmoomri@gmail.com','1234',2,1),(2,'Yuval','Sharabi','yuvalvul60@gmail.com','1234',1,1),(8,'123','456','789@gmail.com','4321',9,2),(9,'12','345','text@gmail.com','12345',8,2),(10,'testy1','test','test1@gmail.com','12345',11,2),(11,'testy2','test','test2@gmail.com','12345',10,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-12 12:30:23
