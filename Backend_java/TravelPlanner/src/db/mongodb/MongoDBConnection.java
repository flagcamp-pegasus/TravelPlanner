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
	public List<String> getRoutes(String userId) {
		List<String> routes = new ArrayList<>();
		FindIterable<Document> iterable = db.getCollection("users").find(eq("user_id", userId));
		
		if (iterable.first() != null && iterable.first().containsKey("routes_array")) {
			@SuppressWarnings("unchecked")
			List<String> list = (List<String>) iterable.first().get("routes_array");	
			routes = list;
		}

		return routes;
	}

	@Override
	public boolean registerUser(String userId, String password, String firstname, String lastname) {
		// TODO Auto-generated method stub
		return false;
	}



}
