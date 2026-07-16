package com.placementCell.service.impl;

import com.placementCell.dto.JobPostingDto;
import com.placementCell.entity.Company;
import com.placementCell.entity.JobPosting;
import com.placementCell.mapper.JobPostingMapper;
import com.placementCell.repository.CompanyRepository;
import com.placementCell.repository.JobPostingRepository;
import com.placementCell.service.JobPostingService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class JobPostingServiceImpl implements JobPostingService {

    private JobPostingRepository jobPostingRepository;
    private CompanyRepository companyRepository;

    @Override
    public JobPostingDto createJobPosting(JobPostingDto dto) {

        JobPosting jobPosting = JobPostingMapper.mapToJobPosting(dto);

        Company company = companyRepository.findById(dto.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        jobPosting.setCompany(company);

        JobPosting saved = jobPostingRepository.save(jobPosting);

        return JobPostingMapper.mapToJobPostingDto(saved);
    }

    @Override
    public JobPostingDto getJobPostingById(Long id) {
        JobPosting jobPosting = jobPostingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job Posting not found"));

        return JobPostingMapper.mapToJobPostingDto(jobPosting);
    }

    @Override
    public Page<JobPostingDto> getAllJobPostings(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<JobPosting> jobPostings = jobPostingRepository.findAll(pageable);
        return jobPostings.map(JobPostingMapper::mapToJobPostingDto);
    }

    @Override
    public JobPostingDto updateJobPosting(Long id, JobPostingDto dto) {
        JobPosting jobPosting = jobPostingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job Posting not found"));

        jobPosting.setJobTitle(dto.getJobTitle());
        jobPosting.setJobRole(dto.getJobRole());
        jobPosting.setLocation(dto.getLocation());
        jobPosting.setPackageOffered(dto.getPackageOffered());
        jobPosting.setEligibility(dto.getEligibility());
        jobPosting.setLastDateToApply(dto.getLastDateToApply());
        jobPosting.setJobDescription(dto.getJobDescription());

        Company company = companyRepository.findById(dto.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        jobPosting.setCompany(company);

        JobPosting updated = jobPostingRepository.save(jobPosting);

        return JobPostingMapper.mapToJobPostingDto(updated);
    }

    @Override
    public void deleteJobPosting(Long id) {
        jobPostingRepository.deleteById(id);
    }
}