package com.fita.project.controller;

import com.fita.project.dto.SubjectDTO;
import com.fita.project.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/subject/")
@CrossOrigin(value = "*", maxAge = -1)
public class SubjectController {
    @Autowired
    SubjectService subjectService;

    // Lấy ra tất cả các môn học
    @GetMapping("get-all")
    public ResponseEntity<?> getSubjects() {
        return ResponseEntity.ok(subjectService.getSubjects());
    }

    // Lấy ra môn học theo "id"
    @GetMapping("get-by-id/{id}")
    public ResponseEntity<?> getSubject(@PathVariable int id) {
        return ResponseEntity.ok(subjectService.getSubjectById(id));
    }

    // Thêm môn học
    @PostMapping("add")
    public ResponseEntity<?> addSubject(@RequestBody SubjectDTO subjectDTO) {
        return ResponseEntity.ok(subjectService.addSubject(subjectDTO));
    }

    //Sửa môn học
    @PutMapping("edit/{id}")
    public ResponseEntity<?> editSubject(@PathVariable int id, @RequestBody SubjectDTO subjectDTO) {
        return ResponseEntity.ok(subjectService.editSubject(id, subjectDTO));
    }

    // Xóa môn học
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteSubject(@PathVariable int id) {
        return ResponseEntity.ok(subjectService.deleteSubject(id));
    }
}
