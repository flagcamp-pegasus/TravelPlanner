package external;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import entity.Place;
import entity.Place.PlaceBuilder;



public class GoogleMapRecommendRoutesAPI {
	private static final String URL = "https://maps.googleapis.com/maps/api/distancematrix/json";
	private static final String DEFAULT_KEYWORD = "imperial"; // no restriction
	private static final String API_KEY = "YOUR API KEY";
	public  List<Place> search(List<Place> places, String units) {//according to the client's location and keywords to do the search 
		if (units == null) {
			units = DEFAULT_KEYWORD;
		}
		try {
			units = URLEncoder.encode(units, "UTF-8");//http中空格是分割header和response，所以加密一下，将用户传进来的空格变成别的
			
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		int number = places.size();
		StringBuilder orig = new StringBuilder();
		HashMap<Integer, Boolean> visited = new HashMap<>();
		
		for (int i = 0; i < number; i++) {
			Place place = places.get(i);
			visited.put(i, false);
			orig.append(Double.toString(place.getLat()));
			orig.append(',');
			orig.append(Double.toString(place.getLon()));
			orig.append('|');
		}
		orig.deleteCharAt(orig.length() - 1);
		orig.toString();
		StringBuilder dest = new StringBuilder();
		for (int i = 1; i < number; i++) {
			Place place = places.get(i);
			String Lat = Double.toString(place.getLat());
			String Lon = Double.toString(place.getLon());
			dest.append(Lat);
			dest.append(',');
			dest.append(Lon);
			dest.append('|');
		}
		dest.deleteCharAt(dest.length() - 1);
		dest.toString();
		String query = String.format("units=%s&origins=%s&destinations=%s&key=%s", units, orig, dest, API_KEY);//%s substitute the following parameters
		String url = URL + "?" + query;//the final URl
		System.out.println("url = " + url);
		
		try {
			HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();//URl is one parameter 远程调用发请求用的
			connection.setRequestMethod("GET");//tell the request method
			
			int responseCode = connection.getResponseCode();//basement: call ticketMaster API
			System.out.println("Sending request to url: " + url);
			System.out.println("Response code: " + responseCode);
			
			if (responseCode != 200) {// basement get method not success
				return new ArrayList<>();
			}
			BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));//BufferReader is more efficiency, read more than 8192+ once, not one by one
			String line;//一次性将 stream全部取回，存在本地某个地方，reader 一行一行读
			StringBuilder response = new StringBuilder();//一次性读8K character回来
			
			while ((line = reader.readLine()) != null) {
				response.append(line);//每次都从 reader里面读，不为空就加到 response里面
			}
			reader.close();// reader是IO要关掉
			JSONObject obj = new JSONObject(response.toString());//guarantee that the server will return an JSON file，change to string, not all string could in jsonobject
			if (!obj.isNull("rows")) {//确保返回的rows key, this key is json, event不是个空，json is key-value pair
				JSONArray rows = obj.getJSONArray("rows");
				System.out.println(rows);
				List<Integer> order = getItemList(rows, visited, number);
				List<Place> result = getPlaceOrder(order, places);
				return result;
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new ArrayList<>();
	}
	// Convert JSONArray to a list of item objects.
	private List<Integer> getItemList(JSONArray rows, HashMap<Integer, Boolean> visited, int number) throws JSONException {
		List<Integer> result = new ArrayList<>();
		Queue<Integer> que = new LinkedList<>();
		que.offer(0);
		visited.put(0, true);
		result.add(0);
		while (result.size() < number) {
			int start = que.poll();
			JSONObject row = rows.getJSONObject(start);
			JSONArray elements = row.getJSONArray("elements");
			Integer minDistance = Integer.MAX_VALUE;
			int index = start;
			for (int i = 0; i < elements.length(); i++) {
				JSONObject Dest = elements.getJSONObject(i);
				JSONObject Distance = Dest.getJSONObject("distance");
				Integer value = Distance.getInt("value");
				if (value < minDistance && value != 0 && visited.get(i + 1) != true) {
					minDistance = value;
					index = i;
				}
			}
			que.offer(index + 1);
			visited.put(index + 1, true);
			result.add(index + 1);
		}
		System.out.println("result of getItemList: " + result);
		return result;
	}
	/**
	 * Helper methods, cannot get information from the first layer, need iteration to get inner information
	 */
	private List<Place> getPlaceOrder(List<Integer> order, List<Place> places) throws JSONException {
		List<Place> result = new ArrayList<Place>();
		for (int i = 0; i < order.size(); i++) {
			result.add(places.get(order.get(i)));
		}
		return result;	
	}
	private void queryAPI() {
		PlaceBuilder one = new PlaceBuilder();
		one.setLat(34.022352);
		one.setLon(-118.285117);
		one.setPlace_id("ChIJ7aVxnOTHwoARxKIntFtakKo");
		one.setName("USC");
		PlaceBuilder two = new PlaceBuilder();
		two.setLat(34.068921);
		two.setLon(-118.445181);
		two.setPlace_id("ChIJZQ9c8IW8woARN0gTXFiTqSU");
		two.setName("UCLA");
		PlaceBuilder three = new PlaceBuilder();
		three.setLat(34.138117);
		three.setLon(-118.353378);
		three.setPlace_id("ChIJSW2jake-woARFCDsa_R2VxM");
		three.setName("Universial Studio");
		PlaceBuilder four = new PlaceBuilder();
		four.setLat(34.033822);
		four.setLon(-118.229329);
		four.setPlace_id("ChIJSRvZ1yHGwoARcLrfvc-APl4");
		four.setName("Bestia");
		List<Place> places = new ArrayList<>();
		places.add(one.build());
		places.add(two.build());
		places.add(three.build());
		places.add(four.build());
		List<Place> locations = search(places, null);
		for (Place place : locations) {
			System.out.println(place.toJSONObject());
		}
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		GoogleMapRecommendRoutesAPI api = new GoogleMapRecommendRoutesAPI();
		api.queryAPI();
	}
}