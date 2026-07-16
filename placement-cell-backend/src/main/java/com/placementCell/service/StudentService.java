package com.placementCell.service;

import com.placementCell.dto.StudentDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StudentService {

    StudentDto createStudent(StudentDto studentDto);

    StudentDto getStudentById(Long id);

    List<StudentDto> getAllStudents();

    StudentDto updateStudent(Long id, StudentDto studentDto);

    void deleteStudent(Long id);

    String uploadResume(Long studentId, MultipartFile file);
}