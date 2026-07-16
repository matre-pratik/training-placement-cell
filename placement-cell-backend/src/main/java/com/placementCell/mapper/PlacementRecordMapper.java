package com.placementCell.mapper;

import com.placementCell.dto.PlacementRecordDto;
import com.placementCell.entity.PlacementRecord;

public class PlacementRecordMapper {

    public static PlacementRecordDto mapToPlacementRecordDto(PlacementRecord record) {
        return new PlacementRecordDto(
                record.getId(),
                record.getCompanyName(),
                record.getJobRole(),
                record.getPackageOffered(),
                record.getJoiningDate(),
                record.getStudent() != null ? record.getStudent().getId() : null
        );
    }

    public static PlacementRecord mapToPlacementRecord(PlacementRecordDto dto) {
        return new PlacementRecord(
                dto.getId(),
                dto.getCompanyName(),
                dto.getJobRole(),
                dto.getPackageOffered(),
                dto.getJoiningDate(),
                null
        );
    }
}