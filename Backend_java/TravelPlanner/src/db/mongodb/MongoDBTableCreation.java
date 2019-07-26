package db.mongodb;

import java.text.ParseException;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoIterable;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

import static com.mongodb.client.model.Filters.eq;



public class MongoDBTableCreation {
	// Run this as Java application to reset db schema.
	public static void main(String[] args) throws ParseException {
		try {

			// Step 1 Connect to MongoDB.
			System.out.println("Connecting to MongoDBUtil..");
			MongoClient mongoClient = new MongoClient();
			MongoDatabase db = mongoClient.getDatabase(MongoDBUtil.DB_NAME);

			if (db == null) {
				mongoClient.close();
				return;
			}

			// Step 2 Drop tables in case they exist.
			db.getCollection("places").drop();
			db.getCollection("routes").drop();
			db.getCollection("users").drop();

			// Step 3 Create new tables.

			// ObjectId o = new ObjectId();
			 db.getCollection("users").insertOne(new Document()
					 .append("user_id", "2222")
					 .append("password", "2222")
					 .append("first_name", "John")
					 .append("last_name", "Smith"));

			 
			// db.getCollection("users").updateOne(new Document("user_id", 1111),
			// new Document("$push", new Document("num", new Document("$each", list))));
			//
			// db.getCollection("users").insertOne(new Document().append("user_id", 2222)
			// .append("password", "3229c1097c00d497a0fd282d586be050").append("first_name",
			// "taylor")
			// .append("last_name", "Swift").append("index_id", new ObjectId()));

			 db.getCollection("users").insertOne(new Document()
					 .append("user_id", 3333)
					 .append("password", "3229c1097c00d497a0fd282d586be050")
					 .append("first_name", "taylor")
					 .append("last_name", "Swift"));


			IndexOptions options = new IndexOptions().unique(true);
			db.getCollection("routes").createIndex(new Document("index_id", 2));

			List<String> list1 = new ArrayList<>();
			list1.add("ChIJP3Sa8ziYEmsRUKgyFmh9AQM");
			list1.add("ChIJq6qq6jauEmsR46KYci7M5Jc");
			list1.add("ChIJtwapWjeuEmsRcxV5JARHpSk");

			List<String> list2 = new ArrayList<>();
			list2.add("ChIJ1-v38TauEmsRHbUt24abGq8");
			list2.add("ChIJbVjtNjeuEmsRq-6prwTK24Y");
			list2.add("ChIJm7Ex8UmuEmsR37p4Hm0D0VI");

			List<String> list3 = new ArrayList<>();
			list3.add("ChIJN1t_tDeuEmsRUsoyG83frY4");
			list3.add("ChIJw1jiuEmuEmsRic0640-IS-k");
			list3.add("ChIJr9ZMJD6uEmsRT5yQWJvTmd0");

			db.getCollection("routes").insertOne(new Document().append("routeId", "2222").append("ithDay", 1)
					.append("routes_array", list1).append("index_id", new ObjectId()));
			db.getCollection("routes").insertOne(new Document().append("routeId", "2222").append("ithDay", 2)
					.append("routes_array", list2).append("index_id", new ObjectId()));
			db.getCollection("routes").insertOne(new Document().append("routeId", "2222").append("ithDay", 3)
					.append("routes_array", list3).append("index_id", new ObjectId()));
			db.getCollection("routes").insertOne(new Document().append("routeId", "2222").append("ithDay", 4)
					.append("routes_array", list3).append("index_id", new ObjectId()));

			db.getCollection("routes").insertOne(new Document().append("routeId", "2222").append("ithDay", 5)
					.append("routes_array", list3).append("index_id", new ObjectId()));
			db.getCollection("routes").insertOne(new Document().append("routeId", "2222").append("ithDay", 6)
					.append("routes_array", list1).append("index_id", new ObjectId()));
			db.getCollection("routes").insertOne(new Document().append("routeId", "2222").append("ithDay", 7)
					.append("routes_array", list2).append("index_id", new ObjectId()));
			db.getCollection("routes").insertOne(new Document().append("routeId", "2222").append("ithDay", 8)
					.append("routes_array", list3).append("index_id", new ObjectId()));
			db.getCollection("routes").insertOne(new Document().append("routeId", "2222").append("ithDay", 9)
					.append("routes_array", list3).append("index_id", new ObjectId()));
			db.getCollection("routes").insertOne(new Document().append("routeId", "2222").append("ithDay", 10)
					.append("routes_array", list3).append("index_id", new ObjectId()));



			db.getCollection("places").createIndex(new Document("index_id", 3));

			db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId())
					.append("place_id", "ChIJP3Sa8ziYEmsRUKgyFmh9AQM").append("lat", -33.8688197).append("lon", 151.2092955).append("name", "Sydney"));
			db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId())
					.append("place_id", "ChIJq6qq6jauEmsR46KYci7M5Jc").append("lat", -33.8684714).append("lon", 151.1953331).append("name", "The Star Grand Residences (formerly Astral Residences)"));
			db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId())
					.append("place_id", "ChIJtwapWjeuEmsRcxV5JARHpSk").append("lat", -33.87036190000001).append("lon", 151.1978505).append("name", "The Little Snail Restaurant"));
			db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId())
					.append("place_id", "ChIJ1-v38TauEmsRHbUt24abGq8").append("lat", -33.8679022).append("lon", 151.1951276).append("name", "Lobby Lounge"));
			db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId())
					.append("place_id", "ChIJbVjtNjeuEmsRq-6prwTK24Y").append("lat", -33.87039480000001).append("lon", 151.196835).append("name", "Sydney Darling Harbour Hotel"));
			db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId())
					.append("place_id", "ChIJm7Ex8UmuEmsR37p4Hm0D0VI").append("lat", -33.8682215).append("lon", 151.1953756).append("name", "Flying Fish"));
			db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId())
					.append("place_id", "ChIJN1t_tDeuEmsRUsoyG83frY4").append("lat", -33.8666199).append("lon", 151.1958527).append("name", "Google Australia"));
			db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId())
					.append("place_id", "ChIJw1jiuEmuEmsRic0640-IS-k").append("lat", -33.8636875).append("lon", 151.1947696).append("name", "Jones Bay Wharf"));
			db.getCollection("places").insertOne(new Document().append("index_id", new ObjectId())
					.append("place_id", "ChIJr9ZMJD6uEmsRT5yQWJvTmd0").append("lat", -33.86479).append("lon", 151.194134).append("name", "Doltone House - Jones Bay Wharf"));

			// monitor delete(user_id, ithDay)
//			FindIterable<Document> iterable = db.getCollection("routes").find(eq("routes_id", "2222"));
//			DBCursor cursor = db.getCollection("routes").find(eq("routes_id", "2222"));
			Bson filter = new Document("routes_id", "2222").append("ithDay", 2);
			DeleteResult res= db.getCollection("routes").deleteOne(filter);
			System.out.println(res.toString()+ res.getDeletedCount()+" ");
			// find results satisfy filter
			Bson ff = new Document("routes_id", "2222").append("ithDay", new Document().append("$gt", 2));
			MongoIterable<Document> updates = db.getCollection("routes").find(ff);
			MongoCursor cursor = updates.iterator();
			while(cursor.hasNext()) {
				System.out.println(cursor.next().toString());
			}
			
			//update results
			Bson change = new Document().append("$inc", new Document().append("ithDay", -1));

			UpdateResult it = db.getCollection("routes").updateMany(ff, change);
			System.out.println(it.toString());

			
			
			
			mongoClient.close();
			System.out.println("Import is done successfully");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}