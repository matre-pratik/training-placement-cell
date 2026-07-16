package com.placementCell.dto;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlacementRecordDto {

    private Long id;
    private String companyName;
    private String jobRole;
    private Double packageOffered;
    private LocalDate joiningDate;
    private Long studentId;
}