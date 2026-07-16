package com.placementCell.service;

import com.placementCell.dto.NoticeDto;
import java.util.List;

public interface NoticeService {

    NoticeDto createNotice(NoticeDto noticeDto);

    NoticeDto getNoticeById(Long id);

    List<NoticeDto> getAllNotices();

    NoticeDto updateNotice(Long id, NoticeDto noticeDto);

    void deleteNotice(Long id);
}