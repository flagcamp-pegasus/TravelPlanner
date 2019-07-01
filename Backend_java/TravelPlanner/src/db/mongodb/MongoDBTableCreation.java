package db.mongodb;

import java.text.ParseException;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.IndexOptions;

public class MongoDBTableCreation {
	 public static void main(String[] args) throws ParseException {
		 MongoClient mongoClient = new MongoClient();
		 MongoDatabase db = mongoClient.getDatabase(MongoDBUtil.DB_NAME);
		 
		 db.getCollection("users").drop();
		 
		 IndexOptions options = new IndexOptions().unique(true);
		 db.getCollection("users").createIndex(new Document("user_id", 1), options);
		 
		 db.getCollection("users").insertOne(new Document().append("user_id", 1111)
				 .append("password", "3229c1097c00d497a0fd282d586be050").append("first_name", "John")
				 .append("last_name", "Smith"));
	 
		 mongoClient.close();
		 System.out.println("Import is done successfully");
	 }

}
