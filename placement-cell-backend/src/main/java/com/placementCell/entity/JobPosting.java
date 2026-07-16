package com.placementCell.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "job_postings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobPosting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String jobTitle;

    private String jobRole;

    private String location;

    private Double packageOffered;

    private String eligibility;

    private LocalDate lastDateToApply;

    private String jobDescription;

    // Many jobs belong to one company
    @ManyToOne
    @JoinColumn(name = "company_id")
    @JsonIgnore
    private Company company;

    // One job can have many applications
    @OneToMany(mappedBy = "jobPosting", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Application> applications;
}