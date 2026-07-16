package com.placementCell.controller;

import com.placementCell.dto.JobPostingDto;
import com.placementCell.service.JobPostingService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/job-postings")
@AllArgsConstructor
public class JobPostingController {

    private final JobPostingService jobPostingService;

    @PostMapping
    public ResponseEntity<JobPostingDto> createJobPosting(@RequestBody JobPostingDto dto) {
        return ResponseEntity.ok(jobPostingService.createJobPosting(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobPostingDto> getJobPostingById(@PathVariable Long id) {
        return ResponseEntity.ok(jobPostingService.getJobPostingById(id));
    }

    @GetMapping
    public ResponseEntity<Page<JobPostingDto>> getAllJobPostings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(jobPostingService.getAllJobPostings(page, size));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<JobPostingDto> updateJobPosting(
            @PathVariable Long id,
            @RequestBody JobPostingDto dto) {
        return ResponseEntity.ok(jobPostingService.updateJobPosting(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJobPosting(@PathVariable Long id) {
        jobPostingService.deleteJobPosting(id);
        return ResponseEntity.ok("Job Posting deleted successfully");
    }
}
