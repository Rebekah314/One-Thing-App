package org.launchcode.OneThingApp.config;

import org.launchcode.OneThingApp.filter.JwtAuthenticationFilter;
import org.launchcode.OneThingApp.service.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.frameoptions.RegExpAllowFromStrategy;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	private final UserDetailsServiceImpl userDetailsServiceImpl;
	
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	
	public SecurityConfig(UserDetailsServiceImpl userDetailsServiceImpl,
			JwtAuthenticationFilter jwtAuthenticationFilter) {
		this.userDetailsServiceImpl = userDetailsServiceImpl;
		this.jwtAuthenticationFilter = jwtAuthenticationFilter;
	}



	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		return http
				.csrf(AbstractHttpConfigurer::disable)
				.authorizeHttpRequests(
						req->req.requestMatchers("/login/**", "/register/**")
						.permitAll()
						.anyRequest()
						.authenticated()
				).userDetailsService(userDetailsServiceImpl)
				.sessionManagement(session->session
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
				.build();
	}

}
