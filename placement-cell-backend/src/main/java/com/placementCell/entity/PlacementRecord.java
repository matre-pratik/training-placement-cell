package com.placementCell.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "placement_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlacementRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;

    private String jobRole;

    private Double packageOffered;

    private LocalDate joiningDate;

    // One placement record belongs to one student
    @OneToOne
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private Student student;
}
