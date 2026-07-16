package com.placementCell.service.impl;

import com.placementCell.dto.CompanyDto;
import com.placementCell.entity.Company;
import com.placementCell.entity.User;
import com.placementCell.mapper.CompanyMapper;
import com.placementCell.repository.CompanyRepository;
import com.placementCell.repository.UserRepository;
import com.placementCell.service.CompanyService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private CompanyRepository companyRepository;

    private UserRepository userRepository;

    @Override
    public CompanyDto createCompany(CompanyDto companyDto) {
        Company company = CompanyMapper.mapToCompany(companyDto);
        Company savedCompany = companyRepository.save(company);
        return CompanyMapper.mapToCompanyDto(savedCompany);
    }

    @Override
    public CompanyDto getCompanyById(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        return CompanyMapper.mapToCompanyDto(company);
    }

    @Override
    public List<CompanyDto> getAllCompanies() {
        return companyRepository.findAll()
                .stream()
                .map(CompanyMapper::mapToCompanyDto)
                .collect(Collectors.toList());
    }

    @Override
    public CompanyDto updateCompany(Long id, CompanyDto companyDto) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        company.setCompanyName(companyDto.getCompanyName());
        company.setEmail(companyDto.getEmail());
        company.setPhone(companyDto.getPhone());
        company.setLocation(companyDto.getLocation());
        company.setWebsite(companyDto.getWebsite());
        company.setDescription(companyDto.getDescription());

        Company updated = companyRepository.save(company);
        return CompanyMapper.mapToCompanyDto(updated);
    }


    @Override
    public void deleteCompany(Long id) {

        Optional<User> userOptional = userRepository.findByCompanyId(id);

        userOptional.ifPresent(userRepository::delete);

        companyRepository.deleteById(id);
    }
}