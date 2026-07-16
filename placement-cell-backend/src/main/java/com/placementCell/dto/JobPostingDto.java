package com.placementCell.dto;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobPostingDto {

    private Long id;
    private String jobTitle;
    private String jobRole;
    private String location;
    private Double packageOffered;
    private String eligibility;
    private LocalDate lastDateToApply;
    private String jobDescription;

    //  company id,
    private Long companyId;
}