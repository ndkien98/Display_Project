package com.fita.project.controller;

import com.fita.project.dto.ProjectDTO;
import com.fita.project.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/projects/", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(value = "*", maxAge = -1)
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    // Lấy ra tất cả các đồ án
    @GetMapping("get-all")
    public ResponseEntity<?> getProjects() {
        try {
            return ResponseEntity.ok(projectService.getProjects());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(e.toString());
        }
    }

    // Lấy ra đồ án theo "trạng thái"
    @GetMapping("get-by-status/{status}")
    public ResponseEntity<?> getProjectsByStatus(@PathVariable int status) {
        try {
            return ResponseEntity.ok(projectService.getProjectsByStatus(status));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(e.toString());
        }
    }

    // Lấy ra đồ án theo "id"
    @GetMapping("get-by-id/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(projectService.getProjectById(id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(e.toString());
        }
    }

    // Lấy ra đồ án theo "mã sinh viên"
    @GetMapping("get-by-student-code/{studentCode}")
    public ResponseEntity<?> getProjectsByStudentCode(@PathVariable String studentCode) {
        try {
            return ResponseEntity.ok(projectService.getProjectsByStudentCode(studentCode));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(e.toString());
        }
    }


    // Lấy ra đồ án theo "mã đồ án"
    @GetMapping("get-by-project-code/{projectCode}")
    public ResponseEntity<?> getProjectByProjectCode(@PathVariable String projectCode) {
        try {
            return ResponseEntity.ok(projectService.getProjectByProjectCode(projectCode));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(e.toString());
        }
    }

    // Lấy ra đồ án theo "năm học - học kỳ id"







    // Lấy ra đồ án theo "mã thể loại"
    @GetMapping("get-by-category-code/{categoryCode}")
    public ResponseEntity<?> getProjectsByCategoryId(@PathVariable String categoryCode) {
        try {
            return ResponseEntity.ok(projectService.getProjectsByCategoryCode(categoryCode));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(e.toString());
        }
    }

    // Lấy ra đồ án theo "lớp học phần id"
    @GetMapping("get-by-course-id/{courseId}")
    public ResponseEntity<?> getProjectsByCourseId(@PathVariable int courseId) {
        try {
            return ResponseEntity.ok(projectService.getProjectsByCourseId(courseId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(e.toString());
        }
    }

    // Thêm đồ án
    @PostMapping("add")
    public ResponseEntity<?> addProject(@RequestBody ProjectDTO projectDTO) {
        try {
            projectService.addProject(projectDTO);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(e.toString());
        }
    }

    // Sửa đồ án
    @PutMapping("edit/{id}")
    public ResponseEntity<?> editProject(@PathVariable int id, @RequestBody ProjectDTO projectDTO) {
        try {
            projectService.editProject(id, projectDTO);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(e.toString());
        }
    }

    // Xoá đồ án
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable int id) {
        try {
            projectService.deleteProject(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(e.toString());
        }
    }
}
