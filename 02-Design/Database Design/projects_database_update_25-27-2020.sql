use project1;
-- bảng Bộ môn
create table departments
(
    id              int auto_increment not null primary key,
    department_code varchar(5)         not null unique,
    department_name nvarchar(50)       not null unique
);

-- bảng Quyền
create table roles
(
    id        int auto_increment not null primary key,
    role_name nvarchar(20)       not null
);

-- bảng Chức năng
create table functions
(
    id            int auto_increment not null primary key,
    function_name nvarchar(50)       not null unique,
    action_code   varchar(20)        not null unique
);

-- bảng Quyền - Chức năng
create table roles_functions
(
    id          int auto_increment not null primary key,
    role_id     int                not null,
    function_id int                not null,
    `status`    tinyint            not null default 0, -- 0 - Disable | 1 - Enable
    unique (role_id, function_id),
    foreign key (role_id) references roles (id),
    foreign key (function_id) references functions (id)
);

-- bảng User
create table users
(
    id              int auto_increment not null primary key,
    username        varchar(10)        not null unique,
    `password`      varchar(255)       not null,
    full_name       nvarchar(50)       not null,
    birth_date      date,
    gender          nvarchar(5),
    email_address   varchar(100)       not null unique,
    phone_number    varchar(10),
    role_id         int                not null,
    user_avatar_url nvarchar(500),
    created_date    datetime default current_timestamp(),
    created_by      varchar(10),
    unique (username, role_id),
    foreign key (role_id) references roles (id)
);

-- bảng Năm học - Học kỳ
create table years_semesters
(
    id           int auto_increment not null primary key,
    `year`       int                not null, -- start year
    semester     smallint           not null,
    start_date   date,
    weeks_number int,
    unique (`year`, semester)
);

-- bảng Giảng viên
create table lecturers
(
    lecturer_code   varchar(10)   not null primary key,
    role_id         int default 2 not null, -- 1 - Admin | 2 - Lecturer
    department_code varchar(5)    not null,
    CONSTRAINT role_id_ct CHECK (role_id = 1 OR role_id = 2),
    foreign key (department_code) references departments (department_code),
    foreign key (lecturer_code, role_id) references users (username, role_id)
);

-- bảng Môn học
create table subjects
(
    id              int auto_increment not null primary key,
    subject_code    varchar(10)        not null unique,
    subject_name    nvarchar(100)      not null unique,
    department_code varchar(5)         not null,
    foreign key (department_code) references departments (department_code)
);

-- bảng Lớp học phần
create table courses
(
    id                 int auto_increment not null primary key,
    subject_code       varchar(10)        not null,
    subject_group      int                not null,
    years_semesters_id int                not null,
    lecturer_code      varchar(10)        not null,
    created_date       datetime default current_timestamp(),
    created_by         varchar(10),
    last_modified_date datetime default current_timestamp(),
    unique (subject_code, subject_group, years_semesters_id),
    foreign key (subject_code) references subjects (subject_code),
    foreign key (lecturer_code) references lecturers (lecturer_code),
    foreign key (years_semesters_id) references years_semesters (id)
);

-- bảng Thể loại
create table categories
(
    id            int auto_increment not null primary key,
    category_name nvarchar(20)       not null unique
);

-- bảng Sinh viên
create table students
(
    student_code varchar(10)   not null primary key,
    role_id      int default 3 not null, -- 3 - Student
    class_code   varchar(10)   not null,
    constraint check_role check (role_id = 3),
    foreign key (student_code, role_id) references users (username, role_id)
);

-- bảng Đồ án
create table projects
(
    id                   int                not null auto_increment primary key,
    project_code         varchar(10) unique not null,
    project_name         nvarchar(200)      not null,
    project_avatar_url   nvarchar(500),
    short_description    text,
    detailed_description text,
    demo_link            nvarchar(500),
    category_id          int                not null,
    student_code         varchar(10)        not null,
    course_id            int                not null,
    `status`             tinyint            not null default 0, -- 0 - Disable | 1 - Public | 2 - Private
    created_date         datetime                    default current_timestamp(),
    created_by           varchar(10),
    last_modified_by     varchar(10),
    last_modified_date   datetime                    default current_timestamp(),
    foreign key (category_id) references categories (id),
    foreign key (student_code) references students (student_code),
    foreign key (course_id) references courses (id)
);

-- bảng Hình ảnh
create table images
(
    id         int auto_increment not null primary key,
    image_url  nvarchar(500),
    project_id int                not null,
    foreign key (project_id) references projects (id)
);

-- bảng thành viên
create table member_project
(
    id           int auto_increment not null primary key,
    full_name    nvarchar(25)       not null,
    studens_code nvarchar(10),
    class_name   nvarchar(11),
    id_project   int                not null,
    foreign key (id_project) references projects (id)
)
