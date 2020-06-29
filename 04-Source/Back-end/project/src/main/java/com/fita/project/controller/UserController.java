package com.fita.project.controller;

import com.fita.project.dto.LecturerDTO;
import com.fita.project.dto.StudentDTO;
import com.fita.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/users/", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(value = "*", maxAge = -1)
public class UserController {
    @Autowired
    private UserService userService;

    // Lấy ra tất cả giảng viên
    @GetMapping("get-lecturers")
    public ResponseEntity<List<LecturerDTO>> getLecturers() {
        return ResponseEntity.ok(userService.getLecturers());
    }

    // Lấy ra tất cả sinh viên
    @GetMapping("get-students")
    public ResponseEntity<List<StudentDTO>> getStudents() {
        return null;
    }

    // Lấy ra giảng viên theo "id"
    @GetMapping("get-lecturer-by-id/{id}")
    public ResponseEntity<?> getLecturerById(@PathVariable int id) {
        return null;
    }

    // Lấy ra sinh viên theo "id"
    @GetMapping("get-student-by-id/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable int id) {
        return null;
    }

    // Thêm giảng viên


    // Thêm sinh viên


    // Sửa giảng viên


    // Sửa sinh viên


    // Xoá giảng viên


    // Xoá sinh viên
}
