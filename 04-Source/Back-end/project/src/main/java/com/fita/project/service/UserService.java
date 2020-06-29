package com.fita.project.service;

import com.fita.project.dto.LecturerDTO;
import com.fita.project.dto.StudentDTO;
import com.fita.project.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    // Lấy ra tất cả người dùng


    // Lấy ra người dùng theo "id"

    // Lấy ra người dùng theo username
    UserDTO getUserByUsername(String username);

    // Lấy ra tất cả giảng viên
    List<LecturerDTO> getLecturers();

    // Lấy ra tất cả sinh viên
    List<StudentDTO> getStudents();

    // Lấy ra giảng viên theo "id"
    LecturerDTO getLecturerById(int id);

    // Lấy ra sinh viên theo "id"
    StudentDTO getStudentById(int id);


    // Thêm giảng viên
    boolean addLecturer(LecturerDTO lecturerDTO);


    // Thêm sinh viên
    boolean addLecturer(StudentDTO studentDTO);


    // Sửa giảng viên



    // Sửa sinh viên




    // Xoá giảng viên




    // Xoá sinh viên




}
