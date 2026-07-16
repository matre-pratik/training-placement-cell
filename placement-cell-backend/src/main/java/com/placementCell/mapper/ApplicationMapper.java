package com.placementCell.mapper;

import com.placementCell.dto.ApplicationDto;
import com.placementCell.entity.Application;

public class ApplicationMapper {

    public static ApplicationDto mapToApplicationDto(Application application) {
        return new ApplicationDto(
                application.getId(),
                application.getAppliedDate(),
                application.getApplicationStatus(),
                application.getStudent() != null ? application.getStudent().getId() : null,
                application.getJobPosting() != null ? application.getJobPosting().getId() : null
        );
    }

    public static Application mapToApplication(ApplicationDto dto) {
        return new Application(
                dto.getId(),
                dto.getAppliedDate(),
                dto.getApplicationStatus(),
                null,
                null
        );
    }
}