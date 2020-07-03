package com.fita.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {
    private int id;
    private String subjectCode;
    private String subjectName;
    private int subjectGroup;
    private String classCode;
    private int yearSemesterId;
    private int year;
    private int semester;
    private String lecturerCode;
    private String lecturerName;
    private String createdDate;
    private String createdBy;
    private String lastModifiedDate;
}
