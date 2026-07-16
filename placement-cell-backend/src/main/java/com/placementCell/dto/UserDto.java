package com.placementCell.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long   id;
    private String fullName;
    private String email;
    private String password;
    private String role;      // STUDENT or COMPANY (ADMIN blocked)


    // Student
    private String phone;
    private String course;
    private Double percentage;
    private Integer passingYear;
    private String skills;

    // Company
    private String location;
    private String website;
    private String description;


    // These come from the linked Student / Company after registration
    private Long   studentId;
    private Long   companyId;
}
