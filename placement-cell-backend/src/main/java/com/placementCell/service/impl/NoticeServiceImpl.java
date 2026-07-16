package com.placementCell.service.impl;

import com.placementCell.dto.NoticeDto;
import com.placementCell.entity.Notice;
import com.placementCell.mapper.NoticeMapper;
import com.placementCell.repository.NoticeRepository;
import com.placementCell.service.NoticeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private NoticeRepository noticeRepository;

    @Override
    public NoticeDto createNotice(NoticeDto dto) {

        Notice notice = NoticeMapper.mapToNotice(dto);

        Notice saved = noticeRepository.save(notice);

        return NoticeMapper.mapToNoticeDto(saved);
    }

    @Override
    public NoticeDto getNoticeById(Long id) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notice not found"));

        return NoticeMapper.mapToNoticeDto(notice);
    }

    @Override
    public List<NoticeDto> getAllNotices() {
        return noticeRepository.findAll()
                .stream()
                .map(NoticeMapper::mapToNoticeDto)
                .collect(Collectors.toList());
    }

    @Override
    public NoticeDto updateNotice(Long id, NoticeDto dto) {

        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notice not found"));

        notice.setTitle(dto.getTitle());
        notice.setMessage(dto.getMessage());
        notice.setPublishDate(dto.getPublishDate());

        Notice updated = noticeRepository.save(notice);

        return NoticeMapper.mapToNoticeDto(updated);
    }

    @Override
    public void deleteNotice(Long id) {
        noticeRepository.deleteById(id);
    }
}