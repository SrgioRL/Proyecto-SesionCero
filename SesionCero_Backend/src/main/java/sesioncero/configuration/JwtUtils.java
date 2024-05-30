package sesioncero.configuration;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public Boolean validateToken(String token, String username) {
        try {
            final String usernameFromToken = getUsernameFromToken(token);
            return (usernameFromToken.equals(username) && !isTokenExpired(token));
        } catch (ExpiredJwtException e) {
            System.out.println("JWT Token has expired");
            return false;
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported JWT Token");
            return false;
        } catch (MalformedJwtException e) {
            System.out.println("Malformed JWT Token");
            return false;
        } catch (SignatureException e) {
            System.out.println("Invalid JWT Signature");
            return false;
        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty");
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
}
