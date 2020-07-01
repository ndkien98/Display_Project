-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2020 at 05:32 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projects_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(20) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `subject_code` varchar(10) NOT NULL,
  `subject_group` int(11) NOT NULL,
  `class_code` varchar(50) CHARACTER SET utf8 NOT NULL,
  `year_semester_id` int(11) NOT NULL,
  `lecturer_code` varchar(10) NOT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` varchar(10) DEFAULT NULL,
  `last_modified_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `department_code` varchar(5) NOT NULL,
  `department_name` varchar(50) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `functions`
--

CREATE TABLE `functions` (
  `id` int(11) NOT NULL,
  `function_name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `action_code` varchar(20) NOT NULL,
  `function_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lecturers`
--

CREATE TABLE `lecturers` (
  `lecturer_code` varchar(10) NOT NULL,
  `role_id` int(11) NOT NULL DEFAULT 2,
  `department_code` varchar(5) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `project_name` varchar(200) CHARACTER SET utf8 NOT NULL,
  `project_avatar_url` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `detailed_description` text DEFAULT NULL,
  `demo_link` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `student_code` varchar(10) NOT NULL,
  `course_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` varchar(10) DEFAULT NULL,
  `last_modified_by` varchar(10) DEFAULT NULL,
  `last_modified_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `project_members`
--

CREATE TABLE `project_members` (
  `id` int(11) NOT NULL,
  `student_code` varchar(10) DEFAULT NULL,
  `full_name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `class_code` varchar(10) DEFAULT NULL,
  `project_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(20) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roles_functions`
--

CREATE TABLE `roles_functions` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `function_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_code` varchar(10) NOT NULL,
  `role_id` int(11) NOT NULL DEFAULT 3,
  `class_code` varchar(10) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `subject_code` varchar(10) NOT NULL,
  `subject_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `department_code` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` varchar(5) CHARACTER SET utf8 DEFAULT NULL,
  `email_address` varchar(100) NOT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `user_avatar_url` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `years_semesters`
--

CREATE TABLE `years_semesters` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `semester` smallint(6) NOT NULL,
  `start_date` date DEFAULT NULL,
  `weeks_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subject_code` (`subject_code`,`subject_group`,`class_code`,`year_semester_id`),
  ADD KEY `lecturer_code` (`lecturer_code`),
  ADD KEY `year_semester_id` (`year_semester_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `department_code` (`department_code`),
  ADD UNIQUE KEY `department_name` (`department_name`);

--
-- Indexes for table `functions`
--
ALTER TABLE `functions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `function_name` (`function_name`),
  ADD UNIQUE KEY `action_code` (`action_code`);

--
-- Indexes for table `lecturers`
--
ALTER TABLE `lecturers`
  ADD PRIMARY KEY (`lecturer_code`),
  ADD KEY `department_code` (`department_code`),
  ADD KEY `lecturer_code` (`lecturer_code`,`role_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `student_code` (`student_code`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `project_members`
--
ALTER TABLE `project_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `roles_functions`
--
ALTER TABLE `roles_functions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_id` (`role_id`,`function_id`),
  ADD KEY `function_id` (`function_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_code`),
  ADD KEY `student_code` (`student_code`,`role_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subject_code` (`subject_code`),
  ADD KEY `department_code` (`department_code`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email_address` (`email_address`),
  ADD UNIQUE KEY `username_role_id` (`username`,`role_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `years_semesters`
--
ALTER TABLE `years_semesters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `year` (`year`,`semester`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `functions`
--
ALTER TABLE `functions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_members`
--
ALTER TABLE `project_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles_functions`
--
ALTER TABLE `roles_functions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `years_semesters`
--
ALTER TABLE `years_semesters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`subject_code`) REFERENCES `subjects` (`subject_code`),
  ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`lecturer_code`) REFERENCES `lecturers` (`lecturer_code`),
  ADD CONSTRAINT `courses_ibfk_3` FOREIGN KEY (`year_semester_id`) REFERENCES `years_semesters` (`id`);

--
-- Constraints for table `lecturers`
--
ALTER TABLE `lecturers`
  ADD CONSTRAINT `lecturers_ibfk_1` FOREIGN KEY (`department_code`) REFERENCES `departments` (`department_code`),
  ADD CONSTRAINT `lecturers_ibfk_2` FOREIGN KEY (`lecturer_code`,`role_id`) REFERENCES `users` (`username`, `role_id`);

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`student_code`) REFERENCES `students` (`student_code`),
  ADD CONSTRAINT `projects_ibfk_3` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

--
-- Constraints for table `project_members`
--
ALTER TABLE `project_members`
  ADD CONSTRAINT `project_members_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`);

--
-- Constraints for table `roles_functions`
--
ALTER TABLE `roles_functions`
  ADD CONSTRAINT `roles_functions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `roles_functions_ibfk_2` FOREIGN KEY (`function_id`) REFERENCES `functions` (`id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`student_code`,`role_id`) REFERENCES `users` (`username`, `role_id`);

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`department_code`) REFERENCES `departments` (`department_code`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
