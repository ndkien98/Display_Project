package com.fita.project.controller;

import com.fita.project.dto.LecturerDTO;
import com.fita.project.dto.StudentDTO;
import com.fita.project.dto.UserDTO;
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

    //====================GET METHOD====================
    // Lấy ra tất cả các người dùng
    @GetMapping("get-all")
    public ResponseEntity<List<UserDTO>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    // Lấy ra người dùng theo "id"
    @GetMapping("get-by-id/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable int id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // Lấy ra tất cả các giảng viên
    @GetMapping("get-lecturers")
    public ResponseEntity<List<LecturerDTO>> getLecturers() {
        return ResponseEntity.ok(userService.getLecturers());
    }

    // Lấy ra tất cả các sinh viên
    @GetMapping("get-students")
    public ResponseEntity<List<StudentDTO>> getStudents() {
        return ResponseEntity.ok(userService.getStudents());
    }

    // Lấy ra giảng viên theo "id"
    @GetMapping("get-lecturer-by-id/{id}")
    public ResponseEntity<?> getLecturerById(@PathVariable int id) {
        return ResponseEntity.ok(userService.getLecturerById(id));
    }

    // Lấy ra sinh viên theo "id"
    @GetMapping("get-student-by-id/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable int id) {
        return ResponseEntity.ok(userService.getStudentById(id));
    }


    //====================POST METHOD====================
    // Thêm người dùng
    @PostMapping("add")
    public ResponseEntity<Boolean> addUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.addUser(userDTO));
    }

    // Thêm giảng viên
    @PostMapping("add-lecturer")
    public ResponseEntity<Boolean> addLecturer(@RequestBody LecturerDTO lecturerDTO) {
        return ResponseEntity.ok(userService.addLecturer(lecturerDTO));
    }

    // Thêm sinh viên
    @PostMapping("add-student")
    public ResponseEntity<Boolean> addStudent(@RequestBody StudentDTO studentDTO) {
        return ResponseEntity.ok(userService.addStudent(studentDTO));
    }


    //====================PUT METHOD====================
    // Sửa người dùng
    @PutMapping("edit/{id}")
    public ResponseEntity<Boolean> editUser(@PathVariable int id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.editUser(id, userDTO));
    }

    // Sửa giảng viên
    @PutMapping("edit-lecturer/{id}")
    public ResponseEntity<Boolean> editLecturer(@PathVariable int id, @RequestBody LecturerDTO lecturerDTO) {
        return ResponseEntity.ok(userService.editLecturer(id, lecturerDTO));
    }

    // Sửa sinh viên
    @PutMapping("edit-student/{id}")
    public ResponseEntity<Boolean> editStudent(@PathVariable int id, @RequestBody StudentDTO studentDTO) {
        return ResponseEntity.ok(userService.editStudent(id, studentDTO));
    }


    //====================DELETE METHOD====================
    // Xoá người dùng
    @DeleteMapping("delete/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable int id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }

    // Xoá giảng viên
    @DeleteMapping("delete-lecturer/{id}")
    public ResponseEntity<Boolean> deleteLecturer(@PathVariable int id) {
        return ResponseEntity.ok(userService.deleteLecturer(id));
    }

    // Xoá sinh viên
    @DeleteMapping("delete-student/{id}")
    public ResponseEntity<Boolean> deleteStudent(@PathVariable int id) {
        return ResponseEntity.ok(userService.deleteStudent(id));
    }
}
