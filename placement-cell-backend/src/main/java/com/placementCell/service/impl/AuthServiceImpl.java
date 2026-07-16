package com.placementCell.service.impl;

import com.placementCell.dto.LoginRequestDto;
import com.placementCell.dto.LoginResponseDto;
import com.placementCell.dto.UserDto;
import com.placementCell.entity.Company;
import com.placementCell.entity.Student;
import com.placementCell.entity.User;
import com.placementCell.repository.CompanyRepository;
import com.placementCell.repository.StudentRepository;
import com.placementCell.repository.UserRepository;
import com.placementCell.security.JwtService;
import com.placementCell.security.UserPrincipal;
import com.placementCell.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository    userRepository;
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder   passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    @Transactional
    public String register(UserDto userDto) {

        // CHECK EMAIL
        if(userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // Only STUDENT / COMPANY can self-register; ADMIN accounts are provisioned separately
        if (userDto.getRole() == null ||
                (!userDto.getRole().equalsIgnoreCase("STUDENT") && !userDto.getRole().equalsIgnoreCase("COMPANY"))) {
            throw new RuntimeException("Role must be STUDENT or COMPANY");
        }

        User user = new User();

        user.setFullName(userDto.getFullName());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword())); // BCrypt hash, never store plain text
        user.setRole(userDto.getRole().toUpperCase());

        // STUDENT
        if(userDto.getRole().equalsIgnoreCase("STUDENT")) {

            Student student = new Student();

            student.setFullName(userDto.getFullName());
            student.setEmail(userDto.getEmail());
            student.setPhone(userDto.getPhone());
            student.setCourse(userDto.getCourse());
            student.setPercentage(userDto.getPercentage());
            student.setPassingYear(userDto.getPassingYear());
            student.setSkills(userDto.getSkills());
            student.setStatus("UNPLACED");

            Student savedStudent = studentRepository.save(student);

            user.setStudent(savedStudent);
        }

        // COMPANY
        if(userDto.getRole().equalsIgnoreCase("COMPANY")) {

            Company company = new Company();

            company.setCompanyName(userDto.getFullName());
            company.setEmail(userDto.getEmail());
            company.setPhone(userDto.getPhone());
            company.setLocation(userDto.getLocation());
            company.setWebsite(userDto.getWebsite());
            company.setDescription(userDto.getDescription());

            Company savedCompany = companyRepository.save(company);

            user.setCompany(savedCompany);
        }

        userRepository.save(user);

        return "Registration successful";
    }


    @Override
    public LoginResponseDto login(LoginRequestDto request) {

        // Delegates credential checking to Spring Security's AuthenticationManager,
        // which uses CustomUserDetailsService + BCryptPasswordEncoder under the hood.
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (BadCredentialsException ex) {
            throw new BadCredentialsException("Invalid email or password");
        }

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();

        User user = userRepository.findByEmail(principal.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(user.getEmail(), user.getRole(), user.getId());

        LoginResponseDto response = new LoginResponseDto();
        response.setMessage("Login successful");
        response.setToken(token);
        response.setEmail(user.getEmail());
        response.setFullName(user.getFullName());
        response.setRole(user.getRole());

        if ("STUDENT".equalsIgnoreCase(user.getRole()) && user.getStudent() != null) {
            response.setStudentId(user.getStudent().getId());
        }

        if ("COMPANY".equalsIgnoreCase(user.getRole()) && user.getCompany() != null) {
            response.setCompanyId(user.getCompany().getId());
        }

        return response;
    }
}
