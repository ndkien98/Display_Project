package com.fita.project.controller;

import com.fita.project.dto.DepartmentDTO;
import com.fita.project.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/departments/")
@CrossOrigin(origins = "*", maxAge = -1)
public class DepartmentController {
    @Autowired
    DepartmentService departmentService;

    // Lấy ra tất cả các bộ môn
    @GetMapping("get-all")
    public ResponseEntity<?> getDepartments() {
        return ResponseEntity.ok(departmentService.getDepartments());
    }

    // Lấy ra bộ môn theo "id"
    @GetMapping("get-by-id/{id}")
    public ResponseEntity<?> getDepartment(@PathVariable int id) {
        return ResponseEntity.ok(departmentService.getDepartmentById(id));
    }

    // Thêm bộ môn
    @PostMapping(value = "add" ,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addDepartment(@RequestBody DepartmentDTO departmentDTO) {
        return ResponseEntity.ok(departmentService.addDepartment(departmentDTO));
    }

    // Sửa bộ môn
    @PutMapping("edit/{id}")
    public ResponseEntity<?> editDepartment(@PathVariable int id, @RequestBody DepartmentDTO departmentDTO) {
        return ResponseEntity.ok(departmentService.editDepartment(id, departmentDTO));
    }

    // Xoá bộ môn
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteDepartment(@PathVariable int id) {
        return ResponseEntity.ok(departmentService.deleteDepartment(id));
    }
}
