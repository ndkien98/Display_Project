package com.fita.project.controller;

import com.fita.project.dto.YearSemesterDTO;
import com.fita.project.service.YearSemesterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/years-semesters/", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(value = "*", maxAge = -1)
public class YearSemesterController {
    @Autowired
    private YearSemesterService yearSemesterService;

    // Lấy ra tất cả các năm học - học kỳ
    @GetMapping("get-all")
    public ResponseEntity<List<YearSemesterDTO>> getYearsSemesters() {
        return ResponseEntity.ok(yearSemesterService.getYearsSemesters());
    }

    // Lấy ra năm học - học kỳ theo "id"
    @GetMapping("get-by-id/{id}")
    public ResponseEntity<YearSemesterDTO> getYearSemester(@PathVariable int id) {
        return ResponseEntity.ok(yearSemesterService.getYearSemesterById(id));
    }

    // Thêm năm học - học kỳ
    @PostMapping("add")
    public ResponseEntity<Boolean> addYearSemester(@RequestBody YearSemesterDTO yearSemesterDTO) {
        return ResponseEntity.ok(yearSemesterService.addYearSemester(yearSemesterDTO));
    }

    //Sửa năm học - học kỳ
    @PutMapping("edit/{id}")
    public ResponseEntity<Boolean> editYearSemester(@PathVariable int id, @RequestBody YearSemesterDTO yearSemesterDTO) {
        return ResponseEntity.ok(yearSemesterService.editYearSemester(id, yearSemesterDTO));
    }

    // Xóa năm học - học kỳ
    @DeleteMapping("delete/{id}")
    public ResponseEntity<Boolean> deleteYearSemester(@PathVariable int id) {
        return ResponseEntity.ok(yearSemesterService.deleteYearSemester(id));
    }
}
