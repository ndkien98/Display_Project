package com.fita.project.service;

import com.fita.project.dto.LecturerDTO;
import com.fita.project.dto.StudentDTO;
import com.fita.project.dto.UserDTO;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    // Lấy ra tất cả giảng viên
    UserDTO getLecturers();

    // Lấy ra tất cả sinh viên
    UserDTO getStudents();

    // Lấy ra giảng viên theo "id"
    UserDTO getLecturerById(int id);

    // Lấy ra sinh viên theo "id"
    UserDTO getStudentById(int id);


    // Thêm giảng viên
    boolean addLecturer(LecturerDTO lecturerDTO);


    // Thêm sinh viên
    boolean addLecturer(StudentDTO studentDTO);


    // Sửa giảng viên



    // Sửa sinh viên




    // Xoá giảng viên




    // Xoá sinh viên







}
