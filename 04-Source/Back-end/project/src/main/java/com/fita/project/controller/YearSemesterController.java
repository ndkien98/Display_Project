package com.fita.project.controller;

import com.fita.project.dto.YearSemesterDTO;
import com.fita.project.service.YearSemesterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/years-semesters/")
public class YearSemesterController {
    @Autowired
    YearSemesterService yearSemesterService;

    // Lấy ra tất cả các năm học - học kỳ
    @GetMapping("get-all")
    public ResponseEntity<?> getYearsSemesters() {
        return ResponseEntity.ok(yearSemesterService.getYearsSemesters());
    }

    // Lấy ra năm học - học kỳ theo "id"
    @GetMapping("get-by-id/{id}")
    public ResponseEntity<?> getYearSemester(@PathVariable int id) {
        return ResponseEntity.ok(yearSemesterService.getYearSemesterById(id));
    }

    // Thêm năm học - học kỳ
    @PostMapping("add")
    public ResponseEntity<?> addYearSemester(@RequestBody YearSemesterDTO yearSemesterDTO) {
        return ResponseEntity.ok(yearSemesterService.addYearSemester(yearSemesterDTO));
    }

    //Sửa năm học - học kỳ
    @PutMapping("edit/{id}")
    public ResponseEntity<?> editYearSemester(@PathVariable int id, @RequestBody YearSemesterDTO yearSemesterDTO) {
        return ResponseEntity.ok(yearSemesterService.editYearSemester(id, yearSemesterDTO));
    }

    // Xóa năm học - học kỳ
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteYearSemester(@PathVariable int id) {
        return ResponseEntity.ok(yearSemesterService.deleteYearSemester(id));
    }
}
