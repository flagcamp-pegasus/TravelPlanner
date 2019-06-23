/**
 * @author
 */

package rpc;

import java.io.IOException;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;

import db.DBConnection;
import db.DBConnectionFactory;
import entity.Spot;


@WebServlet("/history")
public class RouteHistory extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RouteHistory() {
        super();
        // TODO Auto-generated constructor stub
    }

	@Override
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// check login
		HttpSession session = request.getSession(false);
		if (session == null) {
			response.setStatus(403);
			return;
		} 
		
		DBConnection connection = DBConnectionFactory.getConnection();
		
		/**
		 * TODO: delete the travel plan for this day, this can be saved to phase 2
		 */
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// check login
		HttpSession session = request.getSession(false);
		if (session == null) {
			response.setStatus(403);
			return;
		}
		
		
		String userId = request.getParameter("user_id");
		JSONArray array = new JSONArray();
		
		DBConnection conn = DBConnectionFactory.getConnection();
		/**
		 * TODO: get the travel plan for this day
		 */
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// check login
		HttpSession session = request.getSession(false);
		if (session == null) {
			response.setStatus(403);
			return;
		}
		
		DBConnection connection = DBConnectionFactory.getConnection();
		/**
		 * TODO: save the travel plan for this day
		 */	
	}
}
