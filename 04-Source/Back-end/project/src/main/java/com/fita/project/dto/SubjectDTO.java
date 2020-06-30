package com.fita.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectDTO {
    private int id;
    private int subjectCode;
    private int subjectName;
    private int departmentCode;
}
