package com.fita.project.controller;

import com.fita.project.dto.CategoryDTO;
import com.fita.project.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/categories/", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(value = "*", maxAge = -1)
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    // Lấy ra tất cả các thể loại
    @GetMapping("get-all")
    public ResponseEntity<List<CategoryDTO>> getCategories() {
        return ResponseEntity.ok(categoryService.getCategories());
    }

    // Lấy ra thể loại theo "id"
    @GetMapping("get-by-id/{id}")
    public ResponseEntity<CategoryDTO> getCategory(@PathVariable int id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    // Thêm thể loại
    @PostMapping("add")
    public ResponseEntity<Boolean> addCategory(@RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.ok(categoryService.addCategory(categoryDTO));
    }

    // Sửa thể loại
    @PutMapping("edit/{id}")
    public ResponseEntity<Boolean> editCategory(@PathVariable int id, @RequestBody CategoryDTO categoryDTO) {
        return ResponseEntity.ok(categoryService.editCategory(id, categoryDTO));
    }

    // Xoá thể loại
    @DeleteMapping("delete/{id}")
    public ResponseEntity<Boolean> deleteCategory(@PathVariable int id) {
        return ResponseEntity.ok(categoryService.deleteCategory(id));
    }
}
