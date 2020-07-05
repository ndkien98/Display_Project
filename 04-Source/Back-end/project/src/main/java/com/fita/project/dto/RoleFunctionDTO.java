package com.fita.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleFunctionDTO {
    private int id;
    private int roleId;
    private String roleName;
    private int functionId;
    private String functionName;
    private String actionCode;
}
