package com.placementCell.mapper;

import com.placementCell.dto.StudentDto;
import com.placementCell.entity.Student;

public class StudentMapper {

    public static StudentDto mapToStudentDto(Student student) {
        return new StudentDto(
                student.getId(),
                student.getFullName(),
                student.getEmail(),
                student.getPhone(),
                student.getCourse(),
                student.getPercentage(),
                student.getPassingYear(),
                student.getSkills(),
                student.getResumePath(),
                student.getStatus()
        );
    }

    public static Student mapToStudent(StudentDto dto) {
        return new Student(
                dto.getId(),
                dto.getFullName(),
                dto.getEmail(),
                dto.getPhone(),
                dto.getCourse(),
                dto.getPercentage(),
                dto.getPassingYear(),
                dto.getSkills(),
                dto.getResumePath(),
                dto.getStatus(),
                null,
                null
        );
    }
}