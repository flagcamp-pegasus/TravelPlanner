package db.mongodb;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.eq;

import db.DBConnection;
import entity.Place;
import entity.Place.PlaceBuilder;
import entity.Routes;

public class MongoDBConnection implements DBConnection {
	private MongoClient mongoClient;
	private MongoDatabase db;
	
	public MongoDBConnection() {
		mongoClient = new MongoClient();
		db = mongoClient.getDatabase(MongoDBUtil.DB_NAME);
	}

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
		if(iterable.first()!= null) {
			Document doc = iterable.first();
			return doc.getString("password").contentEquals("password");
		}
		return false;
	}
	
	@Override
	public List<String> savePlaces(List<Place> places) {
		// TODO Auto-generated method stub
		List<String> places_id = new ArrayList<String>();
		for(Place p : places) {
			db.getCollection("places").insertOne(new Document().append("lat", p.getLat())
					.append("lon", p.getLon()).append("place_id", p.getPlace_id())
					.append("name", p.getName()));
			places_id.add(p.getPlace_id());
		}
		return places_id;
	}

	@Override
	public void saveRoutes(List<Place> places, String userId, int ith) {
		// TODO Auto-generated method stub
		List<String> places_id = savePlaces(places);
		ObjectId id = new ObjectId();
		db.getCollection("routes").insertOne(new Document().append("routeId", id)
				.append("ithDay", ith).append("routes", places_id)
				);
		db.getCollection("users").updateOne(new Document("user_id", userId),
				new Document("$addToSet", new Document("routes_array", id))
				);
	}
	
	

	@Override
	public void unsaveRoutes(String userId, ObjectId routeId) {
		// TODO Auto-generated method stub
		// find user delete routes id in its routes list
		// find route collection delete routesid == routesId
		db.getCollection("routes").deleteOne(eq("route_id", routeId));
		db.getCollection("users").updateOne(new Document("user_id",  userId), new Document("$pull", new Document("routes_array", routeId)) );
		
		
	}

	@Override
	public List<Place> getRoutes(String userId) {
		List<Place> routes = new ArrayList<>();
		FindIterable<Document> iterable = db.getCollection("routes").find(eq("routes_id", userId));
//		FindIterable<Document> test = db.getCollection("routes").find();
//		System.out.println(test);
		System.out.println("getRoutes: "+iterable);
		
		for (Document doc: iterable) {
			int ith = doc.getInteger("ithDay");
			List<String> list = (List<String>) doc.get("routes_array");
			for (String s : list) {
				Place p = getPlaces(s);				
				routes.set(ith, p);
			}	
		}
		
//		if (iterable.first() != null && iterable.first().containsKey("routes_array")) {
//			@SuppressWarnings("unchecked")
//			List<String> list = (List<String>) iterable.first().get("routes_array");
//			Integer ith = (Integer)iterable.first().get("ithDay");
//			System.out.println("routes_arr: "+list.toString()+ "ith day: "+ ith);
//			for (String s : list) {
//				Place p = getPlaces(s);
//				
//				routes.set(ith, p);
//			}			
//		}
		return routes;
	}
	
//	@Override
	private Place getPlaces(String place_id) {
		// convert place_id to Place object
		Place place = new Place(null);
		FindIterable<Document> iterable = db.getCollection("places").find(eq("place_id", place_id));
		System.out.println(iterable);
		
		if (iterable.first() != null) {
			Document doc = iterable.first();
			System.out.println(doc);
			
			PlaceBuilder builder = new PlaceBuilder();
			builder.setLat(doc.getDouble("lat"));
			builder.setLon(doc.getDouble("lon"));
			builder.setPlace_id(doc.getString("place_id"));
			builder.setName(doc.getString("name"));
			
			place = builder.build();			
			
			System.out.println("test place create: "+place.getName());
		}
		
		return place; 
	}

	@Override
	public boolean registerUser(String userId, String password, String firstname, String lastname) {
		// TODO Auto-generated method stub
		return false;
	}



}
