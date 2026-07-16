package com.placementCell.mapper;

import com.placementCell.dto.JobPostingDto;
import com.placementCell.entity.JobPosting;

public class JobPostingMapper {

    public static JobPostingDto mapToJobPostingDto(JobPosting job) {
        return new JobPostingDto(
                job.getId(),
                job.getJobTitle(),
                job.getJobRole(),
                job.getLocation(),
                job.getPackageOffered(),
                job.getEligibility(),
                job.getLastDateToApply(),
                job.getJobDescription(),
                job.getCompany() != null ? job.getCompany().getId() : null
        );
    }

    public static JobPosting mapToJobPosting(JobPostingDto dto) {
        return new JobPosting(
                dto.getId(),
                dto.getJobTitle(),
                dto.getJobRole(),
                dto.getLocation(),
                dto.getPackageOffered(),
                dto.getEligibility(),
                dto.getLastDateToApply(),
                dto.getJobDescription(),
                null,
                null
        );
    }
}