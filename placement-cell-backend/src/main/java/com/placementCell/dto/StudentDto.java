package com.placementCell.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentDto {

        private Long id;
        private String fullName;
        private String email;
        private String phone;
        private String course;
        private Double percentage;
        private Integer passingYear;
        private String skills;
        private String resumePath;
        private String status;
}