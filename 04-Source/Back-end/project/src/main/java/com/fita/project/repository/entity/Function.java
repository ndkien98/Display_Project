package com.fita.project.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "functions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Function {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "function_name", length = 50, nullable = false, unique = true)
    private String functionName;

    @Column(name = "function_code", length = 20, nullable = false, unique = true)
    private String functionCode;

    @Column(name = "function_description")
    private String functionDescription;
}
