package external;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.net.URL;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import entity.Place;
import entity.Place.PlaceBuilder;

public class PlacesAPI {
	private static final String URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
	private static final String API_KEY = "AIzaSyAeImuPB0hu7nmruivsGkKAhMPdIFhPyQE";// my API key
	private static final String DEFAULT_KEYWORD = "";// whether no restrict

	
	public List<Place> search(double lat, double lon, String keyword) {
		if(keyword == null) {
			keyword = DEFAULT_KEYWORD;
		}
		
		try {
			keyword = URLEncoder.encode(keyword, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String query = String.format("location=%s,%s&radius=%s&types=%s&name=%s&key=%s", 
				lat,lon,500,"","",API_KEY);
		String url = URL +"?" +query;
		
		try {
			HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
			connection.setRequestMethod("GET");
			
			int responseCode = connection.getResponseCode();
			System.out.println("Sending request to url: " + url);
			System.out.println("Response code: " + responseCode);
			
			if (responseCode != 200) {
				return new ArrayList<>();
			}
			
			BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String line;
			StringBuilder response = new StringBuilder();
			
			while((line = reader.readLine())!= null) {
				response.append(line);
			}
			reader.close();
			JSONObject obj = new JSONObject(response.toString());
			
			if(!obj.isNull("results")) {

				return getPlaceList(obj.getJSONArray("results"));
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return new ArrayList<>();
	}
	
	private List<Place> getPlaceList(JSONArray results) throws JSONException{
		List<Place> placeList = new ArrayList<>();
		for(int i =0; i<results.length(); i++) {
			JSONObject result = results.getJSONObject(i);
			
			PlaceBuilder builder = new PlaceBuilder();
			if(!result.isNull("name")) {
				builder.setName(result.getString("name"));
			}
			if(!result.isNull("place_id")) {
				builder.setPlace_id(result.getString("place_id"));
			}
			if(!result.isNull("geometry")) {
				JSONObject geometry = result.getJSONObject("geometry");
				if(!geometry.isNull("location")) {
					JSONObject location = geometry.getJSONObject("location");
					builder.setLat(location.getDouble("lat"));
					builder.setLon(location.getDouble("lng"));
				}
			}
			builder.setTypes(getTypes(result));
			placeList.add(builder.build());
		}
		
		return placeList;
	}
	
	
	
	private Set<String> getTypes(JSONObject result) throws JSONException{
		
		Set<String> categories = new HashSet<>();
		if(!result.isNull("types")) {
			//System.out.println("types return");
			JSONArray types = result.getJSONArray("types");
			for(int i =0; i< types.length(); i++) {
				String type = types.get(i).toString();
				categories.add(type);
			}
			//System.out.println("types return value " + types.length());
		}
		return categories;
	}
	
	private void queryAPI(double lat, double lon) {
		List<Place> places = search(lat, lon, null);
		
		try {
			for(Place p : places) {
				System.out.println(p.toJSONObject());
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		PlacesAPI pAPI = new PlacesAPI();
		pAPI.queryAPI(-33.8670522, 151.1957362);

		
	}

}
