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
import com.fita.project.service.DepartmentService;
import com.fita.project.service.RoleService;
import com.fita.project.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LecturerRepository lecturerRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder bCryptEncoder;

    private List<User> users;
    private List<UserDTO> usersDTO;
    private User user;
    private UserDTO userDTO;
    private List<Lecturer> lecturers;
    private List<LecturerDTO> lecturersDTO;
    private Lecturer lecturer;
    private LecturerDTO lecturerDTO;
    private List<Student> students;
    private List<StudentDTO> studentsDTO;
    private Student student;
    private StudentDTO studentDTO;

    //====================NGƯỜI DÙNG====================

    /**
     * Lấy tất cả các người dùng trong cơ sở dữ liệu
     *
     * @return List<UserDTO>
     */
    @Override
    public List<UserDTO> getUsers() {
        users = userRepository.findAll();
        usersDTO = new ArrayList<>();

        // Convert user (Entity) -> userDTO (DTO)
        for (User user : users) {
            userDTO = modelMapper.map(user, UserDTO.class);
            userDTO.setRoleName(roleService.getRoleById(userDTO.getRoleId()).getRoleName());
            usersDTO.add(userDTO);
        }

        return usersDTO;
    }

    /**
     * Lấy người dùng trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return UserDTO
     */
    @Override
    public UserDTO getUserById(int id) {
        user = userRepository.findById(id).get();

        //Convert user (Entity) -> userDTO (DTO)
        userDTO = modelMapper.map(user, UserDTO.class);
        userDTO.setRoleName(roleService.getRoleById(userDTO.getRoleId()).getRoleName());

        return userDTO;
    }

    /**
     * Lấy người dùng trong cơ sở dữ liệu dựa theo username
     *
     * @param username
     * @return UserDTO
     */
    @Override
    public UserDTO getUserByUsername(String username) {
        user = userRepository.findByUsername(username);

        //Convert user (Entity) -> userDTO (DTO)
        userDTO = modelMapper.map(user, UserDTO.class);
        userDTO.setRoleName(roleService.getRoleById(userDTO.getRoleId()).getRoleName());

        return userDTO;
    }

    /**
     * Thêm 1 người dùng vào cơ sở dữ liệu
     *
     * @param userDTO
     */
    @Override
    public void addUser(UserDTO userDTO) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        userDTO.setCreatedDate(dateFormat.format(new Date()));
        userDTO.setPassword(bCryptEncoder.encode(userDTO.getPassword()));

        userRepository.save(modelMapper.map(userDTO, User.class));
    }

    /**
     * Sửa người dùng trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @param userDTO
     */
    @Override
    public void editUser(int id, UserDTO userDTO) {
        // Lấy người dùng cần sửa
        User userToUpdate = userRepository.getOne(id);

        // Cập nhật dữ liệu mới
        convert(userDTO, userToUpdate);

        // Lưu lại vào cơ sở dữ liệu
        userRepository.save(userToUpdate);
    }

    /**
     * Xoá người dùng trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     */
    @Override
    public void deleteUser(int id) {
        String username = getUserById(id).getUsername();

        lecturerRepository.deleteByLecturerCode(username);
        studentRepository.deleteByStudentCode(username);

        userRepository.deleteById(id);
    }


    //====================GIẢNG VIÊN====================

    /**
     * Lấy tất cả các giảng viên trong cơ sở dữ liệu
     *
     * @return List<LecturerDTO>
     */
    @Override
    public List<LecturerDTO> getLecturers() {
        lecturers = lecturerRepository.findAll();
        lecturersDTO = new ArrayList<>();

        //Convert lecturer (Entity) -> lecturerDTO (DTO)
        for (Lecturer lecturer : lecturers) {
            userDTO = getUserByUsername(lecturer.getLecturerCode());
            lecturerDTO = convertLecturer(userDTO, lecturer);
            lecturersDTO.add(lecturerDTO);
        }

        return lecturersDTO;
    }

    /**
     * Lấy giảng viên trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return LecturerDTO
     */
    @Override
    public LecturerDTO getLecturerById(int id) {
        userDTO = getUserById(id);
        lecturerDTO = getLecturerByLecturerCode(userDTO.getUsername());

        return lecturerDTO;
    }

    /**
     * Lấy giảng viên trong cơ sở dữ liệu dựa theo mã giảng viên
     *
     * @param lecturerCode
     * @return LecturerDTO
     */
    public LecturerDTO getLecturerByLecturerCode(String lecturerCode) {
        lecturer = lecturerRepository.findByLecturerCode(lecturerCode);
        userDTO = getUserByUsername(lecturer.getLecturerCode());

        //Convert lecturer (Entity) -> lecturerDTO (DTO)
        lecturerDTO = convertLecturer(userDTO, lecturer);

        return lecturerDTO;
    }

    private LecturerDTO convertLecturer(UserDTO userDTO, Lecturer lecturer) {
        lecturerDTO = modelMapper.map(userDTO, LecturerDTO.class);

        if (lecturer.getDepartmentCode() != null) {
            lecturerDTO.setDepartmentCode(lecturer.getDepartmentCode());
            lecturerDTO.setDepartmentName(departmentService.getDepartmentByDepartmentCode(lecturer.getDepartmentCode()).getDepartmentName());
        }

        return lecturerDTO;
    }

    /**
     * Thêm 1 giảng viên vào cơ sở dữ liệu
     *
     * @param lecturerDTO
     * @return true nếu thêm thành công, ngược lại trả về false
     */
    @Override
    public void addLecturer(LecturerDTO lecturerDTO) {
        lecturerDTO.setPassword(bCryptEncoder.encode(lecturerDTO.getPassword()));
        user = modelMapper.map(lecturerDTO, User.class);
        lecturer = modelMapper.map(lecturerDTO, Lecturer.class);
        lecturer.setLecturerCode(lecturerDTO.getUsername());

        userRepository.save(user);
        lecturerRepository.save(lecturer);
    }

    /**
     * Sửa giảng viên trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @param lecturerDTO
     */
    @Override
    public void editLecturer(int id, LecturerDTO lecturerDTO) {
        // Lấy giảng viên cần sửa
        LecturerDTO lecturerToUpdateDTO = getLecturerById(id);
        User userToUpdate = userRepository.getOne(lecturerToUpdateDTO.getId());
        Lecturer lecturerToUpdate = lecturerRepository.findByLecturerCode(userToUpdate.getUsername());

        // Cập nhật dữ liệu mới
        convert(lecturerDTO, userToUpdate);

        lecturerToUpdate.setLecturerCode(lecturerDTO.getUsername());
        lecturerToUpdate.setDepartmentCode(lecturerDTO.getDepartmentCode());

        // Lưu lại vào cơ sở dữ liệu
        lecturerRepository.save(lecturerToUpdate);
        userRepository.save(userToUpdate);
    }

    /**
     * Xoá giảng viên trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     */
    @Override
    public void deleteLecturer(int id) {
        LecturerDTO lecturerToDeleteDTO = getLecturerById(id);

        lecturerRepository.deleteByLecturerCode(lecturerToDeleteDTO.getUsername());
        userRepository.deleteById(id);
    }


    //====================SINH VIÊN====================

    /**
     * Lấy tất cả các sinh viên trong cơ sở dữ liệu
     *
     * @return List<StudentDTO>
     */
    @Override
    public List<StudentDTO> getStudents() {
        students = studentRepository.findAll();
        studentsDTO = new ArrayList<>();

        //Convert student (Entity) -> studentDTO (DTO)
        for (Student student : students) {
            userDTO = getUserByUsername(student.getStudentCode());

            studentDTO = modelMapper.map(userDTO, StudentDTO.class);
            studentDTO.setClassCode(student.getClassCode());

            studentsDTO.add(studentDTO);
        }

        return studentsDTO;
    }

    /**
     * Lấy sinh viên trong cơ sở dữ liệu dựa theo id
     *
     * @return StudentDTO
     */
    @Override
    public StudentDTO getStudentById(int id) {
        userDTO = getUserById(id);
        studentDTO = getStudentByStudentCode(userDTO.getUsername());

        return studentDTO;
    }

    /**
     * Lấy sinh viên trong cơ sở dữ liệu dựa theo mã sinh viên
     *
     * @param studentCode
     * @return studentDTO
     */
    @Override
    public StudentDTO getStudentByStudentCode(String studentCode) {
        student = studentRepository.findByStudentCode(studentCode);
        userDTO = getUserByUsername(student.getStudentCode());

        // Convert student (Entity) -> studentDTO (DTO)
        studentDTO = modelMapper.map(userDTO, StudentDTO.class);
        studentDTO.setClassCode(student.getClassCode());

        return studentDTO;
    }

    /**
     * Thêm 1 sinh viên vào cơ sở dữ liệu
     *
     * @param studentDTO
     */
    @Override
    public void addStudent(StudentDTO studentDTO) {
        studentDTO.setPassword(bCryptEncoder.encode(studentDTO.getPassword()));
        user = modelMapper.map(studentDTO, User.class);
        student = modelMapper.map(studentDTO, Student.class);
        student.setStudentCode(studentDTO.getUsername());

        userRepository.save(user);
        studentRepository.save(student);
    }

    /**
     * Sửa sinh viên trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @param studentDTO
     */
    @Override
    public void editStudent(int id, StudentDTO studentDTO) {
        // Lấy sinh viên cần sửa
        StudentDTO studentToUpdateDTO = getStudentById(id);
        User userToUpdate = userRepository.getOne(studentToUpdateDTO.getId());
        Student studentToUpdate = studentRepository.findByStudentCode(userToUpdate.getUsername());

        // Cập nhật dữ liệu mới
        convert(studentDTO, userToUpdate);

        studentToUpdate.setStudentCode(studentDTO.getUsername());
        studentToUpdate.setClassCode(studentDTO.getClassCode());

        // Lưu lại vào cơ sở dữ liệu
        studentRepository.save(studentToUpdate);
        userRepository.save(userToUpdate);
    }

    /**
     * Xoá sinh viên trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     */
    @Override
    public void deleteStudent(int id) {
        StudentDTO studentToDeleteDTO = getStudentById(id);

        studentRepository.deleteByStudentCode(studentToDeleteDTO.getUsername());
        userRepository.deleteById(id);
    }

    private void convert(UserDTO userDTO, User userToUpdate) {
        userToUpdate.setUsername(userDTO.getUsername());
        userToUpdate.setPassword(bCryptEncoder.encode(userDTO.getPassword()));
        userToUpdate.setFullName(userDTO.getFullName());
        userToUpdate.setBirthDate(userDTO.getBirthDate());
        userToUpdate.setGender(userDTO.getGender());
        userToUpdate.setEmailAddress(userDTO.getEmailAddress());
        userToUpdate.setPhoneNumber(userDTO.getPhoneNumber());
        userToUpdate.setRoleId(userDTO.getRoleId());
        userToUpdate.setUserAvatarUrl(userDTO.getUserAvatarUrl());
        userToUpdate.setStatus(userDTO.getStatus());
        //userToUpdate.setCreatedDate(userDTO.getCreatedDate());
        //userToUpdate.setCreatedBy(userDTO.getCreatedBy());
    }

    /**
     * Get username + password by username
     *
     * @param username
     * @return username + password
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        } else {
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
        }
    }
}
