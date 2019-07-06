package db.mongodb;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.IndexOptions;
import static com.mongodb.client.model.Filters.eq;

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
		 
		 db.getCollection("users").insertOne(new Document().append("user_id", 2222)
				 .append("password", "3229c1097c00d497a0fd282d586be050").append("first_name", "taylor")
				 .append("last_name", "Swift"));
		 
		 //db.getCollection("users").deleteOne(eq("user_id", 1111));
		 List<Integer> list = new ArrayList<>();
		 list.add(1);
		 list.add(2);
		 list.add(3);
//		 db.getCollection("users").updateOne(new Document("user_id", 1111), new Document(
//				 "$push", new Document("num", list)
//				 ) );
		 
		 db.getCollection("users").updateOne(new Document("user_id", 1111), new Document(
				 "$addToSet", new Document("num", 5)
				 ) );
		 db.getCollection("users").updateOne(new Document("user_id", 1111), new Document(
				 "$addToSet", new Document("num", 4)
				 ) );
		 
//		 db.getCollection("users").updateOne(new Document("user_id", 1111), new Document(
//				 "$pull", new Document("num", 4)
//				 ) );
	 
		 mongoClient.close();
		 System.out.println("Import is done successfully");
	 }

}
