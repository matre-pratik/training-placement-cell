package com.placementCell.controller;

import com.placementCell.dto.PlacementRecordDto;
import com.placementCell.service.PlacementRecordService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placement-records")
@AllArgsConstructor
public class PlacementRecordController {

    private PlacementRecordService placementRecordService;

    @PostMapping
    public ResponseEntity<PlacementRecordDto> createPlacementRecord(@RequestBody PlacementRecordDto dto) {
        return ResponseEntity.ok(placementRecordService.createPlacementRecord(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlacementRecordDto> getPlacementRecordById(@PathVariable Long id) {
        return ResponseEntity.ok(placementRecordService.getPlacementRecordById(id));
    }

    @GetMapping
    public ResponseEntity<List<PlacementRecordDto>> getAllPlacementRecords() {
        return ResponseEntity.ok(placementRecordService.getAllPlacementRecords());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlacementRecordDto> updatePlacementRecord(
            @PathVariable Long id,
            @RequestBody PlacementRecordDto dto) {

        return ResponseEntity.ok(
                placementRecordService.updatePlacementRecord(id, dto)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePlacementRecord(@PathVariable Long id) {
        placementRecordService.deletePlacementRecord(id);
        return ResponseEntity.ok("Placement Record deleted successfully");
    }
}