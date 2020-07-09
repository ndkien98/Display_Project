-- Bảng "Bộ Môn"
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_code` varchar(5) NOT NULL,
  `department_name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `department_code` (`department_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Bảng "Thể Loại"
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_code` varchar(10) NOT NULL,
  `category_name` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_code` (`category_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Bảng "Năm Học - Học Kỳ"
CREATE TABLE `years_semesters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL,
  `semester` int NOT NULL,
  `start_date` date DEFAULT NULL,
  `weeks_number` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `year` (`year`,`semester`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Bảng "Vai trò"
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Bảng "Chức Năng"
CREATE TABLE `functions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `function_name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `action_code` varchar(50) NOT NULL,
  `function_description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `action_code` (`action_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Bảng "Vai trò - Chức Năng"
CREATE TABLE `roles_functions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `function_id` int NOT NULL,
  `status` int NOT NULL DEFAULT '0',  -- 0: Vô hiệu hoá | 1: Được kích hoạt
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_id_function_id` (`role_id`,`function_id`),
  KEY `role_id` (`role_id`),
  KEY `function_id` (`function_id`),
  CONSTRAINT `roles_functions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `roles_functions_ibfk_2` FOREIGN KEY (`function_id`) REFERENCES `functions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Bảng "Môn Học"
CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject_code` varchar(10) NOT NULL,
  `subject_name` varchar(200) CHARACTER SET utf8mb4 NOT NULL,
  `department_code` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `subject_code` (`subject_code`),
  KEY `department_code` (`department_code`),
  CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`department_code`) REFERENCES `departments` (`department_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Bảng "Người Dùng"
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` varchar(5) CHARACTER SET utf8mb4 DEFAULT NULL,
  `email_address` varchar(100) DEFAULT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  `role_id` int NOT NULL,
  `user_avatar_url` varchar(900) CHARACTER SET utf8mb4 DEFAULT NULL,
  `status` int DEFAULT 1 NOT NULL,	-- 1: Tài khoản được kích hoạt | 0: Tài khoản bị khoá
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email_address` (`email_address`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Bảng "Giảng Viên"
CREATE TABLE `lecturers` (
  `lecturer_code` varchar(10) NOT NULL,
  `department_code` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`lecturer_code`),
  KEY `department_code` (`department_code`),
  KEY `lecturer_code` (`lecturer_code`),
  CONSTRAINT `lecturers_ibfk_1` FOREIGN KEY (`lecturer_code`) REFERENCES `users` (`username`),
  CONSTRAINT `lecturers_ibfk_2` FOREIGN KEY (`department_code`) REFERENCES `departments` (`department_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Bảng "Sinh Viên"
CREATE TABLE `students` (
  `student_code` varchar(10) NOT NULL,
  `class_code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`student_code`),
  KEY `student_code` (`student_code`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`student_code`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Bảng "Lớp Học Phần"
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject_code` varchar(10) NOT NULL,
  `subject_group` int NOT NULL,
  `class_code` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL,
  `year_semester_id` int DEFAULT NULL,
  `lecturer_code` varchar(10) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(10) DEFAULT NULL,
  `last_modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `courses` (`subject_code`,`subject_group`,`class_code`,`year_semester_id`),
  KEY `subject_code` (`subject_code`),
  KEY `lecturer_code` (`lecturer_code`),
  KEY `year_semester_id` (`year_semester_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`subject_code`) REFERENCES `subjects` (`subject_code`),
  CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`lecturer_code`) REFERENCES `lecturers` (`lecturer_code`),
  CONSTRAINT `courses_ibfk_3` FOREIGN KEY (`year_semester_id`) REFERENCES `years_semesters` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Bảng "Đồ Án"
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_code` varchar(10) NOT NULL,
  `project_name` varchar(500) CHARACTER SET utf8mb4 NOT NULL,
  `project_avatar_url` varchar(900) CHARACTER SET utf8mb4 DEFAULT NULL,
  `short_description` text,
  `detailed_description` text,
  `demo_link` varchar(900) CHARACTER SET utf8mb4 DEFAULT NULL,
  `category_code` varchar(10) DEFAULT NULL,
  `student_code` varchar(10) DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',	-- 0: Đồ án đang chờ kiểm duyệt | 1: Đồ án đã được kiểm duyệt
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(10) DEFAULT NULL,
  `last_modified_by` varchar(10) DEFAULT NULL,
  `last_modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_code` (`project_code`),
  KEY `category_code` (`category_code`),
  KEY `student_code` (`student_code`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`category_code`) REFERENCES `categories` (`category_code`),
  CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`student_code`) REFERENCES `students` (`student_code`),
  CONSTRAINT `projects_ibfk_3` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Bảng "Thành Viên"
CREATE TABLE `project_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_code` varchar(10) DEFAULT NULL,
  `full_name` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL,
  `class_code` varchar(10) DEFAULT NULL,
  `project_code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_code` (`project_code`),
  CONSTRAINT `project_members_ibfk_1` FOREIGN KEY (`project_code`) REFERENCES `projects` (`project_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
