package com.multipixeltec.dcservice.config;

import com.multipixeltec.dcservice.model.User;
import com.multipixeltec.dcservice.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.util.Optional;


@Configuration
@EnableJpaAuditing
@EnableTransactionManagement
public class AuditingConfiguration{

    private final UserService userService;

    public AuditingConfiguration(UserService userService) {
        this.userService = userService;
    }

    @Bean
    public AuditorAware<User> auditorProvider() {
        if (SecurityContextHolder.getContext().getAuthentication() == null){
            Optional<User> optional = userService.find(1L);
            return () -> Optional.ofNullable(optional.get());
        }else {
            String name = SecurityContextHolder.getContext().getAuthentication().getName();
            Optional<User> optional = userService.findByEmail(name);
            return () -> Optional.ofNullable(optional.get());
        }

    }
}
