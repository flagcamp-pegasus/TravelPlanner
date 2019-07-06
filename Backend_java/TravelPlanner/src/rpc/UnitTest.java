package rpc;

import static org.junit.Assert.*;

import org.junit.Test;

public class UnitTest {

	@Test
	public void test() {
		 String str = new String("This is a unit test.");
		   assertEquals("unit", str.substring(10, 14));

	}

}
