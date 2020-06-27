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
import java.util.NoSuchElementException;

@Component
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    /**
     * Lấy tất cả các thể loại trong cơ sở dữ liệu
     *
     * @return danh sách các thể loại (nếu có), ngược lại trả về null
     */
    @Override
    public List<CategoryDTO> getCategories() {
        try {
            List<Category> categories = categoryRepository.findAll();
            List<CategoryDTO> categoriesDTO = new ArrayList<>();

            //Convert category (Entity) -> categoryDTO (DTO)
            for (Category category : categories) {
                categoriesDTO.add(modelMapper.map(category, CategoryDTO.class));
            }

            return categoriesDTO;
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    /**
     * Lấy thể loại trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return thể loại lấy được (nếu có), ngược lại trả về null
     */
    @Override
    public CategoryDTO getCategoryById(int id) {
        try {
            Category category = categoryRepository.findById(id).get();

            //Convert category (Entity) -> categoryDTO (DTO)
            CategoryDTO categoryDTO = modelMapper.map(category, CategoryDTO.class);

            return  categoryDTO;
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    /**
     * Thêm 1 thể loại vào cơ sở dữ liệu
     *
     * @param categoryDTO
     * @return true nếu thêm thành công, ngược lại trả về false
     */
    @Override
    public boolean addCategory(CategoryDTO categoryDTO) {
        try {
            categoryRepository.save(modelMapper.map(categoryDTO, Category.class));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Sửa thể loại trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return true nếu sửa thành công, ngược lại trả về false
     */
    @Override
    public boolean editCategory(int id, CategoryDTO categoryDTO) {
        try {
            // Lấy thể loại cần sửa
            Category categoryToUpdate = categoryRepository.getOne(id);

            // Cập nhật dữ liệu mới
            categoryToUpdate.setCategoryName(categoryDTO.getCategoryName());

            // Lưu lại vào cơ sở dữ liệu
            categoryRepository.save(categoryToUpdate);

            return true;
        } catch (Exception e) {
            return false;
        }
    }
    /**
     * Xoá thể loại trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return true nếu xoá thành công, ngược lại trả về false
     */
    @Override
    public boolean deleteCategory(int id) {
        try {
            categoryRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
