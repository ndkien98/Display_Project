package com.fita.project.service;

import com.fita.project.dto.YearSemesterDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface YearSemesterService {
    // Lấy ra tất cả các năm học - học kỳ
    List<YearSemesterDTO> getYearsSemesters();

    // Lấy ra năm học - học kỳ theo "id"
    YearSemesterDTO getYearSemesterById(int id);

    // Thêm năm học - học kỳ
    boolean addYearSemester(YearSemesterDTO yearSemesterDTO);

    //Sửa năm học - học kỳ
    boolean editYearSemester(int id, YearSemesterDTO yearSemesterDTO);

    // Xóa năm học - học kỳ
    boolean deleteYearSemester(int id);
}
