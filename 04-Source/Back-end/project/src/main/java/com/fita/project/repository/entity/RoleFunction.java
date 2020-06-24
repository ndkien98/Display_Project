package com.fita.project.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleFunction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "role_id", nullable = false)
    private int roleId;

    @Column(name = "function_id", nullable = false)
    private int functionId;

    @Column(name = "status", nullable = false)
    private int status;
}
