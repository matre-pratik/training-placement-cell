package com.placementCell.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true)
    private String email;

    private String phone;

    private String course;

    private Double percentage;

    private Integer passingYear;

    private String skills;

    private String resumePath;;

    private String status; // Placed / Unplaced

    // One student can apply to many applications
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Application> applications;

    // One student can have one placement record
    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL)
    @JsonIgnore
    private PlacementRecord placementRecord;
}