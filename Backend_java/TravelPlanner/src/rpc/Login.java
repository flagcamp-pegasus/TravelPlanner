package rpc;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import db.DBConnection;
import db.DBConnectionFactory;
import external.JwtUtil;

/**
 * Servlet implementation class Log
 */
@WebServlet("/login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		DBConnection connection = DBConnectionFactory.getConnection();
		
		try {
			// need to change
			//HttpSession session = request.getSession(false);
			String authorization = request.getHeader("Authorization");

			JSONObject obj = new JSONObject();
			if(authorization != null) {
				String token = authorization.substring(7);
				System.out.println("token is "+ token);
				String userId = JwtUtil.parseToken(token);
				obj.put("status", "OK").put("user_id", userId).put("name", connection.getFullName(userId));
			}else {
				obj.put("status", "Invalid Session");
				response.setStatus(403);
			}
			RpcHelper.writeJsonObject(response, obj);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			connection.close();
		}
		
		
		//RpcHelper.writeJsonArray(response,array);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		DBConnection connection = DBConnectionFactory.getConnection();

		try {
			JSONObject input = RpcHelper.readJSONObject(request);

			String userId = input.getString("user_id");
			System.out.println(" userId: " + userId);
			String password = input.getString("password");
			System.out.println(" password"+ password);
			
			JSONObject obj = new JSONObject();
			if(connection.verifyLogin(userId, password)) {
//				HttpSession session = request.getSession();
//				session.setAttribute("user_id", userId);
//				session.setMaxInactiveInterval(600);
				String token = JwtUtil.generateToken(userId, password);
				System.out.println(token);
				obj.put("status", "OK").put("user_id", userId).put("name", connection.getFullName(userId))
				.append("Token", token);
			}else {
				obj.put("status", "User Doesn't Exist");
				response.setStatus(401);
			}
			RpcHelper.writeJsonObject(response, obj);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			connection.close();
		}
		
	}

}
