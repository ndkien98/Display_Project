package com.fita.project.service.impl;

import com.fita.project.dto.CategoryDTO;
import com.fita.project.repository.CategoryRepository;
import com.fita.project.repository.entity.Category;
import com.fita.project.service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    /**
     * Lấy tất cả các thể loại trong cơ sở dữ liệu
     *
     * @return List<CategoryDTO>
     */
    @Override
    public List<CategoryDTO> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDTO> categoriesDTO = new ArrayList<>();

        //Convert category (Entity) -> categoryDTO (DTO)
        for (Category category : categories) {
            categoriesDTO.add(modelMapper.map(category, CategoryDTO.class));
        }

        return categoriesDTO;
    }

    /**
     * Lấy thể loại trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return CategoryDTO
     */
    @Override
    public CategoryDTO getCategoryById(int id) {
        Category category = categoryRepository.findById(id).get();

        //Convert category (Entity) -> categoryDTO (DTO)
        CategoryDTO categoryDTO = modelMapper.map(category, CategoryDTO.class);

        return categoryDTO;
    }

    /**
     * Lấy thể loại trong cơ sở dữ liệu dựa theo id
     *
     * @param categoryCode
     * @return CategoryDTO
     */
    @Override
    public CategoryDTO getCategoryByCategoryCode(String categoryCode) {
        Category category = categoryRepository.findByCategoryCode(categoryCode);

        //Convert category (Entity) -> categoryDTO (DTO)
        CategoryDTO categoryDTO = modelMapper.map(category, CategoryDTO.class);

        return categoryDTO;
    }

    /**
     * Thêm 1 thể loại vào cơ sở dữ liệu
     *
     * @param categoryDTO
     */
    @Override
    public void addCategory(CategoryDTO categoryDTO) {
        categoryRepository.save(modelMapper.map(categoryDTO, Category.class));
    }

    /**
     * Sửa thể loại trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @param categoryDTO
     */
    @Override
    public void editCategory(int id, CategoryDTO categoryDTO) {
        // Lấy thể loại cần sửa
        Category categoryToUpdate = categoryRepository.getOne(id);

        // Cập nhật dữ liệu mới
        categoryToUpdate.setCategoryName(categoryDTO.getCategoryName());

        // Lưu lại vào cơ sở dữ liệu
        categoryRepository.save(categoryToUpdate);
    }

    /**
     * Xoá thể loại trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     */
    @Override
    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }
}
