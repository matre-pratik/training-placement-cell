package com.placementCell.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDto {

    private Long id;
    private String companyName;
    private String email;
    private String phone;
    private String location;
    private String website;
    private String description;
}