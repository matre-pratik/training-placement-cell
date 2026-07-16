package com.placementCell.service.impl;

import com.placementCell.dto.ApplicationDto;
import com.placementCell.entity.Application;
import com.placementCell.entity.JobPosting;
import com.placementCell.entity.Student;
import com.placementCell.mapper.ApplicationMapper;
import com.placementCell.repository.ApplicationRepository;
import com.placementCell.repository.JobPostingRepository;
import com.placementCell.repository.StudentRepository;
import com.placementCell.service.ApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private ApplicationRepository applicationRepository;
    private StudentRepository studentRepository;
    private JobPostingRepository jobPostingRepository;

    @Override
    public ApplicationDto createApplication(ApplicationDto dto) {

        Application application = ApplicationMapper.mapToApplication(dto);

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        JobPosting jobPosting = jobPostingRepository.findById(dto.getJobPostingId())
                .orElseThrow(() -> new RuntimeException("Job Posting not found"));

        application.setStudent(student);
        application.setJobPosting(jobPosting);

        Application saved = applicationRepository.save(application);

        return ApplicationMapper.mapToApplicationDto(saved);
    }

    @Override
    public ApplicationDto getApplicationById(Long id) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        return ApplicationMapper.mapToApplicationDto(application);
    }

    @Override
    public List<ApplicationDto> getAllApplications() {
        return applicationRepository.findAll()
                .stream()
                .map(ApplicationMapper::mapToApplicationDto)
                .collect(Collectors.toList());
    }

    @Override
    public ApplicationDto updateApplication(Long id, ApplicationDto dto) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setApplicationStatus(dto.getApplicationStatus());
        application.setAppliedDate(dto.getAppliedDate());

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        JobPosting jobPosting = jobPostingRepository.findById(dto.getJobPostingId())
                .orElseThrow(() -> new RuntimeException("Job Posting not found"));

        application.setStudent(student);
        application.setJobPosting(jobPosting);

        Application updated = applicationRepository.save(application);

        return ApplicationMapper.mapToApplicationDto(updated);
    }

    @Override
    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }
}