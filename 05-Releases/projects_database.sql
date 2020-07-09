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



-- INSERT DATA
-- Bảng "Bộ Môn"
INSERT INTO `departments` (`id`, `department_code`, `department_name`) VALUES (1,'TH01','Khoa học máy tính'), (2,'TH02','Công nghệ phần mềm'), (3,'TH03','Toán - Tin ứng dụng');

-- Bảng "Thể Loại"
INSERT INTO `categories` (`id`, `category_code`, `category_name`) VALUES (1,'TL01','Ứng dụng desktop'), (2,'TL02','Ứng dụng web'), (3,'TL03','Ứng dụng mobile');

-- Bảng "Năm học - Học kỳ""
INSERT INTO `years_semesters` (`id`, `year`, `semester`, `start_date`, `weeks_number`) VALUES (1,2020,1,NULL,20), (2,2020,2,NULL,20), (3,2021,1,NULL,21), (4,2021,2,NULL,21);

-- Bảng "Quyền"
INSERT INTO `roles` (`id`, `role_name`) VALUES (1,'Admin'), (2,'Giảng viên'), (3,'Sinh viên');

-- Bảng "Chức Năng"
INSERT INTO `functions` VALUES (1,'Quản lý phân quyền','ROLE_MANAGEMENT',NULL),(2,'Thêm quyền','ADD_ROLE',NULL),(3,'Sửa quyền','EDIT_ROLE',NULL),(4,'Xoá quyền','DELETE_ROLE',NULL),(5,'Quản lý bộ môn','DEPARTMENT_MANAGEMENT',NULL),(6,'Thêm bộ môn','ADD_DEPARTMENT',NULL),(7,'Sửa bộ môn','EDIT_DEPARTMENT',NULL),(8,'Xoá bộ môn','DELETE_DEPARTMENT',NULL),(9,'Quản lý người dùng','USER_MANAGEMENT',NULL),(10,'Thêm giảng viên','ADD_LECTURER',NULL),(11,'Sửa giảng viên','EDIT_LECTURER',NULL),(12,'Xoá giảng viên','DELETE_LECTURER',NULL),(13,'Thêm sinh viên','ADD_STUDENT',NULL),(14,'Sửa sinh viên','EDIT_STUDENT',NULL),(15,'Xoá sinh viên','DELETE_STUDENT',NULL),(16,'Quản lý môn học','SUBJECT_MANAGEMENT',NULL),(17,'Thêm môn học','ADD_SUBJECT',NULL),(18,'Sửa môn học','EDIT_SUBJECT',NULL),(19,'Xoá môn học','DELETE_SUBJECT',NULL),(20,'Quản lý năm học - học kỳ','YEAR_SEMESTER_MANAGEMENT',NULL),(21,'Thêm năm học - học kỳ','ADD_YEAR_SEMSETER',NULL),(22,'Sửa năm học - học kỳ','EDIT_YEAR_SEMSETER',NULL),(23,'Xoá năm học - học kỳ','DELETE_YEAR_SEMSETER',NULL),(24,'Quản lý lớp học phần','COURSE_MANAGEMENT',NULL),(25,'Thêm lớp học phần','ADD_COURSE',NULL),(26,'Sửa lớp học phần','EDIT_COURSE',NULL),(27,'Xoá lớp học phần','DELETE_COURSE',NULL),(28,'Quản lý thể loại','CATEGORY_MANAGEMENT',NULL),(29,'Thêm thể loại','ADD_CATEGORY',NULL),(30,'Sửa thể loại','EDIT_CATEGORY',NULL),(31,'Xoá thể loại','DELETE_CATEGORY',NULL),(32,'Quản lý đồ án','PROJECT_MANAGEMENT',NULL),(33,'Thêm đồ án','ADD_PROJECT',NULL),(34,'Sửa đồ án','EDIT_PROJECT',NULL),(35,'Xoá đồ án','DELETE_PROJECT',NULL),(36,'Kiểm duyệt đồ án','PROJECT_APPROVE',NULL),(37,'Thống kê đồ án','PROJECT_ANALYZE',NULL);

-- Bảng "Quyền - Chức Năng"
INSERT INTO `roles_functions` VALUES (1,1,1,1),(2,1,2,1),(3,1,3,1),(4,1,4,1),(5,1,5,1),(6,1,6,1),(7,1,7,1),(8,1,8,1),(9,1,9,1),(10,1,10,1),(11,1,11,1),(12,1,12,1),(13,1,13,1),(14,1,14,1),(15,1,15,1),(16,1,16,1),(17,1,17,1),(18,1,18,1),(19,1,19,1),(20,1,20,1),(21,1,21,1),(22,1,22,1),(23,1,23,1),(24,1,24,1),(25,1,25,1),(26,1,26,1),(27,1,27,1),(28,1,28,1),(29,1,29,1),(30,1,30,1),(31,1,31,1),(32,1,32,1),(33,1,33,1),(34,1,34,1),(35,1,35,1),(36,1,36,1),(37,1,37,1);

-- Bảng "Môn Học"
INSERT INTO `subjects` (`id`, `subject_code`, `subject_name`, `department_code`) VALUES (1,'MH01','Đồ án','TH02'), (2,'MH02','Lập trình Java','TH02'), (3,'MH03','Trí tuệ nhân tạo','TH01'), (4,'MH04','Đồ hoạ máy tính','TH01'), (5,'MH05','Lập trình windows',NULL);

-- Bảng "Người Dùng"
INSERT INTO `users` (`id`, `username`, `password`, `full_name`, `birth_date`, `gender`, `email_address`, `phone_number`, `role_id`, `user_avatar_url`, `status`, `created_date`, `created_by`) VALUES (1,'admin','admin','Admin',NULL,NULL,NULL,NULL,1,NULL,1,NULL,'admin'), (2,'CNP02','1','Ngô Công Thắng',NULL,NULL,NULL,NULL,2,NULL,1,NULL,'admin'), (3,'CNP07','1','Trần Trung Hiếu',NULL,NULL,NULL,NULL,2,NULL,1,NULL,'admin'), (4,'611209','1','Nguyễn Tùng Bái',NULL,NULL,NULL,NULL,3,NULL,1,NULL,'CNP02'), (5,'611244','1','Nguyễn Tuấn Mạnh',NULL,NULL,NULL,NULL,3,NULL,1,NULL,'CNP02'), (6,'611245','1','Trần Đức Mạnh',NULL,NULL,NULL,NULL,3,NULL,1,NULL,'CNP07'), (7,'611292','1','Nguyễn Đắc Kiên',NULL,NULL,NULL,NULL,3,NULL,1,NULL,'CNP07'), (8,'MTI01','1','Ngô Tuấn Anh',NULL,NULL,NULL,NULL,2,NULL,1,NULL,'admin'), (9,'MTI02','1','Nguyễn Thị Huyền',NULL,NULL,NULL,NULL,2,NULL,1,NULL,'admin');

-- Bảng "Giảng Viên"
INSERT INTO `lecturers` (`lecturer_code`, `department_code`) VALUES ('MTI01','TH01'), ('MTI02','TH01'), ('CNP02','TH02'), ('CNP07','TH02');

-- Bảng "Sinh Viên"
INSERT INTO `students` (`student_code`, `class_code`) VALUES ('611209','K61CNPMP'), ('611244','K61CNPMP'), ('611245','K61CNPMP'), ('611292','K61CNPMP');

-- Bảng "Lớp Học Phần"
INSERT INTO `courses` (`id`, `subject_code`, `subject_group`, `class_code`, `year_semester_id`, `lecturer_code`, `created_date`, `created_by`, `last_modified_date`) VALUES (1,'MH01',1,'K61CNPMP',2,'CNP02',NULL,'CNP02',NULL), (2,'MH02',1,'K61CNPMP',2,'CNP07',NULL,'CNP07',NULL), (3,'MH03',1,'K61MMT',3,'MTI02',NULL,'MTI02',NULL), (4,'MH04',1,'K61CNPMP',4,'MTI01',NULL,'MTI01',NULL), (5,'MH02',2,'K62THA',NULL,'CNP07',NULL,'CNP07',NULL), (6,'MH01',1,NULL,NULL,NULL,NULL,'admin',NULL);

-- Bảng "Đồ Án"
INSERT INTO `projects` (`id`, `project_code`, `project_name`, `project_avatar_url`, `short_description`, `detailed_description`, `demo_link`, `category_code`, `student_code`, `course_id`, `status`, `created_date`, `created_by`, `last_modified_by`, `last_modified_date`) VALUES (1,'DA01','Hệ thống trưng bày sản phẩm đồ án môn học',NULL,NULL,NULL,NULL,'TL02','611209',1,0,NULL,'611209',NULL,NULL), (2,'DA02','Đồ án số 2',NULL,NULL,NULL,NULL,'TL01','611245',3,0,NULL,'611245',NULL,NULL), (3,'DA03','Đố án số 3',NULL,NULL,NULL,NULL,'TL03','611244',1,1,NULL,'611244',NULL,NULL), (4,'DA04','Đồ án số 4',NULL,NULL,NULL,NULL,'TL02','611209',2,1,NULL,'611209',NULL,NULL), (5,'DA05','Đồ án số 5',NULL,NULL,NULL,NULL,'TL03',NULL,NULL,0,NULL,'admin',NULL,NULL), (6,'DA06','Đồ án số 6',NULL,NULL,NULL,NULL,NULL,NULL,5,0,NULL,'admin',NULL,NULL), (7,'DA07','Đồ án số 7',NULL,NULL,NULL,NULL,NULL,NULL,6,0,NULL,'admin',NULL,NULL);

-- Bảng "Thành Viên"
INSERT INTO `project_members` (`id`, `student_code`, `full_name`, `class_code`, `project_code`) VALUES (1,'611245','Trần Đức Mạnh','K61CNPMP','DA01'), (2,'614086','Nguyễn Văn Dần','K61CNPMP','DA01'), (3,'611244','Nguyễn Tuấn Mạnh','K61CNPMP','DA04'), (4,'611293','Bùi Hữu Nghĩa','K61MMT','DA02'), (5,'611252','Đinh Thanh Tùng','K61MMT','DA02');
