package db.mongodb;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.IndexOptions;
import static com.mongodb.client.model.Filters.eq;

public class MongoDBTableCreation {
	 public static void main(String[] args) throws ParseException {
		 MongoClient mongoClient = new MongoClient();
		 MongoDatabase db = mongoClient.getDatabase(MongoDBUtil.DB_NAME);
		 
		 db.getCollection("users").drop();
		 db.getCollection("items").drop();
		 
		 IndexOptions options = new IndexOptions().unique(true);
		 db.getCollection("users").createIndex(new Document("user_id", 1), options);

		 List<Integer> list = new ArrayList<>();
		 list.add(1);
		 list.add(2);
		 list.add(3);
		 
		 ObjectId o = new ObjectId();
		 db.getCollection("users").insertOne(new Document().append("user_id", "1111")
				 .append("password", "3229c1097c00d497a0fd282d586be050").append("first_name", "John")
				 .append("last_name", "Smith").append("index_id", o).append("num", list)
				 //.append("$push", new Document("num",new Document("$each", list)))
				 );
//		 db.getCollection("users").updateOne(new Document("user_id", 1111),
//				 new Document("$push", new Document("num", new Document("$each", list))));
		 
		 db.getCollection("users").insertOne(new Document().append("user_id", "2222")
				 .append("password", "3229c1097c00d497a0fd282d586be050").append("first_name", "taylor")
				 .append("last_name", "Swift").append("index_id", new ObjectId()));

		 FindIterable<Document> iterable = db.getCollection("users").find(eq("user_id", 1111));
//		 List<String> result = (List<String>) iterable.first().get("num");
//		 System.out.println(result.toString());
		 
		 
		 
//		 db.getCollection("users").insertOne(new Document().append("user_id", 3333)
//				 .append("password", "3229c1097c00d497a0fd282d586be050").append("first_name", "taylor")
//				 .append("last_name", "Swift"));
//		 
		 //db.getCollection("users").deleteOne(eq("user_id", 1111));

//		 db.getCollection("users").updateOne(new Document("user_id", 1111), new Document(
//				 "$push", new Document("num", new Document("$each", list))
//				 ) );
		 
//		 db.getCollection("users").updateOne(new Document("user_id", 2222), new Document(
//				 "$addToSet", new Document("num", 5)
//				 ) );
//		 db.getCollection("users").updateOne(new Document("user_id", 2222), new Document(
//				 "$addToSet", new Document("num", 5)
//				 ) );
////		 
//		 db.getCollection("users").updateOne(new Document("user_id", 1111), new Document(
//				 "$pull", new Document("num", 2)
//				 ) );
//		 FindIterable<Document> iterable = db.getCollection("users").find(eq("index_id", o));
//		 if(iterable.first()!= null) {
//			 Document d = iterable.first();
//			 System.out.println(d);
//		 }
	 
		 mongoClient.close();
		 System.out.println("Import is done successfully");
	 }

}
