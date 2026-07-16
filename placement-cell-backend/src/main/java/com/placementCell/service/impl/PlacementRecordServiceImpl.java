package com.placementCell.service.impl;

import com.placementCell.dto.PlacementRecordDto;
import com.placementCell.entity.PlacementRecord;
import com.placementCell.entity.Student;
import com.placementCell.mapper.PlacementRecordMapper;
import com.placementCell.repository.PlacementRecordRepository;
import com.placementCell.repository.StudentRepository;
import com.placementCell.service.PlacementRecordService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PlacementRecordServiceImpl implements PlacementRecordService {

    private PlacementRecordRepository placementRecordRepository;
    private StudentRepository studentRepository;

    @Override
    public PlacementRecordDto createPlacementRecord(PlacementRecordDto dto) {

        PlacementRecord record = PlacementRecordMapper.mapToPlacementRecord(dto);

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        record.setStudent(student);

        PlacementRecord saved = placementRecordRepository.save(record);

        return PlacementRecordMapper.mapToPlacementRecordDto(saved);
    }

    @Override
    public PlacementRecordDto getPlacementRecordById(Long id) {

        PlacementRecord record = placementRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Placement Record not found"));

        return PlacementRecordMapper.mapToPlacementRecordDto(record);
    }

    @Override
    public List<PlacementRecordDto> getAllPlacementRecords() {
        return placementRecordRepository.findAll()
                .stream()
                .map(PlacementRecordMapper::mapToPlacementRecordDto)
                .collect(Collectors.toList());
    }

    @Override
    public PlacementRecordDto updatePlacementRecord(Long id, PlacementRecordDto dto) {

        PlacementRecord record = placementRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Placement Record not found"));

        record.setCompanyName(dto.getCompanyName());
        record.setJobRole(dto.getJobRole());
        record.setPackageOffered(dto.getPackageOffered());
        record.setJoiningDate(dto.getJoiningDate());

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        record.setStudent(student);

        PlacementRecord updated = placementRecordRepository.save(record);

        return PlacementRecordMapper.mapToPlacementRecordDto(updated);
    }

    @Override
    public void deletePlacementRecord(Long id) {
        placementRecordRepository.deleteById(id);
    }
}