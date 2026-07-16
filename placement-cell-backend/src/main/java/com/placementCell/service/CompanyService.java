package com.placementCell.service;

import com.placementCell.dto.CompanyDto;
import java.util.List;

public interface CompanyService {

    CompanyDto createCompany(CompanyDto companyDto);

    CompanyDto getCompanyById(Long id);

    List<CompanyDto> getAllCompanies();

    CompanyDto updateCompany(Long id, CompanyDto companyDto);

    void deleteCompany(Long id);
}