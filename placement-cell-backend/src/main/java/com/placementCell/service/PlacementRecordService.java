package com.placementCell.service;

import com.placementCell.dto.PlacementRecordDto;
import java.util.List;

public interface PlacementRecordService {

    PlacementRecordDto createPlacementRecord(PlacementRecordDto placementRecordDto);

    PlacementRecordDto getPlacementRecordById(Long id);

    List<PlacementRecordDto> getAllPlacementRecords();

    PlacementRecordDto updatePlacementRecord(Long id, PlacementRecordDto placementRecordDto);

    void deletePlacementRecord(Long id);
}