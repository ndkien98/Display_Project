package com.fita.project.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "lecturers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lecturer {
    @Id
    @Column(name = "leturer_code", length = 10, nullable = false)
    private String lecturerCode;

    @Column(name = "role_id", nullable = false)
    private Integer roleId;

    @Column(name = "department_code", length = 5, nullable = false)
    private String departmentCode;
}
