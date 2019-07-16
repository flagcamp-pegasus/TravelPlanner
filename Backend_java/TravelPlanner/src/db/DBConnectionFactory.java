package db;

public class DBConnectionFactory {
	private static final String DEFAULT_DB = "mongodb";
	
	public static DBConnection getConnection(String db) {
		switch(db) {
		case "mongodb":
			return null;
		case "mysql":
			return null;
		default:
				throw new IllegalArgumentException("Invalid db:" +db);
			
		}
	}
	
	public static DBConnection getConnection() {
		return getConnection(DEFAULT_DB);
	}


}
