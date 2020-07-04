package com.fita.project.service;

import com.fita.project.dto.RoleDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoleService {
    // Lấy ra tất cả các quyền
    List<RoleDTO> getRoles();

    // Lấy ra quyền theo "id"
    RoleDTO getRoleById(int id);

    // Thêm quyền
    void addRole(RoleDTO roleDTO);

    // Sửa quyền
    void editRole(int id, RoleDTO roleDTO);

    // Xoá quyền
    void deleteRole(int id);
}
