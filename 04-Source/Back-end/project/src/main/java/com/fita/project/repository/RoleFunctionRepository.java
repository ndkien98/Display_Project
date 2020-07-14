package com.fita.project.repository;

import com.fita.project.repository.entity.RoleFunction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface RoleFunctionRepository extends JpaRepository<RoleFunction, Integer> {
    List<RoleFunction> findByRoleId(int roleId);
    void deleteByRoleId(int roleId);
}
