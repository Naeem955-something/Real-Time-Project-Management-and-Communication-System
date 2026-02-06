package com.innovision.productivityhub.repository;

import com.innovision.productivityhub.model.DailySummary;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DailySummaryRepository extends JpaRepository<DailySummary, Long> {
    List<DailySummary> findTop10ByOrderByCreatedAtDesc();
    List<DailySummary> findTop5ByOrderByCreatedAtDesc();
}
