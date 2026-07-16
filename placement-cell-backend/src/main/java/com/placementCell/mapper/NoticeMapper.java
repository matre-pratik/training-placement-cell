package com.placementCell.mapper;

import com.placementCell.dto.NoticeDto;
import com.placementCell.entity.Notice;

public class NoticeMapper {

    public static NoticeDto mapToNoticeDto(Notice notice) {
        return new NoticeDto(
                notice.getId(),
                notice.getTitle(),
                notice.getMessage(),
                notice.getPublishDate()
        );
    }

    public static Notice mapToNotice(NoticeDto dto) {
        return new Notice(
                dto.getId(),
                dto.getTitle(),
                dto.getMessage(),
                dto.getPublishDate()
        );
    }
}