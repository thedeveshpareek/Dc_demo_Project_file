package com.multipixeltec.dcservice.config;

import com.multipixeltec.dcservice.auth.JWTAuthFilter;
import com.multipixeltec.dcservice.auth.JwtTokenService;
import com.multipixeltec.dcservice.util.JwtUserDetailsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.security.SecureRandom;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Value("${security.salt}")
    private String salt;
    private final JwtTokenService jwtTokenService;
    private final UserDetailsService userDetailsService;

    public SecurityConfiguration(JwtTokenService jwtTokenService, UserDetailsService userDetailsService) {
        this.jwtTokenService = jwtTokenService;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public JWTAuthFilter authenticationJwtTokenFilter() {
        return new JWTAuthFilter(jwtTokenService,userDetailsService);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(8, new SecureRandom(salt.getBytes()));
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new JwtUserDetailsService();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors();
        http.csrf().disable()
                // dont authenticate this particular request
                .authorizeRequests()
                .antMatchers("/actuator/**","/swagger-ui.html","/swagger-ui/**","/v3/api-docs/**","/actuator/shutdown").permitAll()
                .antMatchers("/api/v1/patient/**/passport","/api/v1/patient/*","/api/v1/ref-value","/api/v1/sms/**").permitAll()
                .antMatchers("/api/v1/auth/signin","/api/v1/auth/face","/api/v1/auth/refresh","/api/v1/role/init","/api/v1/role/fix","/api/v1/user/init","/resource/**").permitAll()
                .antMatchers("/api/v1/patient/fixRegNumbers").permitAll()
                .antMatchers(HttpHeaders.ALLOW).permitAll()
                // all other requests need to be authenticated
                .anyRequest().authenticated()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(new JWTAuthFilter(jwtTokenService,userDetailsService()), UsernamePasswordAuthenticationFilter.class);
        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        http.headers().frameOptions().disable();
        return http.build();
    }

    /*@Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("/error", "/resources/**", "/static/**", "/assets/**", "/js/**", "/images/**", "/gallery/**");
    }*/


}
