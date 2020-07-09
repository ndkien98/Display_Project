package com.fita.project.repository;

import com.fita.project.repository.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    Project findByProjectCode(String projectCode);
    List<Project> findByStatus(int status);
    List<Project> findByStudentCode(String studentCode);
    List<Project> findByCategoryCode(String categoryCode);
    List<Project> findByCourseId(int courseId);
}
