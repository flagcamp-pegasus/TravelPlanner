/**
 * 
 * @author
 *
 */

package db;

import java.util.List;
import java.util.Set;

import entity.*;


public interface DBConnection {
	/**
	 * Close the connection.
	 */
	public void close();

	/**
	 * Get 15 cities from DB.
	 */
	public List<City> getCities();
	
	/**
	 * Get the route from DB for a specific user on a specific day
	 */
	public List<Spot> getRoutes(String userId, int day);

	/**
	 * Save the route to DB for a specific user on a specific day
	 */
	public void saveRoutes(String userId, int day, List<Spot> route);


	public String getFullname(String userId);


	public boolean verifyLogin(String userId, String password);

	
	public boolean registerUser(String userId, String password, String firstname, String lastname);
}
