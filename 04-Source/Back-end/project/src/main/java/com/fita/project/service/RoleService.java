package com.fita.project.service;

import com.fita.project.dto.FunctionDTO;
import com.fita.project.dto.RoleDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoleService {
    // Lấy ra tất cả các nhóm quyền
    List<RoleDTO> getRoles();

    // Lấy ra nhóm quyền theo "id"
    RoleDTO getRoleById(int id);

    // Lấy ra nhóm quyền theo "tên quyền"
    RoleDTO getRoleByRoleName(String roleName);

    // Lấy ra tất cả các chức năng
    List<FunctionDTO> getFunctions();

    // Lấy ra chức năng theo "id"
    FunctionDTO getFunctionById(int functionId);

    // Thêm nhóm quyền
    void addRole(RoleDTO roleDTO);

    // Sửa nhóm quyền
    void editRole(int id, RoleDTO roleDTO);

    // Xoá nhóm quyền
    void deleteRole(int id);
}
