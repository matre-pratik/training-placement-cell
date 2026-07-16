package com.placementCell.dto;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDto {

    private Long id;
    private LocalDate appliedDate;
    private String applicationStatus;

    // only ids
    private Long studentId;
    private Long jobPostingId;
}