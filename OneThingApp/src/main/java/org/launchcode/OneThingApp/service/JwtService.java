package org.launchcode.OneThingApp.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.aspectj.lang.annotation.Before;
import org.launchcode.OneThingApp.models.User;

@Service
public class JwtService {
	
	private final String SECRET_KEY = "d0abf0b1c15f77d02c434f385b0a50c5c4d4dacad1db72070532dce1822bfad9";

	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}
	
	public boolean isValid(String token, UserDetails user) {
		String usernameString = extractUsername(token);
		return usernameString.equals(user.getUsername()) && !isTokenExpired(token);
	}
	
	private boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	public <T> T extractClaim(String token, Function<Claims, T> resolver) {
		Claims claims = extractAllClaims(token);
		return resolver.apply(claims);
	}
	
	private Claims extractAllClaims(String token) {
		return Jwts
				.parser().verifyWith(getSigninKey())
				.build().parseSignedClaims(token)
				.getPayload();
	}
	
	public String generateToken(User user) {
		
		String token = Jwts
				.builder()
				.subject(user.getUsername())
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + 24*60*60*1000))
				.signWith(getSigninKey())
				.compact();
		
		return token;
		
	}
	
	private SecretKey getSigninKey() {
		byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
		return Keys.hmacShaKeyFor(keyBytes);
	}
	
}
