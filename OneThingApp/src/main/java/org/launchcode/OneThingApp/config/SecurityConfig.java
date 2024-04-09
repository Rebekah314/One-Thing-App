package org.launchcode.OneThingApp.config;


import org.launchcode.OneThingApp.filter.JwtAuthenticationFilter;
import org.launchcode.OneThingApp.service.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	private final UserDetailsServiceImpl userDetailsServiceImpl;
	
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	
	private final CustomAccessDeniedHandler customAccessDeniedHandler;
	
	

	public SecurityConfig(UserDetailsServiceImpl userDetailsServiceImpl,
			JwtAuthenticationFilter jwtAuthenticationFilter, 
			CustomAccessDeniedHandler customAccessDeniedHandler) {
		this.userDetailsServiceImpl = userDetailsServiceImpl;
		this.jwtAuthenticationFilter = jwtAuthenticationFilter;
		this.customAccessDeniedHandler = customAccessDeniedHandler;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		return http
				.csrf(AbstractHttpConfigurer::disable)
				.authorizeHttpRequests(
						req->req.requestMatchers("/login/**", "/register/**")
						.permitAll()
						.requestMatchers("/admin_only/**").hasAnyAuthority("ADMIN")
						.anyRequest()
						.authenticated()
				).userDetailsService(userDetailsServiceImpl)
				.exceptionHandling(e->e.accessDeniedHandler(customAccessDeniedHandler)
						.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
				.sessionManagement(session->session
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
				.build();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean 
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}

}
