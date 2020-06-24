package com.fita.project.service;

import com.fita.project.dto.DepartmentDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DepartmentService {
    // Lấy ra tất cả các bộ môn
    List<DepartmentDTO> getDepartments();

    // Lấy ra bộ môn theo "id"
    DepartmentDTO getDepartmentById(int id);

    // Thêm bộ môn
    boolean addDepartment(DepartmentDTO departmentDTO);

    // Sửa bộ môn
    boolean editDepartment(int id, DepartmentDTO departmentDTO);

    // Xoá bộ môn
    boolean deleteDepartment(int id);
}
