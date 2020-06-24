CREATE DATABASE  IF NOT EXISTS `projects_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `projects_database`;
-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: projects_database
-- ------------------------------------------------------
-- Server version	8.0.20

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
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject_code` varchar(10) NOT NULL,
  `subject_group` int NOT NULL,
  `class_code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `year_semester_id` int NOT NULL,
  `lecturer_code` varchar(10) NOT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(10) DEFAULT NULL,
  `last_modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `subject_code` (`subject_code`,`subject_group`,`class_code`,`year_semester_id`),
  KEY `lecturer_code` (`lecturer_code`),
  KEY `year_semester_id` (`year_semester_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`subject_code`) REFERENCES `subjects` (`subject_code`),
  CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`lecturer_code`) REFERENCES `lecturers` (`lecturer_code`),
  CONSTRAINT `courses_ibfk_3` FOREIGN KEY (`year_semester_id`) REFERENCES `years_semesters` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_code` varchar(5) NOT NULL,
  `department_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `department_code` (`department_code`),
  UNIQUE KEY `department_name` (`department_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `functions`
--

DROP TABLE IF EXISTS `functions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `functions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `function_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `action_code` varchar(20) NOT NULL,
  `function_description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `function_name` (`function_name`),
  UNIQUE KEY `action_code` (`action_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `functions`
--

LOCK TABLES `functions` WRITE;
/*!40000 ALTER TABLE `functions` DISABLE KEYS */;
/*!40000 ALTER TABLE `functions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecturers`
--

DROP TABLE IF EXISTS `lecturers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecturers` (
  `lecturer_code` varchar(10) NOT NULL,
  `role_id` int NOT NULL DEFAULT '2',
  `department_code` varchar(5) NOT NULL,
  PRIMARY KEY (`lecturer_code`),
  KEY `department_code` (`department_code`),
  KEY `lecturer_code` (`lecturer_code`,`role_id`),
  CONSTRAINT `lecturers_ibfk_1` FOREIGN KEY (`department_code`) REFERENCES `departments` (`department_code`),
  CONSTRAINT `lecturers_ibfk_2` FOREIGN KEY (`lecturer_code`, `role_id`) REFERENCES `users` (`username`, `role_id`),
  CONSTRAINT `lecturers_chk_1` CHECK (((`role_id` = 1) or (`role_id` = 2)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecturers`
--

LOCK TABLES `lecturers` WRITE;
/*!40000 ALTER TABLE `lecturers` DISABLE KEYS */;
/*!40000 ALTER TABLE `lecturers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_members`
--

DROP TABLE IF EXISTS `project_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_code` varchar(10) DEFAULT NULL,
  `full_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `class_code` varchar(10) DEFAULT NULL,
  `project_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `project_members_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_members`
--

LOCK TABLES `project_members` WRITE;
/*!40000 ALTER TABLE `project_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `project_avatar_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `short_description` text,
  `detailed_description` text,
  `demo_link` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `category_id` int NOT NULL,
  `student_code` varchar(10) NOT NULL,
  `course_id` int NOT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(10) DEFAULT NULL,
  `last_modified_by` varchar(10) DEFAULT NULL,
  `last_modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `student_code` (`student_code`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`student_code`) REFERENCES `students` (`student_code`),
  CONSTRAINT `projects_ibfk_3` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles_functions`
--

DROP TABLE IF EXISTS `roles_functions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles_functions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `function_id` int NOT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_id` (`role_id`,`function_id`),
  KEY `function_id` (`function_id`),
  CONSTRAINT `roles_functions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `roles_functions_ibfk_2` FOREIGN KEY (`function_id`) REFERENCES `functions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles_functions`
--

LOCK TABLES `roles_functions` WRITE;
/*!40000 ALTER TABLE `roles_functions` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles_functions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `student_code` varchar(10) NOT NULL,
  `role_id` int NOT NULL DEFAULT '3',
  `class_code` varchar(10) NOT NULL,
  PRIMARY KEY (`student_code`),
  KEY `student_code` (`student_code`,`role_id`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`student_code`, `role_id`) REFERENCES `users` (`username`, `role_id`),
  CONSTRAINT `students_chk_1` CHECK ((`role_id` = 3))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject_code` varchar(10) NOT NULL,
  `subject_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `department_code` varchar(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `subject_code` (`subject_code`),
  UNIQUE KEY `subject_name` (`subject_name`),
  KEY `department_code` (`department_code`),
  CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`department_code`) REFERENCES `departments` (`department_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email_address` varchar(100) NOT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  `role_id` int NOT NULL,
  `user_avatar_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` int DEFAULT 1 NOT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email_address` (`email_address`),
  UNIQUE KEY `username_2` (`username`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `years_semesters`
--

DROP TABLE IF EXISTS `years_semesters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `years_semesters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL,
  `semester` smallint NOT NULL,
  `start_date` date DEFAULT NULL,
  `weeks_number` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `year` (`year`,`semester`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `years_semesters`
--

LOCK TABLES `years_semesters` WRITE;
/*!40000 ALTER TABLE `years_semesters` DISABLE KEYS */;
/*!40000 ALTER TABLE `years_semesters` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-17 18:12:07
