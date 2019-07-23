package entity;

import java.util.List;


import org.json.JSONException;
import org.json.JSONObject;

public class Routes {
	private String routeId;
	private int ithDay;
	private int startDate;
	private List<Place> places;
	private List<String> places_id;
//	{
//		routeId: xxxx;
//		ithDay: xxxx;
//		startDate:xxxx;
//		places_id: [1111,2222,3333];
//	}
//	thins in mongoDB
	
	public Routes(RoutesBuilder r) {
		this.routeId = r.routeId;
		this.ithDay = r.ithDay;
		this.startDate = r.startDate;
		this.places = r.places;
		this.places_id = r.places_id;
	}
	
	public String getRouteId() {
		return routeId;
	}
	public int getIthDay() {
		return ithDay;
	}
	public int getStartDate() {
		return startDate;
	}
	public List<Place> getPlaces() {
		return places;
	}
	public List<String> getPlacesID(){
		return places_id;
	}
	
	public JSONObject toJSONObject() {		
		JSONObject routes = new JSONObject();
		for (Place p : places) {
			JSONObject place = new JSONObject();
			try {
				place.put("lat", p.getLat()).put("lng", p.getLon()).put("place_id", p.getPlace_id());
				routes.put("place", place);
			} catch (JSONException e) {
				e.printStackTrace();
			}	
		}
		
		JSONObject obj = new JSONObject();
		try {
			obj.put("routes", routes);
			obj.put("routeId", routeId);
			obj.put("ithDay", ithDay);
			obj.put("startDate", startDate);
		} catch (JSONException e) {
			e.printStackTrace();
		}		
		return obj;
	}

	public static class RoutesBuilder {
		private String routeId;
		private int ithDay;
		private int startDate;
		private List<Place> places;
		private List<String> places_id;
		
		public void setRouteId(String routeId) {
			this.routeId = routeId;
		}
		public void setIthDay(int ithDay) {
			this.ithDay = ithDay;
		}
		public void setStartDate(int startDate) {
			this.startDate = startDate;
		}
		public void setPlaces(List<Place> places) {
			this.places = places;
		}
		public void setPlacesID(List<String> places_id) {
			this.places_id = places_id;
		}
		
		public Routes builde() {
			return new Routes(this); 
		}
	}

}