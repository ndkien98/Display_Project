package com.fita.project.service.impl;

import com.fita.project.dto.YearSemesterDTO;
import com.fita.project.repository.YearSemesterRepository;
import com.fita.project.repository.entity.YearSemester;
import com.fita.project.service.YearSemesterService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Component
public class YearSemesterServiceImpl implements YearSemesterService {
    @Autowired
    YearSemesterRepository yearSemesterRepository;

    @Autowired
    ModelMapper modelMapper;

    /**
     * Lấy tất cả các năm học - học kỳ trong cơ sở dữ liệu
     *
     * @return danh sách các năm học - học kỳ (nếu có), ngược lại trả về null
     */
    @Override
    public List<YearSemesterDTO> getYearsSemesters() {
        try {
            List<YearSemester> yearsSemesters = yearSemesterRepository.findAll();
            List<YearSemesterDTO> yearsSemestersDTOs = new ArrayList<>();

            //Convert yearSemester (Entity) -> yearSemesterDTO (DTO)
            for (YearSemester yearSemester : yearsSemesters) {
                yearsSemestersDTOs.add(modelMapper.map(yearSemester, YearSemesterDTO.class));
            }

            return yearsSemestersDTOs;
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    /**
     * Lấy năm học - học kỳ trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return năm học - học kỳ lấy được (nếu có), ngược lại trả về null
     */
    @Override
    public YearSemesterDTO getYearSemesterById(int id) {
        try {
            YearSemester yearSemester = yearSemesterRepository.findById(id).get();

            //Convert department (Entity) -> departmentDTO (DTO)
            YearSemesterDTO yearSemesterDTO = modelMapper.map(yearSemester, YearSemesterDTO.class);

            return  yearSemesterDTO;
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    /**
     * Thêm 1 học kỳ - năm học vào cơ sở dữ liệu
     *
     * @param yearSemesterDTO
     * @return true nếu thêm thành công, ngược lại trả về false
     */
    @Override
    public boolean addYearSemester(YearSemesterDTO yearSemesterDTO) {
        try {
            yearSemesterRepository.save(modelMapper.map(yearSemesterDTO, YearSemester.class));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Sửa học kỳ - năm học trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return true nếu sửa thành công, ngược lại trả về false
     */
    @Override
    public boolean editYearSemester(int id, YearSemesterDTO yearSemesterDTO) {
        try {
            // Lấy năm học - học kỳ cần sửa
            YearSemester yearSemesterToUpdate = yearSemesterRepository.getOne(id);

            // Cập nhật dữ liệu mới
            yearSemesterToUpdate.setYear(yearSemesterDTO.getYear());
            yearSemesterToUpdate.setSemester(yearSemesterDTO.getSemester());
            yearSemesterToUpdate.setStartDate(yearSemesterDTO.getStartDate());
            yearSemesterToUpdate.setWeeksNumber(yearSemesterDTO.getWeeksNumber());

            // Lưu lại vào cơ sở dữ liệu
            yearSemesterRepository.save(yearSemesterToUpdate);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Xoá học kỳ - năm học trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return true nếu xoá thành công, ngược lại trả về false
     */
    @Override
    public boolean deleteYearSemester(int id) {
        try {
            yearSemesterRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
