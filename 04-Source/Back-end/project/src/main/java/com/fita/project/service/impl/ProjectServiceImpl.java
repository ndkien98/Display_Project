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

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

    private List<Project> projects;
    private List<ProjectDTO> projectsDTO;
    private Project project;
    private ProjectDTO projectDTO;
    private CategoryDTO categoryDTO;
    private StudentDTO studentDTO;
    private CourseDTO courseDTO;
    private YearSemesterDTO yearSemesterDTO;
    private LecturerDTO lecturerDTO;

    /**
     * Lấy tất cả các đồ án trong cơ sở dữ liệu
     *
     * @return List<ProjectDTO>
     */
    @Override
    public List<ProjectDTO> getProjects() {
        projects = projectRepository.findAll();
        projectsDTO = new ArrayList<>();

        // Convert project (Entity) -> projectDTO (DTO)
        for (Project project : projects) {
            projectDTO = convert(project);
            projectsDTO.add(projectDTO);
        }

        return projectsDTO;
    }

    /**
     * Lấy đồ án trong cơ sở dữ liệu dựa theo trạng thái
     *
     * @param status
     * @return ProjectDTO
     */
    @Override
    public List<ProjectDTO> getProjectsByStatus(int status) {
        projects = projectRepository.findByStatus(status);
        projectsDTO = new ArrayList<>();

        //Convert project (Entity) -> project (DTO)
        for (Project project : projects) {
            projectDTO = convert(project);
            projectsDTO.add(projectDTO);
        }

        return projectsDTO;
    }

    /**
     * Lấy đồ án trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return ProjectDTO
     */
    @Override
    public ProjectDTO getProjectById(int id) {
        project = projectRepository.findById(id).get();

        // Convert project (Entity) -> projectDTO (DTO)
        projectDTO = convert(project);

        return projectDTO;
    }

    /**
     * Lấy đồ án trong cơ sở dữ liệu dựa theo mã đồ án
     *
     * @param projectCode
     * @return ProjectDTO
     */
    @Override
    public ProjectDTO getProjectByProjectCode(String projectCode) {
        project = projectRepository.findByProjectCode(projectCode);

        // Convert project (Entity) -> project (DTO)
        projectDTO = convert(project);

        return projectDTO;
    }

    /**
     * Lấy đồ án trong cơ sở dữ liệu dựa theo mã sinh viên
     *
     * @param studentCode
     * @return ProjectDTO
     */
    @Override
    public List<ProjectDTO> getProjectsByStudentCode(String studentCode) {
        projects = projectRepository.findByStudentCode(studentCode);
        projectsDTO = new ArrayList<>();

        // Convert project (Entity) -> project (DTO)
        for (Project project : projects) {
            projectDTO = convert(project);
            projectsDTO.add(projectDTO);
        }

        return projectsDTO;
    }

    /**
     * Lấy đồ án trong cơ sở dữ liệu dựa theo mã thể loại
     *
     * @param categoryCode
     * @return ProjectDTO
     */
    @Override
    public List<ProjectDTO> getProjectsByCategoryCode(String categoryCode) {
        projects = projectRepository.findByCategoryCode(categoryCode);
        projectsDTO = new ArrayList<>();

        // Convert project (Entity) -> project (DTO)
        for (Project project : projects) {
            projectDTO = convert(project);
            projectsDTO.add(projectDTO);
        }

        return projectsDTO;
    }

    /**
     * Lấy đồ án trong cơ sở dữ liệu dựa theo mã giảng viên
     *
     * @param lecturerCode
     * @return ProjectDTO
     */
    @Override
    public List<ProjectDTO> getProjectsByLecturerCode(String lecturerCode) {
        projects = projectRepository.findByLectureCode(lecturerCode);
        projectsDTO = new ArrayList<>();

        // Convert project (Entity) -> project (DTO)
        for (Project project : projects) {
            projectDTO = convert(project);
            projectsDTO.add(projectDTO);
        }

        return projectsDTO;
    }

    /**
     * Lấy đồ án trong cơ sở dữ liệu dựa theo lớp học phần id
     *
     * @param courseId
     * @return ProjectDTO
     */
    @Override
    public List<ProjectDTO> getProjectsByCourseId(int courseId) {
        projects = projectRepository.findByCourseId(courseId);
        projectsDTO = new ArrayList<>();

        // Convert project (Entity) -> project (DTO)
        for (Project project : projects) {
            projectDTO = convert(project);
            projectsDTO.add(projectDTO);
        }

        return projectsDTO;
    }

    /**
     * Lấy đồ án trong cơ sở dữ liệu dựa theo năm học - học kỳ id
     *
     * @param yearSemesterId
     * @return ProjectDTO
     */
    @Override
    public List<ProjectDTO> getProjectsByYearSemesterId(int yearSemesterId) {
        projects = projectRepository.findByYearSemesterId(yearSemesterId);
        projectsDTO = new ArrayList<>();

        // Convert project (Entity) -> project (DTO)
        for (Project project : projects) {
            projectDTO = convert(project);
            projectsDTO.add(projectDTO);
        }

        return projectsDTO;
    }

    /**
     * Lấy đồ án trong cơ sở dữ liệu dựa theo mã giảng viên + trạng thái
     *
     * @param lecturerCode
     * @param status
     * @return ProjectDTO
     */
    @Override
    public List<ProjectDTO> getProjects(String lecturerCode, int status) {
        projects = projectRepository.findByLectureCodeAndStatus(lecturerCode, status);
        projectsDTO = new ArrayList<>();

        // Convert project (Entity) -> project (DTO)
        for (Project project : projects) {
            projectDTO = convert(project);
            projectsDTO.add(projectDTO);
        }

        return projectsDTO;
    }

    /**
     * Lấy đồ án trong cơ sở dữ liệu dựa theo mã giảng viên + trạng thái + năm học - học kỳ id
     *
     * @param lecturerCode
     * @param status
     * @param yearSemesterId
     * @return ProjectDTO
     */
    @Override
    public List<ProjectDTO> getProjects(String lecturerCode, int status, int yearSemesterId) {
        projects = projectRepository.findByLectureCodeAndStatusAndYearSemesterId(lecturerCode, status, yearSemesterId);
        projectsDTO = new ArrayList<>();

        // Convert project (Entity) -> project (DTO)
        for (Project project : projects) {
            projectDTO = convert(project);
            projectsDTO.add(projectDTO);
        }

        return projectsDTO;
    }

    /**
     * Thêm 1 đồ án vào cơ sở dữ liệu
     *
     * @param projectDTO
     */
    @Override
    public void addProject(ProjectDTO projectDTO) {
        project = modelMapper.map(projectDTO, Project.class);

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = dateFormat.format(new Date());
        project.setCreatedDate(date);
        project.setLastModifiedDate(date);

        projectRepository.save(project);
        saveProjectMember(projectDTO);
    }

    /**
     * Sửa đồ án trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @param projectDTO
     */
    @Override
    public void editProject(int id, ProjectDTO projectDTO) {
        // Lấy đồ án cần sửa
        Project projectToUpdate = projectRepository.getOne(id);

        // Cập nhật dữ liệu mới
        projectToUpdate.setProjectCode(projectDTO.getProjectCode());
        projectToUpdate.setProjectName(projectDTO.getProjectName());
        projectToUpdate.setProjectAvatarUrl(projectDTO.getProjectAvatarUrl());
        projectToUpdate.setShortDescription(projectDTO.getShortDescription());
        projectToUpdate.setDetailedDescription(projectDTO.getDetailedDescription());
        projectToUpdate.setDemoLink(projectDTO.getDemoLink());
        projectToUpdate.setCategoryCode(projectDTO.getCategoryCode());
        projectToUpdate.setStudentCode(projectDTO.getStudentCode());
        projectToUpdate.setCourseId(projectDTO.getCourseId());
        projectToUpdate.setStatus(projectDTO.getStatus());
        //projectToUpdate.setCreatedDate(projectDTO.getCreatedDate());
        //projectToUpdate.setCreatedBy(projectDTO.getCreatedBy());
        projectToUpdate.setLastModifiedBy(projectDTO.getLastModifiedBy());

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        projectToUpdate.setLastModifiedDate(dateFormat.format(new Date()));

        // Cập nhật thành viên project
        projectMemberRepository.deleteByProjectCode(projectDTO.getProjectCode());
        saveProjectMember(projectDTO);

        // Lưu lại vào cơ sở dữ liệu
        projectRepository.save(projectToUpdate);
    }

    /**
     * Xoá đồ án trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     */
    @Override
    public void deleteProject(int id) {
        projectMemberRepository.deleteByProjectCode(getProjectById(id).getProjectCode());
        projectRepository.deleteById(id);
    }

    private ProjectDTO convert(Project project) {
        projectDTO = modelMapper.map(project, ProjectDTO.class);

        if (projectDTO.getCategoryCode() != null) {
            categoryDTO = categoryService.getCategoryByCategoryCode(projectDTO.getCategoryCode());
            projectDTO.setCategoryName(categoryDTO.getCategoryName());
        }

        if (projectDTO.getStudentCode() != null) {
            studentDTO = userService.getStudentByStudentCode(projectDTO.getStudentCode());
            projectDTO.setStudentName(studentDTO.getFullName());
            projectDTO.setStudentClass(studentDTO.getClassCode());
        }

        if (projectDTO.getCourseId() != null) {
            courseDTO = courseService.getCourseById(projectDTO.getCourseId());
            projectDTO.setSubjectCode(courseDTO.getSubjectCode());
            projectDTO.setSubjectName(courseDTO.getSubjectName());
            projectDTO.setSubjectGroup(courseDTO.getSubjectGroup());
            projectDTO.setCourseClass(courseDTO.getClassCode());

            if (courseDTO.getYearSemesterId() != null) {
                yearSemesterDTO = yearSemesterService.getYearSemesterById(courseDTO.getYearSemesterId());
                projectDTO.setYearSemesterId(yearSemesterDTO.getId());
                projectDTO.setYear(yearSemesterDTO.getYear());
                projectDTO.setSemester(yearSemesterDTO.getSemester());
            }

            if (courseDTO.getLecturerCode() != null) {
                lecturerDTO = userService.getLecturerByLecturerCode(courseDTO.getLecturerCode());
                projectDTO.setLecturerCode(lecturerDTO.getUsername());
                projectDTO.setLecturerName(lecturerDTO.getFullName());
            }
        }

        projectDTO.setProjectMembers(getProjectMembers(projectDTO.getProjectCode()));

        return projectDTO;
    }

    private void saveProjectMember(ProjectDTO projectDTO) {
        List<ProjectMemberDTO> projectMembersDTO = projectDTO.getProjectMembers();
        for (ProjectMemberDTO projectMemberDTO : projectMembersDTO) {
            ProjectMember projectMember = new ProjectMember();
            projectMember.setStudentCode(projectMemberDTO.getStudentCode());
            projectMember.setFullName(projectMemberDTO.getFullName());
            projectMember.setClassCode(projectMemberDTO.getClassCode());
            projectMember.setProjectCode(projectDTO.getProjectCode());

            projectMemberRepository.save(projectMember);
        }
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

    // Các thành viên viết code dưới này


}
