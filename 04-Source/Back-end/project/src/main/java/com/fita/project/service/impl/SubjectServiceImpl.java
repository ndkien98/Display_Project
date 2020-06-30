package com.fita.project.service.impl;

import com.fita.project.dto.SubjectDTO;
import com.fita.project.repository.SubjectRepository;
import com.fita.project.repository.entity.Subject;
import com.fita.project.service.SubjectService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Component
public class SubjectServiceImpl implements SubjectService {
    @Autowired
    SubjectRepository subjectRepository;

    @Autowired
    ModelMapper modelMapper;

    /**
     * Lấy tất cả các môn học trong cơ sở dữ liệu
     *
     * @return danh sách các môn học (nếu có), ngược lại trả về null
     */
    @Override
    public List<SubjectDTO> getSubjects() {
        try {
            List<Subject> subjects = subjectRepository.findAll();
            List<SubjectDTO> subjectsDTO = new ArrayList<>();

            //Convert subject (Entity) -> subjectDTO (DTO)
            for (Subject subject : subjects) {
                subjectsDTO.add(modelMapper.map(subject, SubjectDTO.class));
            }

            return subjectsDTO;
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    /**
     * Lấy môn học trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return môn học lấy được (nếu có), ngược lại trả về null
     */
    @Override
    public SubjectDTO getSubjectById(int id) {
        try {
            Subject subject = subjectRepository.findById(id).get();

            //Convert subject (Entity) -> subjectDTO (DTO)
            SubjectDTO subjectDTO = modelMapper.map(subject, SubjectDTO.class);

            return  subjectDTO;
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    /**
     * Thêm 1 môn học vào cơ sở dữ liệu
     *
     * @param subjectDTO
     * @return true nếu thêm thành công, ngược lại trả về false
     */
    @Override
    public boolean addSubject(SubjectDTO subjectDTO) {
        try {
            subjectRepository.save(modelMapper.map(subjectDTO, Subject.class));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Sửa môn học trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return true nếu sửa thành công, ngược lại trả về false
     */
    @Override
    public boolean editSubject(int id, SubjectDTO subjectDTO) {
        try {
            // Lấy năm học - học kỳ cần sửa
            Subject subjectToUpdate = subjectRepository.getOne(id);

            // Cập nhật dữ liệu mới
            subjectToUpdate.setSubjectCode(subjectDTO.getSubjectCode());
            subjectToUpdate.setSubjectName(subjectDTO.getSubjectName());
            subjectToUpdate.setDepartmentCode(subjectDTO.getDepartmentCode());

            // Lưu lại vào cơ sở dữ liệu
            subjectRepository.save(subjectToUpdate);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Xoá môn học trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return true nếu xoá thành công, ngược lại trả về false
     */
    @Override
    public boolean deleteSubject(int id) {
        try {
            subjectRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
