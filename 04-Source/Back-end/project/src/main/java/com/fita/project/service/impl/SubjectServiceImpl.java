package com.fita.project.service.impl;

import com.fita.project.dto.SubjectDTO;
import com.fita.project.repository.SubjectRepository;
import com.fita.project.repository.entity.Subject;
import com.fita.project.service.DepartmentService;
import com.fita.project.service.SubjectService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SubjectServiceImpl implements SubjectService {
    @Autowired
    SubjectRepository subjectRepository;

    @Autowired
    DepartmentService departmentService;

    @Autowired
    ModelMapper modelMapper;

    /**
     * Lấy tất cả các môn học trong cơ sở dữ liệu
     *
     * @return List<SubjectDTO>
     */
    @Override
    public List<SubjectDTO> getSubjects() {
        List<Subject> subjects = subjectRepository.findAll();
        List<SubjectDTO> subjectsDTO = new ArrayList<>();

        //Convert subject (Entity) -> subjectDTO (DTO)
        for (Subject subject : subjects) {
            SubjectDTO subjectDTO = convert(subject);
            subjectsDTO.add(subjectDTO);
        }

        return subjectsDTO;
    }

    /**
     * Lấy môn học trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     * @return SubjectDTO
     */
    @Override
    public SubjectDTO getSubjectById(int id) {
        Subject subject = subjectRepository.findById(id).get();

        //Convert subject (Entity) -> subjectDTO (DTO)
        SubjectDTO subjectDTO = convert(subject);

        return subjectDTO;
    }

    /**
     * Lấy môn học trong cơ sở dữ liệu dựa theo id
     *
     * @param subjectCode
     * @return SubjectDTO
     */
    @Override
    public SubjectDTO getSubjectBySubjectCode(String subjectCode) {
        Subject subject = subjectRepository.findBySubjectCode(subjectCode);

        //Convert subject (Entity) -> subjectDTO (DTO)
        SubjectDTO subjectDTO = convert(subject);

        return subjectDTO;
    }

    private SubjectDTO convert(Subject subject) {
        SubjectDTO subjectDTO = modelMapper.map(subject, SubjectDTO.class);

        if (subjectDTO.getDepartmentCode() != null) {
            subjectDTO.setDepartmentName(departmentService.getDepartmentByDepartmentCode(subjectDTO.getDepartmentCode()).getDepartmentName());
        }

        return subjectDTO;
    }

    /**
     * Thêm 1 môn học vào cơ sở dữ liệu
     *
     * @param subjectDTO
     */
    @Override
    public void addSubject(SubjectDTO subjectDTO) {
        subjectRepository.save(modelMapper.map(subjectDTO, Subject.class));
    }

    /**
     * Sửa môn học trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     */
    @Override
    public void editSubject(int id, SubjectDTO subjectDTO) {
        // Lấy môn học cần sửa
        Subject subjectToUpdate = subjectRepository.getOne(id);

        // Cập nhật dữ liệu mới
        subjectToUpdate.setSubjectCode(subjectDTO.getSubjectCode());
        subjectToUpdate.setSubjectName(subjectDTO.getSubjectName());
        subjectToUpdate.setDepartmentCode(subjectDTO.getDepartmentCode());

        // Lưu lại vào cơ sở dữ liệu
        subjectRepository.save(subjectToUpdate);
    }

    /**
     * Xoá môn học trong cơ sở dữ liệu dựa theo id
     *
     * @param id
     */
    @Override
    public void deleteSubject(int id) {
        subjectRepository.deleteById(id);
    }
}
