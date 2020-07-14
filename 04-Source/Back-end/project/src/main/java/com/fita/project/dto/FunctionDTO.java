package com.fita.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FunctionDTO {
    private int id;
    private String functionName;
    private String actionCode;
    private int status;
}
