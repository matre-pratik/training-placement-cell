package com.placementCell.service;

import com.placementCell.dto.LoginRequestDto;
import com.placementCell.dto.LoginResponseDto;
import com.placementCell.dto.UserDto;

public interface AuthService {
    String register(UserDto dto);
    LoginResponseDto login(LoginRequestDto request);
}
