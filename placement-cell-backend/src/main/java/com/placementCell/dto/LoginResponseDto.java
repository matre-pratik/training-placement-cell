package com.placementCell.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {

    private String message;
    private String token;
    private String email;
    private String fullName;
    private String role;

    // Only one of these will be set based on role
    private Long   studentId;   // set when role = STUDENT
    private Long   companyId;   // set when role = COMPANY
}
