package com.placementCell.service;

import com.placementCell.dto.JobPostingDto;
import org.springframework.data.domain.Page;


public interface JobPostingService {

    JobPostingDto createJobPosting(JobPostingDto jobPostingDto);

    JobPostingDto getJobPostingById(Long id);

    Page<JobPostingDto> getAllJobPostings(int page, int size);

    JobPostingDto updateJobPosting(Long id, JobPostingDto jobPostingDto);

    void deleteJobPosting(Long id);
}