package com.fita.project.service.impl;

import com.fita.project.dto.FunctionDTO;
import com.fita.project.dto.RoleDTO;
import com.fita.project.repository.FunctionRepository;
import com.fita.project.repository.RoleFunctionRepository;
import com.fita.project.repository.RoleRepository;
import com.fita.project.repository.entity.Function;
import com.fita.project.repository.entity.Role;
import com.fita.project.repository.entity.RoleFunction;
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
    private FunctionRepository functionRepository;

    @Autowired
    private RoleFunctionRepository roleFunctionRepository;

    @Autowired
    private ModelMapper modelMapper;

    private List<Role> roles;
    private List<RoleDTO> rolesDTO;
    private Role role;
    private RoleDTO roleDTO;
    private List<Function> functions;
    private List<FunctionDTO> functionsDTO;
    private Function function;
    private FunctionDTO functionDTO;
    private List<RoleFunction> roleFunctions;

    /**
     * Lấy tất cả nhóm quyền trong cơ sở dữ liệu
     *
     * @return List<RoleDTO>
     */
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
     * Lấy nhóm quyền trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return roleDTO
     */
    @Override
    public RoleDTO getRoleById(int id) {
        role = roleRepository.findById(id).get();

        //Convert role (Entity) -> roleDTO (DTO)
        roleDTO = modelMapper.map(role, RoleDTO.class);
        roleFunctions = roleFunctionRepository.findByRoleId(roleDTO.getId());
        functionsDTO = new ArrayList<>();

        for (RoleFunction roleFunction : roleFunctions) {
            functionDTO = getFunctionById(roleFunction.getFunctionId());
            functionDTO.setStatus(roleFunction.getStatus());

            functionsDTO.add(functionDTO);
        }

        roleDTO.setFunctionsDTO(functionsDTO);

        return roleDTO;
    }
    /**
     * Lấy nhóm quyền trong cơ sở dữ liệu dựa theo tên quyền
     *
     * @param roleName
     * @return roleDTO
     */
    @Override
    public RoleDTO getRoleByRoleName(String roleName) {
        role = roleRepository.findByRoleName(roleName);

        //Convert role (Entity) -> roleDTO (DTO)
        roleDTO = modelMapper.map(role, RoleDTO.class);

        return roleDTO;
    }

    /**
     * Lấy tất cả chức năng trong cơ sở dữ liệu
     *
     * @return List<FunctionDTO>
     */
    @Override
    public List<FunctionDTO> getFunctions() {
        functions = functionRepository.findAll();
        functionsDTO = new ArrayList<>();

        // Convert function (Entity) -> functionDTO (DTO)
        for (Function function : functions) {
            functionsDTO.add(modelMapper.map(function, FunctionDTO.class));
        }

        return functionsDTO;
    }

    /**
     * Lấy chức năng trong cơ sở dữ liệu dựa theo id
     *
     * @param functionId
     * @return List<FunctionDTO>
     */
    @Override
    public FunctionDTO getFunctionById(int functionId) {
        function = functionRepository.findById(functionId).get();

        // Convert function (Entity) -> functionDTO (DTO)
        functionDTO = modelMapper.map(function, FunctionDTO.class);

        return functionDTO;
    }

    /**
     * Thêm 1 nhóm quyền vào cơ sở dữ liệu
     *
     * @param roleDTO
     */
    @Override
    public void addRole(RoleDTO roleDTO) {
        role = modelMapper.map(roleDTO, Role.class);
        roleRepository.save(role);

        functionsDTO = roleDTO.getFunctionsDTO();
        for (FunctionDTO functionDTO : functionsDTO) {
            RoleFunction roleFunction = new RoleFunction();
            roleFunction.setRoleId(getRoleByRoleName(roleDTO.getRoleName()).getId());
            roleFunction.setFunctionId(functionDTO.getId());
            roleFunction.setStatus(functionDTO.getStatus());

            roleFunctionRepository.save(roleFunction);
        }
    }

    /**
     * Sửa nhóm quyền trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @param roleDTO
     */
    @Override
    public void editRole(int id, RoleDTO roleDTO) {

    }

    /**
     * Xoá nhóm quyền trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     */
    @Override
    public void deleteRole(int id) {

    }
}
