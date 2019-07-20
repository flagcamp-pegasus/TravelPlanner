package external;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class DistanceMatrix {
	private static final String URL = "https://maps.googleapis.com/maps/api/distancematrix/json";
	private static final String API_KEY = "AIzaSyCF0fQdt3mobT0CdhtxhERs663eOfT_u-o";// lobster API key

	
	public int getDistance(double[] origin, double[] dest) {
		// input[i][0] is the lat, input[i][1] is the lon for ith origin place 
		
		// ?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=YOUR_API_KEY
		// assuming we have only 1 origin, 1 destination
		String origins = origin[0] + ","+origin[1];		
		String destin = dest[0] + "," + dest[1];
		
		String query = String.format("units=imperial&origins=%s&destinations=%s&key=%s", 
				origins, destin, API_KEY);
		String url = URL +"?" +query;
		
		try {
			HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
			connection.setRequestMethod("GET");
			
			int responseCode = connection.getResponseCode();
			System.out.println("Sending request to url: " + url);
			System.out.println("Response code: " + responseCode);
			
			if (responseCode != 200) {
				return -1;
			}
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String line;
			StringBuilder response = new StringBuilder();
			
			while((line = reader.readLine())!= null) {
				response.append(line);
			}
			reader.close();
			JSONObject obj = new JSONObject(response.toString());
			System.out.println(obj.toString());
			
			String stat = obj.getJSONArray("rows")
					.getJSONObject(0)
					.getJSONArray ("elements")
					.getJSONObject(0)
					.getString("status");			
			
			
			System.out.println(stat.equals("ZERO_RESULTS"));
			System.out.println(stat!="ZERO_RESULTS");
			
			if(!stat.equals("ZERO_RESULTS")) {	
				System.out.println("Valid origins and destinations.");
				return parseToDistance(obj.getJSONArray("rows"));
			} else {
				System.out.println("Invalid origins and destinations.");
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
//			System.out.println("Invalid origins and destinations.");
			e.printStackTrace();
		}				
		return -1;
	}
	
	private int parseToDistance(JSONArray results) throws JSONException{
		// only return the distance of 2 places.
		JSONObject jsonRespRouteDistance = results
				.getJSONObject(0)
                .getJSONArray ("elements")
                .getJSONObject(0)
                .getJSONObject("distance");
		
		int dist = jsonRespRouteDistance.getInt("value");
		return dist;		
	}	
	

	public static void main(String[] args) {
		
		// invalid origins and destination test set
		double[] origin1 = new double[2];
		origin1[0] = -35.8670522;
		origin1[1] =  156.1957362;			
		
		double[] dest1 = new double[2];
		dest1[0] = 37.3861;
		dest1[1] =  122.0839;
		
		// valid origins and destination test set
		double[] origin = new double[2];
		origin[0] = 39.9606090;
		origin[1] =  -75.1896830;	
		
		double[] dest = new double[2];
		dest[0] = 37.5311760;
		dest[1] = -122.2558530;
		
		DistanceMatrix dAPI = new DistanceMatrix();
		long ret = dAPI.getDistance(origin, dest);
		System.out.println("Test getDistance: "+ret);
		
	}
}
