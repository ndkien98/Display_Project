package com.fita.project.service.impl;

import com.fita.project.dto.CourseDTO;
import com.fita.project.dto.YearSemesterDTO;
import com.fita.project.repository.CourseRepository;
import com.fita.project.repository.entity.Course;
import com.fita.project.service.CourseService;
import com.fita.project.service.SubjectService;
import com.fita.project.service.UserService;
import com.fita.project.service.YearSemesterService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class CourseServiceImpl implements CourseService {
    @Autowired
    CourseRepository courseRepository;

    @Autowired
    SubjectService subjectService;

    @Autowired
    YearSemesterService yearSemesterService;

    @Autowired
    UserService userService;

    @Autowired
    ModelMapper modelMapper;

    /**
     * Lấy tất cả các lớp học phần trong cơ sở dữ liệu
     *
     * @return List<CourseDTO>
     */
    @Override
    public List<CourseDTO> getCourses() {
        List<Course> courses = courseRepository.findAll();
        List<CourseDTO> coursesDTO = new ArrayList<>();

        //Convert course (Entity) -> courseDTO (DTO)
        for (Course course : courses) {
            CourseDTO courseDTO = convert(course);

            coursesDTO.add(courseDTO);
        }

        return coursesDTO;
    }

    /**
     * Lấy lớp học phần trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return CourseDTO
     */
    @Override
    public CourseDTO getCourseById(int id) {
        Course course = courseRepository.findById(id).get();

        //Convert course (Entity) -> courseDTO (DTO)
        CourseDTO courseDTO = convert(course);

        return courseDTO;
    }

    /**
     * Lấy lớp học phần trong cơ sở dữ liệu dựa theo mã giảng viên
     *
     * @param lecturerCode
     * @return List<CourseDTO>
     */
    @Override
    public List<CourseDTO> getCoursesByLecturerCode(String lecturerCode) {
        List<Course> courses = courseRepository.findByLecturerCode(lecturerCode);
        List<CourseDTO> coursesDTO = new ArrayList<>();

        //Convert course (Entity) -> courseDTO (DTO)
        for (Course course : courses) {
            CourseDTO courseDTO = convert(course);

            coursesDTO.add(courseDTO);
        }

        return coursesDTO;
    }

    /**
     * Lấy lớp học phần trong cơ sở dữ liệu dựa theo năm học - học kỳ id
     *
     * @param yearSemesterId
     * @return List<CourseDTO>
     */
    @Override
    public List<CourseDTO> getCoursesByYearSemesterId(int yearSemesterId) {
        List<Course> courses = courseRepository.findByYearSemesterId(yearSemesterId);
        List<CourseDTO> coursesDTO = new ArrayList<>();

        //Convert course (Entity) -> courseDTO (DTO)
        for (Course course : courses) {
            CourseDTO courseDTO = convert(course);

            coursesDTO.add(courseDTO);
        }

        return coursesDTO;
    }

    /**
     * Lấy lớp học phần trong cơ sở dữ liệu dựa theo mã giảng viên và năm học - học kỳ id
     *
     * @param lecturerCode
     * @param yearSemesterId
     * @return List<CourseDTO>
     */
    @Override
    public List<CourseDTO> getCoursesByLecturerCodeAndYearSemesterId(String lecturerCode, int yearSemesterId) {
        List<Course> courses = courseRepository.findByLecturerCodeAndYearSemesterId(lecturerCode, yearSemesterId);
        List<CourseDTO> coursesDTO = new ArrayList<>();

        //Convert course (Entity) -> courseDTO (DTO)
        for (Course course : courses) {
            CourseDTO courseDTO = convert(course);

            coursesDTO.add(courseDTO);
        }

        return coursesDTO;
    }

    private CourseDTO convert(Course course) {
        CourseDTO courseDTO = modelMapper.map(course, CourseDTO.class);
        courseDTO.setSubjectName(subjectService.getSubjectBySubjectCode(courseDTO.getSubjectCode()).getSubjectName());

        if (courseDTO.getYearSemesterId() != null) {
            YearSemesterDTO yearSemesterDTO = yearSemesterService.getYearSemesterById(courseDTO.getYearSemesterId());
            courseDTO.setYear(yearSemesterDTO.getYear());
            courseDTO.setSemester(yearSemesterDTO.getSemester());
        }

        if (courseDTO.getLecturerCode() != null) {
            courseDTO.setLecturerName(userService.getUserByUsername(courseDTO.getLecturerCode()).getFullName());
        }

        return courseDTO;
    }

    /**
     * Thêm 1 lớp học phần vào cơ sở dữ liệu
     *
     * @param courseDTO
     */
    @Override
    public void addCourse(CourseDTO courseDTO) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        courseDTO.setCreatedDate(dateFormat.format(new Date()));
        courseDTO.setLastModifiedDate(dateFormat.format(new Date()));

        courseRepository.save(modelMapper.map(courseDTO, Course.class));
    }

    /**
     * Sửa lớp học phần trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @param courseDTO
     */
    @Override
    public void editCourse(int id, CourseDTO courseDTO) {
        // Lấy lớp học phần cần sửa
        Course courseToUpdate = courseRepository.getOne(id);

        // Cập nhật dữ liệu mới
        courseToUpdate.setSubjectCode(courseDTO.getSubjectCode());
        courseToUpdate.setSubjectGroup(courseDTO.getSubjectGroup());
        courseToUpdate.setClassCode(courseDTO.getClassCode());
        courseToUpdate.setYearSemesterId(courseDTO.getYearSemesterId());
        courseToUpdate.setLecturerCode(courseDTO.getLecturerCode());
        //courseToUpdate.setCreatedDate(courseDTO.getCreatedDate());
        //courseToUpdate.setCreatedBy(courseDTO.getCreatedBy());

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        courseToUpdate.setLastModifiedDate(dateFormat.format(new Date()));

        // Lưu lại vào cơ sở dữ liệu
        courseRepository.save(courseToUpdate);
    }

    /**
     * Xoá lớp học phần trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     */
    @Override
    public void deleteCourse(int id) {
        courseRepository.deleteById(id);
    }
}
