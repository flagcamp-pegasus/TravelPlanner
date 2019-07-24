package external;

import java.security.Key;
import java.security.SecureRandom;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

public class JwtUtil {
	//private String secret="secret";
	private static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

	
	public static String generateToken(String userId, String password) {
		Claims claims = Jwts.claims().setSubject(userId);
//		claims.put("user_id", userId);
		claims.put("password", password);
		String jws = Jwts.builder().setClaims(claims).signWith(key).compact();
		return jws;
	}
	
	public static String parseToken(String token) {
		String userId= null;
		try {
			Claims body = Jwts.parser()
					.setSigningKey(key)
					.parseClaimsJws(token)
					.getBody();
			
			userId = body.getSubject();
			//userId = (String) body.get("user_id");
			//String password = (String)body.get("password");
			//System.out.println(username);
			//System.out.println(password);
			System.out.println(userId);
		} catch (SignatureException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			return  null;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			return  null;
		}
		return userId;
		
	}
	
	
	public static void  main(String [] args) {
		JwtUtil j = new JwtUtil();
		String jws = j.generateToken("1111", "2222");
		System.out.println(jws);
		//String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"; 

		System.out.println(j.parseToken(jws));
	}

}
