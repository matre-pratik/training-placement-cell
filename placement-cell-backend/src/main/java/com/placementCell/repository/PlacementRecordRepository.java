package com.placementCell.repository;

import com.placementCell.entity.PlacementRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PlacementRecordRepository extends JpaRepository<PlacementRecord, Long> {

    Optional<PlacementRecord> findByStudentId(Long studentId);
}