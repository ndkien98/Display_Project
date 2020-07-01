package com.fita.project.service;

import com.fita.project.dto.LecturerDTO;
import com.fita.project.dto.StudentDTO;
import com.fita.project.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    //====================NGƯỜI DÙNG====================
    // Lấy ra tất cả người dùng
    List<UserDTO> getUsers();

    // Lấy ra người dùng theo "id"
    UserDTO getUserById(int id);

    // Lấy ra người dùng theo username
    UserDTO getUserByUsername(String username);

    // Thêm người dùng
    boolean addUser(UserDTO userDTO);

    // Sửa người dùng
    boolean editUser(int id, UserDTO userDTO);

    // Xoá người dùng
    boolean deleteUser(int id);


    //====================GIẢNG VIÊN====================
    // Lấy ra tất cả giảng viên
    List<LecturerDTO> getLecturers();

    // Lấy ra giảng viên theo "id"
    LecturerDTO getLecturerById(int id);

    // Thêm giảng viên
    boolean addLecturer(LecturerDTO lecturerDTO);

    // Sửa giảng viên
    boolean editLecturer(int id, LecturerDTO lecturerDTO);

    // Xoá giảng viên
    boolean deleteLecturer(int id);


    //====================SINH VIÊN====================
    // Lấy ra tất cả sinh viên
    List<StudentDTO> getStudents();

    // Lấy ra sinh viên theo "id"
    StudentDTO getStudentById(int id);

    // Thêm sinh viên
    boolean addStudent(StudentDTO studentDTO);

    // Sửa sinh viên
    boolean editStudent(int id, StudentDTO studentDTO);

    // Xoá sinh viên
    boolean deleteStudent(int id);
}