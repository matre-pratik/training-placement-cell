package com.placementCell.dto;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDto {

    private Long id;
    private String title;
    private String message;
    private LocalDate publishDate;
}