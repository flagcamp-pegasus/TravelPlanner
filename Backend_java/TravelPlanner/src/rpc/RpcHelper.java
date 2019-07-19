package rpc;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import entity.Place;
import entity.Place.PlaceBuilder;

public class RpcHelper {
	public static void writeJsonArray(HttpServletResponse response, JSONArray array) throws IOException {
		response.setContentType("application/json");
		response.setHeader("Access-Control-Allow-Origin", "*");
		PrintWriter writer = response.getWriter();
		writer.print(array);
		writer.close();
		
	}
	
	public static void writeJsonObject(HttpServletResponse response, JSONObject obj) throws IOException {
		response.setContentType("application/json");
		response.setHeader("Access-Control-Allow-Origin", "*");
		PrintWriter writer = response.getWriter();
		writer.print(obj);
		writer.close();
	}
	
	public static JSONObject readJSONObject(HttpServletRequest request) {
		StringBuilder sBuilder = new StringBuilder();
		try(BufferedReader reader = request.getReader()) {
			String line = null;
			while((line = reader.readLine())!= null) {
				sBuilder.append(line);
			}
			return new JSONObject(sBuilder.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new JSONObject();
	}
	
	public static List<Place> parseArray(JSONArray input) throws JSONException{
		List<Place> places = new ArrayList<>();
		for(int i =0; i<input.length(); i++) {
			JSONObject place = input.getJSONObject(i); 
			PlaceBuilder builder = new PlaceBuilder();
			
			if(!place.isNull("name")) {
				builder.setName(place.getString("name"));
			}
			if(!place.isNull("place_id")) {
				builder.setPlace_id(place.getString("place_id"));
			}
			if(!place.isNull("geometry")) {
				JSONObject geometry = place.getJSONObject("geometry");
				if(!geometry.isNull("location")) {
					JSONObject location = geometry.getJSONObject("location");
					if(!location.isNull("lat")) {
						builder.setLat(location.getDouble("lat"));
					}
					if(!location.isNull("lng")) {
						builder.setLon(location.getDouble("lng"));
					}
				}
			}
			places.add(builder.build());
		}
		return places;
		
		
	}

}
