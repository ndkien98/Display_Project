package com.fita.project.service.impl;

import com.fita.project.dto.LecturerDTO;
import com.fita.project.dto.StudentDTO;
import com.fita.project.dto.UserDTO;
import com.fita.project.service.UserService;
import org.springframework.stereotype.Component;

@Component
public class UserServiceImpl implements UserService {
    @Override
    public UserDTO getLecturers() {
        return null;
    }

    @Override
    public UserDTO getStudents() {
        return null;
    }

    @Override
    public UserDTO getLecturerById(int id) {
        return null;
    }

    @Override
    public UserDTO getStudentById(int id) {
        return null;
    }

    @Override
    public boolean addLecturer(LecturerDTO lecturerDTO) {
        return false;
    }

    @Override
    public boolean addLecturer(StudentDTO studentDTO) {
        return false;
    }
}
