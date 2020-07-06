package com.fita.project.service.impl;

import com.fita.project.dto.*;
import com.fita.project.repository.ProjectMemberRepository;
import com.fita.project.repository.ProjectRepository;
import com.fita.project.repository.entity.Project;
import com.fita.project.repository.entity.ProjectMember;
import com.fita.project.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProjectServiceImpl implements ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectMemberRepository projectMemberRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private YearSemesterService yearSemesterService;

    @Autowired
    private ModelMapper modelMapper;

    /**
     * Lấy tất cả các đồ án trong cơ sở dữ liệu
     *
     * @return List<ProjectDTO>
     */
    @Override
    public List<ProjectDTO> getProjects() {
        List<Project> projects = projectRepository.findAll();
        List<ProjectDTO> projectsDTO = new ArrayList<>();

        // Convert project (Entity) -> projectDTO (DTO)
        for (Project project : projects) {
            ProjectDTO projectDTO = convert(project);
            projectsDTO.add(projectDTO);
        }

        return projectsDTO;
    }

    /**
     * Lấy đồ án trong cơ sở dữ liệu dựa theo id
     *
     * @return ProjectDTO
     */
    @Override
    public ProjectDTO getProjectById(int id) {
        Project project = projectRepository.findById(id).get();

        // Convert project (Entity) -> projectDTO (DTO)
        ProjectDTO projectDTO = convert(project);

        return projectDTO;
    }

    @Override
    public List<ProjectDTO> getProjectsByStudentCode(String studentCode) {
        return null;
    }

    @Override
    public List<ProjectDTO> getProjectsByCategoryCode(String categoryCode) {
        return null;
    }

    private ProjectDTO convert(Project project) {
        ProjectDTO projectDTO = modelMapper.map(project, ProjectDTO.class);

        if (projectDTO.getCategoryCode() != null) {
            CategoryDTO categoryDTO = categoryService.getCategoryByCategoryCode(projectDTO.getCategoryCode());
            projectDTO.setCategoryName(categoryDTO.getCategoryName());
        }

        if (projectDTO.getStudentCode() != null) {
            StudentDTO studentDTO = userService.getStudentByStudentCode(projectDTO.getStudentCode());
            projectDTO.setStudentName(studentDTO.getFullName());
            projectDTO.setStudentClass(studentDTO.getClassCode());
        }

        if (projectDTO.getCourseId() != null) {
            CourseDTO courseDTO = courseService.getCourseById(projectDTO.getCourseId());
            projectDTO.setSubjectCode(courseDTO.getSubjectCode());
            projectDTO.setSubjectName(courseDTO.getSubjectName());
            projectDTO.setSubjectGroup(courseDTO.getSubjectGroup());
            projectDTO.setCourseClass(courseDTO.getClassCode());

            if (courseDTO.getYearSemesterId() != null) {
                YearSemesterDTO yearSemesterDTO = yearSemesterService.getYearSemesterById(courseDTO.getYearSemesterId());
                projectDTO.setYearSemesterId(yearSemesterDTO.getId());
                projectDTO.setYear(yearSemesterDTO.getYear());
                projectDTO.setSemester(yearSemesterDTO.getSemester());
            }

            if (courseDTO.getLecturerCode() != null) {
                LecturerDTO lecturerDTO = userService.getLecturerByLecturerCode(courseDTO.getLecturerCode());
                projectDTO.setLecturerCode(lecturerDTO.getUsername());
                projectDTO.setLecturerName(lecturerDTO.getFullName());
            }
        }

        projectDTO.setProjectMembers(getProjectMembers(projectDTO.getProjectCode()));

        return projectDTO;
    }

    private List<ProjectMemberDTO> getProjectMembers(String projectCode) {
        List<ProjectMember> projectMembers = projectMemberRepository.findByProjectCode(projectCode);
        List<ProjectMemberDTO> projectMembersDTO = new ArrayList<>();

        // Convert projectMember (Entity) -> projectMemberDTO (DTO)
        for (ProjectMember projectMember : projectMembers) {
            projectMembersDTO.add(modelMapper.map(projectMember, ProjectMemberDTO.class));
        }

        return projectMembersDTO;
    }

    /**
     * Xoá bộ môn trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     */
    @Override
    public void deleteProject(int id) {
        projectRepository.deleteById(id);
    }
}
