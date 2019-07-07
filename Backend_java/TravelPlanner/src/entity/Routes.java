package entity;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Routes {
	private String routeId;
	private int ithDay;
	private int startDate;
	private List<Place> places;
	
	public Routes(RoutesBuilder r) {
		this.routeId = r.routeId;
		this.ithDay = r.ithDay;
		this.startDate = r.startDate;
		this.places = r.places;
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
	
	public JSONObject toJSONObject() {		
		JSONObject routes = new JSONObject();
		for (Place p : places) {
			JSONObject place = new JSONObject();
			try {
				place.put("lat", p.getLat()).put("lon", p.getLon()).put("place_id", p.getPlace_id());
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
		
		public Routes builde() {
			return new Routes(this); 
		}
	}

}
