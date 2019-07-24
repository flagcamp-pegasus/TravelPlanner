package db.mongodb;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.UpdateOptions;
import com.mongodb.client.result.UpdateResult;

import static com.mongodb.client.model.Filters.eq;

import db.DBConnection;
import entity.Place;
import entity.Place.PlaceBuilder;

public class MongoDBConnection implements DBConnection {
	private MongoClient mongoClient;
	private MongoDatabase db;
	
	public MongoDBConnection() {
		mongoClient = new MongoClient();
		db = mongoClient.getDatabase(MongoDBUtil.DB_NAME);
	}
	
//	public void testConnection() {
//		  long num = db.getCollection("users").count();
//		  System.out.println(num);
//	}

	@Override
	public void close() {
		// TODO Auto-generated method stub
		if(mongoClient != null) {
			mongoClient.close();
		}
		
	}

	@Override
	public String getFullName(String userId) {
		// TODO Auto-generated method stub
		FindIterable<Document> iterable = db.getCollection("users").find(eq("user_id", userId));
		if(iterable.first() != null) {
			Document doc = iterable.first();
			return doc.getString("first_name") +"" + doc.getString("last_name");
		}
		return "";
	}

	@Override
	public boolean verifyLogin(String userId, String password) {
		// TODO Auto-generated method stub
		FindIterable<Document> iterable = db.getCollection("users").find(eq("user_id", userId));
		System.out.println("find result"+iterable.first());
		if(iterable.first()!= null) {
			Document doc = iterable.first();
			return doc.getString("password").contentEquals(password);
		}
		return false;
	}
	
	@Override
	public List<String> savePlaces(List<Place> places) {
		// TODO Auto-generated method stub
		List<String> places_id = new ArrayList<String>();
		for(Place p : places) {
			FindIterable<Document> iterable = db.getCollection("places").find(eq("place_id", p.getPlace_id()));
			if(iterable.first() == null) {
				db.getCollection("places").insertOne(new Document().append("lat", p.getLat())
						.append("lon", p.getLon()).append("place_id", p.getPlace_id())
						.append("name", p.getName()));
			}

			places_id.add(p.getPlace_id());
		}
		return places_id;
	}

	public Place getPlaces(String place_id) {
		// convert place_id to Place object
		PlaceBuilder b = new PlaceBuilder();
		Place place = b.build();
		FindIterable<Document> iterable = db.getCollection("places").find(eq("place_id", place_id));
		
		if (iterable.first() != null) {
			Document doc = iterable.first();
			// System.out.println(doc);
			
			PlaceBuilder builder = new PlaceBuilder();
			builder.setLat(doc.getDouble("lat"));
			builder.setLon(doc.getDouble("lon"));
			builder.setPlace_id(doc.getString("place_id"));
			builder.setName(doc.getString("name"));
			
			place = builder.build();			
			
			// System.out.println("test place create: "+place.getName());
		}
		
		return place; 
	}
	
	@Override
	public boolean saveRoutes(List<Place> places, String userId, int ith) {
		// TODO Auto-generated method stub
		List<String> places_id = savePlaces(places);
		Document info = new Document().append("routeId", userId)
				.append("ithDay", ith).append("routes_array", places_id);
		UpdateOptions upsert = new UpdateOptions().upsert(true);
		
		BasicDBObject andQuery = new BasicDBObject();
		List<BasicDBObject> obj = new ArrayList<>();
		obj.add(new BasicDBObject("routeId", userId));
		obj.add(new BasicDBObject("ithDay", ith));
		andQuery.append("$and", obj);
		
		
		UpdateResult res = db.getCollection("routes").replaceOne(andQuery, info,upsert);
		return res.wasAcknowledged();
	}
	
	

	@Override
	public boolean unsaveRoutes(String userId, int ith) {
		// TODO Auto-generated method stub
//		delete one that routes_id == userId, and ithDay == ithDay
		Bson filter = new Document().append("routeId", userId).append("ithDay", ith);
		db.getCollection("routes").deleteOne(filter);
		// move ithDay > ithDay forward 1
		Bson ff = new Document().append("routeId", userId).append("ithDay", new Document().append("$gt", ith));
		Bson update = new Document().append("$inc", new Document().append("ithDay", -1));
		UpdateResult result = db.getCollection("routes").updateMany(ff, update);
		return result.wasAcknowledged();

	}

	@Override
	public List<List<Place>> getRoutes(String userId) {
		List<List<Place>> routes = new ArrayList<>();
		 FindIterable<Document> iterable = db.getCollection("routes").find(eq("routeId", userId));
		 Map<Integer, List<String>> map = new HashMap<>();
				 
			for (Document doc: iterable) {
				int ith = doc.getInteger("ithDay");
				@SuppressWarnings("unchecked")
				List<String> li = (List<String>) doc.get("routes_array");
//				System.out.println(li.toString());
				map.put(ith, li);
			}	
			
			for (int i = 1; i <= map.size(); i++) {
				List<String> place_ids = map.get(i);
				List<Place> r = new ArrayList<>();
//				System.out.println(i + "/" + place_ids);
				for (String s : place_ids) {
					Place p = getPlaces(s);
					r.add(p);
				}
				routes.add(r);
			}
		
		return routes;
	}
	
	@Override
	public boolean registerUser(String userId, String password, String firstname, String lastname) {
		// TODO Auto-generated method stub
		FindIterable<Document> iterable =null;
		try {
			db.getCollection("users").insertOne(new Document().append("user_id", userId)
					.append("first_name", firstname).append("last_name", lastname).append("password", password)
					);
			iterable = db.getCollection("users").find(eq("user_id", userId));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;

		}
		return iterable!=null;
	}



}
