package com.placementCell.controller;

import com.placementCell.dto.NoticeDto;
import com.placementCell.service.NoticeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@AllArgsConstructor
public class NoticeController {

    private NoticeService noticeService;

    @PostMapping
    public ResponseEntity<NoticeDto> createNotice(@RequestBody NoticeDto dto) {
        return ResponseEntity.ok(noticeService.createNotice(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoticeDto> getNoticeById(@PathVariable Long id) {
        return ResponseEntity.ok(noticeService.getNoticeById(id));
    }

    @GetMapping
    public ResponseEntity<List<NoticeDto>> getAllNotices() {
        return ResponseEntity.ok(noticeService.getAllNotices());
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoticeDto> updateNotice(
            @PathVariable Long id,
            @RequestBody NoticeDto dto) {

        return ResponseEntity.ok(noticeService.updateNotice(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNotice(@PathVariable Long id) {
        noticeService.deleteNotice(id);
        return ResponseEntity.ok("Notice deleted successfully");
    }
}