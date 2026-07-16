package com.placementCell.mapper;

import com.placementCell.dto.CompanyDto;
import com.placementCell.entity.Company;

public class CompanyMapper {

    public static CompanyDto mapToCompanyDto(Company company) {
        return new CompanyDto(
                company.getId(),
                company.getCompanyName(),
                company.getEmail(),
                company.getPhone(),
                company.getLocation(),
                company.getWebsite(),
                company.getDescription()
        );
    }

    public static Company mapToCompany(CompanyDto dto) {
        return new Company(
                dto.getId(),
                dto.getCompanyName(),
                dto.getEmail(),
                dto.getPhone(),
                dto.getLocation(),
                dto.getWebsite(),
                dto.getDescription(),
                null
        );
    }
}