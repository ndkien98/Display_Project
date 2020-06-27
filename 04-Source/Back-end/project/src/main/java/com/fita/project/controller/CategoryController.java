package com.fita.project.controller;

import com.fita.project.dto.CategoryDTO;
import com.fita.project.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories/")
@CrossOrigin(value = "*", maxAge = -1)
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    // Lấy ra tất cả các thể loại
    @GetMapping("get-all")
    public ResponseEntity<?> getCategories() {
        return ResponseEntity.ok(categoryService.getCategories());
    }

    // Lấy ra thể loại theo "id"
    @GetMapping("get-by-id/{id}")
    public ResponseEntity<?> getCategory(@PathVariable int id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    // Thêm thể loại
    @PostMapping("add")
    public ResponseEntity<?> addCategory(@RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.ok(categoryService.addCategory(categoryDTO));
    }

    // Sửa thể loại
    @PutMapping("edit/{id}")
    public ResponseEntity<?> editCategory(@PathVariable int id, @RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.ok(categoryService.editCategory(id, categoryDTO));
    }

    // Xoá thể loại
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable int id) {
        return ResponseEntity.ok(categoryService.deleteCategory(id));
    }
}
