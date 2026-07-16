package com.placementCell.repository;

import com.placementCell.dto.JobPostingDto;
import com.placementCell.entity.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {

    List<JobPosting> findByJobTitleContaining(String jobTitle);

    List<JobPosting> findByLocationContaining(String location);

}