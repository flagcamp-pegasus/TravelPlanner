package entity;


import java.util.Set;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Place {
	
//	 {
//         "geometry" : {
//            "location" : {
//               "lat" : -33.870775,
//               "lng" : 151.199025
//            }
//         },
//         "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/travel_agent-71.png",
//         "id" : "21a0b251c9b8392186142c798263e289fe45b4aa",
//         "name" : "Rhythmboat Cruises",
//         "opening_hours" : {
//            "open_now" : true
//         },
//         "photos" : [
//            {
//               "height" : 270,
//               "html_attributions" : [],
//               "photo_reference" : "CnRnAAAAF-LjFR1ZV93eawe1cU_3QNMCNmaGkowY7CnOf-kcNmPhNnPEG9W979jOuJJ1sGr75rhD5hqKzjD8vbMbSsRnq_Ni3ZIGfY6hKWmsOf3qHKJInkm4h55lzvLAXJVc-Rr4kI9O1tmIblblUpg2oqoq8RIQRMQJhFsTr5s9haxQ07EQHxoUO0ICubVFGYfJiMUPor1GnIWb5i8",
//               "width" : 519
//            }
//         ],
//         "place_id" : "ChIJyWEHuEmuEmsRm9hTkapTCrk",
//         "reference" : "CoQBdQAAAFSiijw5-cAV68xdf2O18pKIZ0seJh03u9h9wk_lEdG-cP1dWvp_QGS4SNCBMk_fB06YRsfMrNkINtPez22p5lRIlj5ty_HmcNwcl6GZXbD2RdXsVfLYlQwnZQcnu7ihkjZp_2gk1-fWXql3GQ8-1BEGwgCxG-eaSnIJIBPuIpihEhAY1WYdxPvOWsPnb2-nGb6QGhTipN0lgaLpQTnkcMeAIEvCsSa0Ww",
//         "types" : [ "travel_agency", "restaurant", "food", "establishment" ],
//         "vicinity" : "Pyrmont Bay Wharf Darling Dr, Sydney"
//      },
	
	private double lat;
	private double lon;
	private String place_id; // can be used for place detail search
	private String name;
	//private Set<String> types; //[ "travel_agency", "restaurant", "food", "establishment" ],
	
	public Place(PlaceBuilder p) {
		this.lat = p.lat;
		this.lon = p.lon;
		this.place_id = p.place_id;
		this.name = p.name;
		//this.types = p.types;
	}
	
	public double getLat() {
		return lat;
	}
	public double getLon() {
		return lon;
	}
	public String getPlace_id() {
		return place_id;
	}
	public String getName() {
		return name;
	}
//	public Set<String> getTypes() {
//		return types;
//	}
	
	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		JSONObject location = new JSONObject();
		try {
			location.put("lng", lon).put("lat", lat);
			obj.put("location", location);
			obj.put("place_id", place_id);
			obj.put("name", name);
			//obj.put("types", new JSONArray(types));
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return obj;
	}
	
	public static class PlaceBuilder{
		private double lat;
		private double lon;
		private String place_id; 
		private String name;
		//private Set<String> types;
		public void setLat(double lat) {
			this.lat = lat;
		}
		public void setLon(double lon) {
			this.lon = lon;
		}
		public void setPlace_id(String place_id) {
			this.place_id = place_id;
		}
		public void setName(String name) {
			this.name = name;
		}
//		public void setTypes(Set<String> types) {
//			this.types = types;
//		} 
		
		public Place build() {
			return new Place(this);
		}
		
		
		
	}
	
}
