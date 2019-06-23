/**
 * see DBConnections for instructions
 * 
 * @author
 *
 */
package db.mysql;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


import db.DBConnection;
import entity.City;
import entity.Spot;
import external.GoogleMapAPI;

public class MySQLConnection implements DBConnection{

	@Override
	public void close() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Spot> getRoutes(String userId, int day) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void saveRoutes(String userId, int day, List<Spot> route) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getFullname(String userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean verifyLogin(String userId, String password) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean registerUser(String userId, String password, String firstname, String lastname) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<City> getCities() {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}
