package com.fita.project.service.impl;

import com.fita.project.dto.LecturerDTO;
import com.fita.project.dto.StudentDTO;
import com.fita.project.dto.UserDTO;
import com.fita.project.repository.LecturerRepository;
import com.fita.project.repository.StudentRepository;
import com.fita.project.repository.UserRepository;
import com.fita.project.repository.entity.Lecturer;
import com.fita.project.repository.entity.User;
import com.fita.project.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Component
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LecturerRepository lecturerRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ModelMapper modelMapper;

    /**
     * Lấy người dùng trong cơ sở dữ liệu dựa theo username
     *
     * @return người dùng lấy được (nếu có), ngược lại trả về null
     */
    @Override
    public UserDTO getUserByUsername(String username) {
        try {
            User user = userRepository.findByUsername(username);

            //Convert user (Entity) -> userDTO (DTO)
            UserDTO userDTO = modelMapper.map(user, UserDTO.class);

            return userDTO;
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    /**
     * Lấy tất cả các giảng viên trong cơ sở dữ liệu
     *
     * @return danh sách các giảng viên (nếu có), ngược lại trả về null
     */
    @Override
    public List<LecturerDTO> getLecturers() {
        try {
            List<Lecturer> lecturers = lecturerRepository.findAll();
            List<LecturerDTO> lecturersDTO = new ArrayList<>();

            //Convert lecturer (Entity) -> lecturerDTO (DTO)
            for (Lecturer lecturer : lecturers) {
                UserDTO userDTO = getUserByUsername(lecturer.getLecturerCode());

                LecturerDTO lecturerDTO = modelMapper.map(userDTO, LecturerDTO.class);
                lecturerDTO.setLecturerCode(lecturer.getLecturerCode());
                lecturerDTO.setDepartmentCode(lecturer.getDepartmentCode());

                lecturersDTO.add(lecturerDTO);
            }

            return lecturersDTO;
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    @Override
    public List<StudentDTO> getStudents() {
        return null;
    }

    @Override
    public LecturerDTO getLecturerById(int id) {
        return null;
    }

    @Override
    public StudentDTO getStudentById(int id) {
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
