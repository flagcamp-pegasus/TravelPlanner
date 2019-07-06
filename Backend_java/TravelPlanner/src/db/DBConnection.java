package db;

import java.util.List;

import entity.Place;

public interface DBConnection {
	public void close();
	
	public String getFullName(String userId);
	
	public boolean verifyLogin(String userId, String password);
	
	public void saveRoutes(List<Place> places, String userId);
	
	// unsave route is for the show routes page
	public void unsaveRoutes(String userId, String routesId);
	
	public void getRoutes(String userId);

}
