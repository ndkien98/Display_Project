package com.fita.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO {
    private int id;
    private String projectName;
    private String projectAvatarUrl;
    private String shortDescription;
    private String detailedDescription;
    private String demoLink;
    private int categoryId;
    private String categoryName;
    private String studentCode;
    private String studentName;
    private int courseId;
    private String subjectCode;
    private String subjectName;
    private int subjectGroup;
    private String classCode;
    private int yearSemesterId;
    private int year;
    private int semester;
    private String lecturerCode;
    private String lecturerName;
    private int status;
    private String createdDate;
    private String createdBy;
    private String lastModifiedBy;
    private String lastModifiedDate;
}
