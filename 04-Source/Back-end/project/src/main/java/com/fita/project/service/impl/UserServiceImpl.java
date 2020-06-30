package com.fita.project.service.impl;

import com.fita.project.dto.LecturerDTO;
import com.fita.project.dto.StudentDTO;
import com.fita.project.dto.UserDTO;
import com.fita.project.repository.LecturerRepository;
import com.fita.project.repository.StudentRepository;
import com.fita.project.repository.UserRepository;
import com.fita.project.repository.entity.Lecturer;
import com.fita.project.repository.entity.Student;
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

    //====================NGƯỜI DÙNG====================

    /**
     * Lấy tất cả các người dùng trong cơ sở dữ liệu
     *
     * @return danh sách các người dùng lấy được (nếu có), ngược lại trả về null
     */
    @Override
    public List<UserDTO> getUsers() {
        try {
            List<User> users = userRepository.findAll();
            List<UserDTO> usersDTO = new ArrayList<>();

            // Convert user (Entity) -> userDTO (DTO)
            for (User user : users) {
                usersDTO.add(modelMapper.map(user, UserDTO.class));
            }

            return usersDTO;
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    /**
     * Lấy người dùng trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return người dùng lấy được (nếu có), ngược lại trả về null
     */
    @Override
    public UserDTO getUserById(int id) {
        try {
            User user = userRepository.findById(id).get();

            //Convert user (Entity) -> userDTO (DTO)
            UserDTO userDTO = modelMapper.map(user, UserDTO.class);

            return userDTO;
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    /**
     * Lấy người dùng trong cơ sở dữ liệu dựa theo username
     *
     * @param username
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
     * Thêm 1 người dùng vào cơ sở dữ liệu
     *
     * @param userDTO
     * @return true nếu thêm thành công, ngược lại trả về false
     */
    @Override
    public boolean addUser(UserDTO userDTO) {
        try {
            userRepository.save(modelMapper.map(userDTO, User.class));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Sửa người dùng trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @param userDTO
     * @return true nếu sửa thành công, ngược lại trả về false
     */
    @Override
    public boolean editUser(int id, UserDTO userDTO) {
        try {
            // Lấy người dùng cần sửa
            User userToUpdate = userRepository.findById(id).get();

            // Cập nhật dữ liệu mới
            userToUpdate.setUsername(userDTO.getUsername());
            userToUpdate.setPassword(userDTO.getPassword());
            userToUpdate.setFullName(userDTO.getFullName());
            userToUpdate.setBirthDate(userDTO.getBirthDate());
            userToUpdate.setGender(userDTO.getGender());
            userToUpdate.setEmailAddress(userDTO.getEmailAddress());
            userToUpdate.setPhoneNumber(userDTO.getPhoneNumber());
            userToUpdate.setRoleId(userDTO.getRoleId());
            userToUpdate.setUserAvatarUrl(userDTO.getUserAvatarUrl());
            userToUpdate.setStatus(userDTO.getStatus());
            userToUpdate.setCreatedDate(userDTO.getCreatedDate());
            userToUpdate.setCreatedBy(userDTO.getCreatedBy());

            // Lưu lại vào cơ sở dữ liệu
            userRepository.save(userToUpdate);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Xoá người dùng trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return true nếu xoá thành công, ngược lại trả về false
     */
    @Override
    public boolean deleteUser(int id) {
        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


    //====================GIẢNG VIÊN====================

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
                lecturerDTO.setDepartmentCode(lecturer.getDepartmentCode());

                lecturersDTO.add(lecturerDTO);
            }

            return lecturersDTO;
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    /**
     * Lấy giảng viên trong cơ sở dữ liệu dựa theo id
     *
     * @return giảng viên lấy được (nếu có), ngược lại trả về null
     */
    @Override
    public LecturerDTO getLecturerById(int id) {
        try {
            UserDTO userDTO = getUserById(id);
            List<Lecturer> lecturers = lecturerRepository.findAll();
            LecturerDTO lecturerDTO = null;

            //Convert lecturer (Entity) -> lecturerDTO (DTO)
            for (Lecturer lecturer : lecturers) {
                if (userDTO.getUsername().equalsIgnoreCase(lecturer.getLecturerCode())) {
                    lecturerDTO = modelMapper.map(userDTO, LecturerDTO.class);
                    lecturerDTO.setDepartmentCode(lecturer.getDepartmentCode());
                }
            }

            return lecturerDTO;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Thêm 1 giảng viên vào cơ sở dữ liệu
     *
     * @param lecturerDTO
     * @return true nếu thêm thành công, ngược lại trả về false
     */
    @Override
    public boolean addLecturer(LecturerDTO lecturerDTO) {
        try {
            User user = modelMapper.map(lecturerDTO, User.class);
            Lecturer lecturer = modelMapper.map(lecturerDTO, Lecturer.class);
            lecturer.setLecturerCode(lecturerDTO.getUsername());

            userRepository.save(user);
            lecturerRepository.save(lecturer);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Sửa giảng viên trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @param lecturerDTO
     * @return true nếu sửa thành công, ngược lại trả về false
     */
    @Override
    public boolean editLecturer(int id, LecturerDTO lecturerDTO) {
        try {
            // Lấy giảng viên cần sửa
            LecturerDTO lecturerToUpdateDTO = getLecturerById(id);

            if (lecturerToUpdateDTO != null) {
                // Cập nhật dữ liệu mới
                User userToUpdate = modelMapper.map(lecturerDTO, User.class);
                Lecturer lecturerToUpdate = modelMapper.map(lecturerDTO, Lecturer.class);
                lecturerToUpdate.setLecturerCode(lecturerDTO.getUsername());

                // Lưu lại vào cơ sở dữ liệu
                userRepository.save(userToUpdate);
                lecturerRepository.save(lecturerToUpdate);

                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Xoá giảng viên trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return true nếu xoá thành công, ngược lại trả về false
     */
    @Override
    public boolean deleteLecturer(int id) {
        try {
            LecturerDTO lecturerToDeleteDTO = getLecturerById(id);

            if (lecturerToDeleteDTO != null) {
                lecturerRepository.deleteByLecturerCode(lecturerToDeleteDTO.getUsername());
                userRepository.deleteById(id);

                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }


    //====================SINH VIÊN====================

    /**
     * Lấy tất cả các sinh viên trong cơ sở dữ liệu
     *
     * @return danh sách các sinh viên (nếu có), ngược lại trả về null
     */
    @Override
    public List<StudentDTO> getStudents() {
        try {
            List<Student> students = studentRepository.findAll();
            List<StudentDTO> studentsDTO = new ArrayList<>();

            //Convert student (Entity) -> studentDTO (DTO)
            for (Student student : students) {
                UserDTO userDTO = getUserByUsername(student.getStudentCode());

                StudentDTO studentDTO = modelMapper.map(userDTO, StudentDTO.class);
                studentDTO.setClassCode(student.getClassCode());

                studentsDTO.add(studentDTO);
            }

            return studentsDTO;
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    /**
     * Lấy sinh viên trong cơ sở dữ liệu dựa theo id
     *
     * @return sinh viên lấy được (nếu có), ngược lại trả về null
     */
    @Override
    public StudentDTO getStudentById(int id) {
        try {
            UserDTO userDTO = getUserById(id);
            List<Student> students = studentRepository.findAll();
            StudentDTO studentDTO = null;

            //Convert student (Entity) -> studentDTO (DTO)
            for (Student student : students) {
                if (userDTO.getUsername().equalsIgnoreCase(student.getStudentCode())) {
                    studentDTO = modelMapper.map(userDTO, StudentDTO.class);
                    studentDTO.setClassCode(student.getClassCode());
                }
            }

            return studentDTO;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Thêm 1 sinh viên vào cơ sở dữ liệu
     *
     * @param studentDTO
     * @return true nếu thêm thành công, ngược lại trả về false
     */
    @Override
    public boolean addStudent(StudentDTO studentDTO) {
        try {
            User user = modelMapper.map(studentDTO, User.class);
            Student student = modelMapper.map(studentDTO, Student.class);
            student.setStudentCode(studentDTO.getUsername());

            userRepository.save(user);
            studentRepository.save(student);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Sửa sinh viên trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @param studentDTO
     * @return true nếu sửa thành công, ngược lại trả về false
     */
    @Override
    public boolean editStudent(int id, StudentDTO studentDTO) {
        try {
            // Lấy sinh viên cần sửa
            StudentDTO studentToUpdateDTO = getStudentById(id);

            if (studentToUpdateDTO != null) {
                // Cập nhật dữ liệu mới
                User userToUpdate = modelMapper.map(studentDTO, User.class);
                Student studentToUpdate = modelMapper.map(studentDTO, Student.class);
                studentToUpdate.setStudentCode(studentDTO.getUsername());

                // Lưu lại vào cơ sở dữ liệu
                userRepository.save(userToUpdate);
                studentRepository.save(studentToUpdate);

                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Xoá sinh viên trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return true nếu xoá thành công, ngược lại trả về false
     */
    @Override
    public boolean deleteStudent(int id) {
        try {
            StudentDTO studentToDeleteDTO = getStudentById(id);

            if (studentToDeleteDTO != null) {
                studentRepository.deleteByStudentCode(studentToDeleteDTO.getUsername());
                userRepository.deleteById(id);

                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }
}
