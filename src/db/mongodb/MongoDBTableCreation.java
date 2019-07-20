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
		 db.getCollection("routes").drop();
		 
//		 IndexOptions options = new IndexOptions().unique(true);
//		 db.getCollection("users").createIndex(new Document("user_id", 1), options);

		 List<Integer> list = new ArrayList<>();
		 list.add(1);
		 list.add(2);
		 list.add(3);
		 
//		 ObjectId o = new ObjectId();
//		 db.getCollection("users").insertOne(new Document().append("user_id", 1111)
//				 .append("password", "3229c1097c00d497a0fd282d586be050").append("first_name", "John")
//				 .append("last_name", "Smith").append("index_id", o).append("num", list)
//				 //.append("$push", new Document("num",new Document("$each", list)))
//				 );
////		 db.getCollection("users").updateOne(new Document("user_id", 1111),
////				 new Document("$push", new Document("num", new Document("$each", list))));
//		 
//		 db.getCollection("users").insertOne(new Document().append("user_id", 2222)
//				 .append("password", "3229c1097c00d497a0fd282d586be050").append("first_name", "taylor")
//				 .append("last_name", "Swift").append("index_id", new ObjectId()));
////		 
//		 
//		 
////		 db.getCollection("users").insertOne(new Document().append("user_id", 3333)
////				 .append("password", "3229c1097c00d497a0fd282d586be050").append("first_name", "taylor")
////				 .append("last_name", "Swift"));
////		 
//		 db.getCollection("users").deleteOne(eq("user_id", 1111));
//
////		 db.getCollection("users").updateOne(new Document("user_id", 1111), new Document(
////				 "$push", new Document("num", new Document("$each", list))
////				 ) );
//		 
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
//		 
		 IndexOptions options = new IndexOptions().unique(true);
		 db.getCollection("routes").createIndex(new Document("index_id", 2));	
		 
		 List<Integer> list1 = new ArrayList<>();
		 list1.add(1);
		 list1.add(2);
		 list1.add(3);
		 
		 List<Integer> list2 = new ArrayList<>();
		 list2.add(4);
		 list2.add(5);
		 list2.add(6);
		 
		 List<Integer> list3 = new ArrayList<>();
		 list3.add(7);
		 list3.add(8);
		 list3.add(9);
		 
		 db.getCollection("routes").insertOne(new Document().append("index_id", new ObjectId()).append("routes_id", 2222)
				 .append("ithDay", 1).append("routes_array", list1));
		 db.getCollection("routes").insertOne(new Document().append("routes_id", 2222)
				 .append("ithDay", 2).append("routes_array", list2).append("index_id", new ObjectId()));	 
		 db.getCollection("routes").insertOne(new Document().append("routes_id", 2222)
				 .append("ithDay", 3).append("routes_array", list3).append("index_id", new ObjectId()));
		 
//		 FindIterable<Document> iterable = db.getCollection("routes").find(eq("routes_id", 2222));		 
//		 
//		 if(iterable.first()!= null) {
//			 Document d = iterable.first();
//			 System.out.println(d);
//		 }		
//		 
//		 FindIterable<Document> findall = db.getCollection("routes").find(eq("routes_id", 2222));		 
//		 
//		 if(iterable.first()!= null) {
//			 Document d = iterable.first();
//			 System.out.println(d);
//		 }	

		 db.getCollection("places").createIndex(new Document("index_id", 3));	
		 
		 db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId()).append("place_id", 1)
				 .append("lat", 11111).append("lon", 11).append("name", "New York1"));
		 db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId()).append("place_id", 2)
				 .append("lat", 22222).append("lon", 22).append("name", "New York2")); 
		 db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId()).append("place_id", 3)
				 .append("lat", 33333).append("lon", 33).append("name", "New York3"));
		 db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId()).append("place_id", 4)
				 .append("lat", 44444).append("lon", 44).append("name", "New York4"));
		 db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId()).append("place_id", 5)
				 .append("lat", 55555).append("lon", 55).append("name", "New York5"));
		 db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId()).append("place_id", 6)
				 .append("lat", 66666).append("lon", 66).append("name", "New York6"));
		 db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId()).append("place_id", 7)
				 .append("lat", 77777).append("lon", 77).append("name", "New York7"));
		 db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId()).append("place_id", 8)
				 .append("lat", 888888).append("lon", 88).append("name", "New York8"));
		 db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId()).append("place_id", 9)
				 .append("lat", 999999).append("lon", 99).append("name", "New York9"));
		 
		 
		 mongoClient.close();
		 System.out.println("Import is done successfully");
	 }

}
