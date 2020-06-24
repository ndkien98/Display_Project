package com.fita.project.service;

import com.fita.project.dto.CategoryDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {
    // Lấy ra tất cả các thể loại
    List<CategoryDTO> getCategories();

    // Lấy ra thể loại theo "id"
    CategoryDTO getCategoryById(int id);

    // Thêm thể loại
    boolean addCategory(CategoryDTO categoryDTO);

    // Sửa thể loại
    boolean editCategory(int id, CategoryDTO categoryDTO);

    // Xoá thể loại
    boolean deleteCategory(int id);

}
