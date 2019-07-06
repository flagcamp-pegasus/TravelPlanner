package db.mongodb;

import java.util.List;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.eq;

import db.DBConnection;
import entity.Place;

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
	public void saveRoutes(List<Place> places, String userId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void unsaveRoutes(String userId, String routeId) {
		// TODO Auto-generated method stub
		// find user delete routes id in its routes list
		// find route collection delete routesid == routesId
		db.getCollection("routes").deleteOne(eq("route_id", routeId));
		
		
	}

	@Override
	public void getRoutes(String userId) {
		// TODO Auto-generated method stub
		
	}

}
