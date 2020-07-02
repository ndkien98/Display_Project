package com.fita.project.service;

import com.fita.project.dto.SubjectDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SubjectService {
    // Lấy ra tất cả các môn học
<<<<<<< HEAD
    List<SubjectDTO> getSubject();
=======
    List<SubjectDTO> getSubjects();
>>>>>>> 9f861372b749a4b5ba027714a1c83319be0abbc9

    // Lấy ra môn học theo "id"
    SubjectDTO getSubjectById(int id);

    // Thêm năm môn học
    boolean addSubject(SubjectDTO subjectDTO);

    //Sửa năm môn học
    boolean editSubject(int id, SubjectDTO subjectDTO);

    // Xóa năm môn học
    boolean deleteSubject(int id);
}
