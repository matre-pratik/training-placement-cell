package com.placementCell.security;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // No manual DaoAuthenticationProvider needed here.
    // Spring Security automatically builds one using the CustomUserDetailsService
    // bean (@Service) together with the PasswordEncoder bean above.

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/api/auth/**").permitAll()

                // STUDENTS
                .requestMatchers(HttpMethod.GET, "/api/students/**").hasAnyRole("ADMIN", "STUDENT", "COMPANY")
                .requestMatchers(HttpMethod.POST, "/api/students/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/students/**").hasAnyRole("ADMIN", "STUDENT")
                .requestMatchers(HttpMethod.DELETE, "/api/students/**").hasRole("ADMIN")

                // COMPANIES
                .requestMatchers(HttpMethod.GET, "/api/companies/**").hasAnyRole("ADMIN", "STUDENT", "COMPANY")
                .requestMatchers(HttpMethod.POST, "/api/companies/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/companies/**").hasAnyRole("ADMIN", "COMPANY")
                .requestMatchers(HttpMethod.DELETE, "/api/companies/**").hasRole("ADMIN")

                // JOB POSTINGS
                .requestMatchers(HttpMethod.GET, "/api/job-postings/**").hasAnyRole("ADMIN", "STUDENT", "COMPANY")
                .requestMatchers(HttpMethod.POST, "/api/job-postings/**").hasAnyRole("ADMIN", "COMPANY")
                .requestMatchers(HttpMethod.PUT, "/api/job-postings/**").hasAnyRole("ADMIN", "COMPANY")
                .requestMatchers(HttpMethod.DELETE, "/api/job-postings/**").hasAnyRole("ADMIN", "COMPANY")

                // APPLICATIONS
                .requestMatchers(HttpMethod.GET, "/api/applications/**").hasAnyRole("ADMIN", "STUDENT", "COMPANY")
                .requestMatchers(HttpMethod.POST, "/api/applications/**").hasRole("STUDENT")
                .requestMatchers(HttpMethod.PUT, "/api/applications/**").hasAnyRole("ADMIN", "COMPANY")
                .requestMatchers(HttpMethod.DELETE, "/api/applications/**").hasAnyRole("ADMIN", "STUDENT")

                // NOTICES
                .requestMatchers(HttpMethod.GET, "/api/notices/**").hasAnyRole("ADMIN", "STUDENT", "COMPANY")
                .requestMatchers(HttpMethod.POST, "/api/notices/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/notices/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/notices/**").hasRole("ADMIN")

                // PLACEMENT RECORDS
                .requestMatchers(HttpMethod.GET, "/api/placement-records/**").hasAnyRole("ADMIN", "STUDENT", "COMPANY")
                .requestMatchers(HttpMethod.POST, "/api/placement-records/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/placement-records/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/placement-records/**").hasRole("ADMIN")

                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
