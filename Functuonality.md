# Travel Plan Pegasus Functuonality
This is a backend Technical Functuonality Document for routing algorithm. 

Contributor: Yang Yi


## *Goal:*

Return a json array of lat&lon to frontend based on user's:
1. travel days
2. Must-Go places 
3. interest categories (may be impletment in the advanced version).

*Dependencies / Conditions:*
1. start point and end point for each day is the hotel.
2. consider time spend of commuting to each places (Distance Matrix API)
3. give an estimate visit time for each place, here we estimate it with a default weight for different categories.

## Potential Solution: 

We first segament the places into each day, and then connect the path within each bucket, return the global_min solution.



#### *Terms:*

k = user travel days, 

n = total number of user saved places, 

edgeweight = travel time when arrive the places, 

nodeweight = visit duration for each places,

bmax = total time for each day, we can manually set it to 10 hours.


*Time Complexity:*

worst case: k^n * 4! 

(say we would have at most 4 places to visit each day.


#### *Algorithm*
1. build a map with user's selection, segment them into k buckets:
    
    say we want to know where should we put the cur node, t = today's current total visit time, t = edgeweight + nodeweight
    
    i. if t > bmax, we will put it to the bucket[i+1] if bucket[i+1] != null, else, return false for this solution;
    
    ii. if t <= bmax, put node to bucket[i] and move to next node
    
2. connect nodes in each bucket, return the golbal_min spend time solution. 
    Since it would not be too much nodes in each bucket (estimate max is 4), we would do it in a brute force way.


#### *Corner Cases:*

there may be no solution returned because of following situations:
1. if the users did not select enough places, we would generate more places based on user's current selection places and/or selected categories.
2. if the users select more places than the travel days:
    i. select the most popular(higher reviews) into the path
    ii. warn user that his travel days are limited, please delete some places or add more days 


#### *Testing Strategy:*
