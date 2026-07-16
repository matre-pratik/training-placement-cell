package com.placementCell.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate appliedDate;

    private String applicationStatus; //APPLIED, SHORTLISTED, REJECTED, SELECTED

    // Many applications belong to one student
    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private Student student;

    // Many applications belong to one job
    @ManyToOne
    @JoinColumn(name = "job_posting_id")
    @JsonIgnore
    private JobPosting jobPosting;
}