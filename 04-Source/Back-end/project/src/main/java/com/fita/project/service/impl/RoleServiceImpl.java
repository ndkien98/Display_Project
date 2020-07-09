package com.fita.project.service.impl;

import com.fita.project.dto.RoleDTO;
import com.fita.project.repository.RoleRepository;
import com.fita.project.repository.entity.Role;
import com.fita.project.service.RoleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ModelMapper modelMapper;

    private List<Role> roles;
    private List<RoleDTO> rolesDTO;
    private Role role;
    private RoleDTO roleDTO;

    @Override
    public List<RoleDTO> getRoles() {
        roles = roleRepository.findAll();
        rolesDTO = new ArrayList<>();

        // Convert role (Entity) -> roleDTO (DTO)
        for (Role role : roles) {
            rolesDTO.add(modelMapper.map(role, RoleDTO.class));
        }

        return rolesDTO;
    }

    /**
     * Lấy quyền trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return roleDTO
     */
    @Override
    public RoleDTO getRoleById(int id) {
        role = roleRepository.findById(id).get();

        //Convert role (Entity) -> roleDTO (DTO)
        roleDTO = modelMapper.map(role, RoleDTO.class);

        return roleDTO;
    }

    /**
     * Thêm 1 quyền vào cơ sở dữ liệu
     *
     * @param roleDTO
     */
    @Override
    public void addRole(RoleDTO roleDTO) {

    }

    /**
     * Sửa quyền trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @param roleDTO
     */
    @Override
    public void editRole(int id, RoleDTO roleDTO) {

    }

    /**
     * Xoá quyền trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     */
    @Override
    public void deleteRole(int id) {

    }
}
