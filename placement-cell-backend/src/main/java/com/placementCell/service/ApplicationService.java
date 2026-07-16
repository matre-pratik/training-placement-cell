package com.placementCell.service;

import com.placementCell.dto.ApplicationDto;
import java.util.List;

public interface ApplicationService {

    ApplicationDto createApplication(ApplicationDto applicationDto);

    ApplicationDto getApplicationById(Long id);

    List<ApplicationDto> getAllApplications();

    ApplicationDto updateApplication(Long id, ApplicationDto applicationDto);

    void deleteApplication(Long id);
}