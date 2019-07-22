package rpc;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import entity.Place;
import external.GoogleMapRecommendRoutesAPI;

/**
 * Servlet implementation class RecommendRoute
 */
@WebServlet("/recommend")
public class RecommendRoute extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RecommendRoute() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		try {
			JSONObject input = RpcHelper.readJSONObject(request);
			JSONArray  array = input.getJSONArray("route");
			int day = input.getInt("ithDay");
			List<Place> places = RpcHelper.parseArray(array);
			GoogleMapRecommendRoutesAPI myAPI = new GoogleMapRecommendRoutesAPI();
			List<Place> orderRoute = myAPI.search(places, null);
			
			JSONArray newRoute = new JSONArray();
			for (Place onePlace : orderRoute) {
				newRoute.put(onePlace.toJSONObject());
			}
			JSONObject recommRoute = new JSONObject();
			recommRoute.put("ithDay", day);
			recommRoute.put("route", newRoute);
			System.out.println(recommRoute);
			RpcHelper.writeJsonObject(response, recommRoute);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
