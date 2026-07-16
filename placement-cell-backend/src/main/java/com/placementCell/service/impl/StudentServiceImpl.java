package com.placementCell.service.impl;

import com.placementCell.dto.StudentDto;
import com.placementCell.entity.Student;
import com.placementCell.mapper.StudentMapper;
import com.placementCell.repository.StudentRepository;
import com.placementCell.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private StudentRepository studentRepository;

    @Override
    public StudentDto createStudent(StudentDto studentDto) {
        Student student = StudentMapper.mapToStudent(studentDto);
        Student savedStudent = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(savedStudent);
    }

    @Override
    public StudentDto getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return StudentMapper.mapToStudentDto(student);
    }

    @Override
    public List<StudentDto> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .map(StudentMapper::mapToStudentDto)
                .collect(Collectors.toList());
    }

    @Override
    public StudentDto updateStudent(Long id, StudentDto studentDto) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));


        student.setFullName(studentDto.getFullName());
        student.setEmail(studentDto.getEmail());
        student.setPhone(studentDto.getPhone());
        student.setCourse(studentDto.getCourse());
        student.setPercentage(studentDto.getPercentage());
        student.setPassingYear(studentDto.getPassingYear());
        student.setSkills(studentDto.getSkills());
        student.setStatus(studentDto.getStatus());

        Student updatedStudent = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(updatedStudent);
    }

    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    @Override
    public String uploadResume(Long studentId, MultipartFile file) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        try {
            String uploadDir = "uploads/";
            String fileName = file.getOriginalFilename();

            Path path = Paths.get(uploadDir + fileName);
            Files.copy(file.getInputStream(), path);

            student.setResumePath(path.toString());
            studentRepository.save(student);

            return "Resume uploaded successfully";

        } catch (Exception e) {
            throw new RuntimeException("Resume upload failed");
        }
    }
}