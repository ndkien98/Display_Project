package com.fita.project.service.impl;

import com.fita.project.dto.DepartmentDTO;
import com.fita.project.repository.DepartmentRepository;
import com.fita.project.repository.entity.Department;
import com.fita.project.service.DepartmentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Component
public class DepartmentServiceImpl implements DepartmentService {
    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    ModelMapper modelMapper;

    /**
     * Lấy tất cả các bộ môn trong cơ sở dữ liệu
     *
     * @return danh sách các bộ môn (nếu có), ngược lại trả về null
     */
    @Override
    public List<DepartmentDTO> getDepartments() {
        try {
            List<Department> departments = departmentRepository.findAll();
            List<DepartmentDTO> departmentsDTO = new ArrayList<>();

            //Convert department (Entity) -> departmentDTO (DTO)
            for (Department department : departments) {
                departmentsDTO.add(modelMapper.map(department, DepartmentDTO.class));
            }

            return departmentsDTO;
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    /**
     * Lấy bộ môn trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return bộ môn lấy được (nếu có), ngược lại trả về null
     */
    @Override
    public DepartmentDTO getDepartmentById(int id) {
        try {
            Department department = departmentRepository.findById(id).get();

            //Convert department (Entity) -> departmentDTO (DTO)
            DepartmentDTO departmentDTO = modelMapper.map(department, DepartmentDTO.class);

            return  departmentDTO;
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    /**
     * Thêm 1 bộ môn vào cơ sở dữ liệu
     *
     * @param departmentDTO
     * @return true nếu thêm thành công, ngược lại trả về false
     */
    @Override
    public boolean addDepartment(DepartmentDTO departmentDTO) {
        try {
            departmentRepository.save(modelMapper.map(departmentDTO, Department.class));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Sửa bộ môn trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return true nếu sửa thành công, ngược lại trả về false
     */
    @Override
    public boolean editDepartment(int id, DepartmentDTO departmentDTO) {
        try {
            // Lấy bộ môn cần sửa
            Department departmentToUpdate = departmentRepository.getOne(id);

            // Cập nhật dữ liệu mới
            departmentToUpdate.setDepartmentCode(departmentDTO.getDepartmentCode());
            departmentToUpdate.setDepartmentName(departmentDTO.getDepartmentName());

            // Lưu lại vào cơ sở dữ liệu
            departmentRepository.save(departmentToUpdate);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Xoá bộ môn trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return true nếu xoá thành công, ngược lại trả về false
     */
    @Override
    public boolean deleteDepartment(int id) {
        try {
            departmentRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
