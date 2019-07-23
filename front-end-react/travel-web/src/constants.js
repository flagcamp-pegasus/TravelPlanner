export const API_ROOT = 'http://localhost:8080/TravelPlanner';
export const TOKEN_KEY = 'TOKEN_KEY';
export const GEO_OPTIONS = {
 enableHighAccuracy: true,
 maximumAge        : 3600000,
 timeout           : 27000
};
export const POS_KEY = 'POS_KEY';
export const AUTH_HEADER = 'Bearer';
export const LOC_SHAKE = 0.02;

export const API_KEY="AIzaSyC6H9bJcyRzUYM3rc1DVGUu80ASLnoUkCc";
export const HISTORY_ENDPOINT = '/history'
export const RECOM_ENDPOINT = '/recommendroute'
export const SAVE_ENDPOINT= '/saveroute'
export const CITY_ZOOM = 2
export const PATH_ZOOM = 9
export const LAT_SAMPLE = '-33.8665433';
export const LON_SAMPLE = '151.1956316';
export const TYPE_FOOD ='restaurant';
export const TYPE_SHOPPING ='shopping_mall';
export const TYPE_MUSEUM = 'museum';
export const CITY_LIST = [
    {
     name: "London",
     latlng: {lat: 51.506155, lng: -0.127824},
     imageUrl: "https://images.unsplash.com/photo-1500380804539-4e1e8c1e7118?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    },
    {
     name: "Paris",
     latlng: {lat: 48.854429, lng: 2.352198},
     imageUrl: "https://images.unsplash.com/photo-1485199433301-8b7102e86995?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1080&q=80"
    },
    {
     name: "Milano",
     latlng: {lat: 45.461719, lng: 9.190091},
     imageUrl: "https://images.unsplash.com/photo-1512397739299-fe5a4327d192?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    },
    {
     name: "New York",
     latlng: {lat: 40.712921, lng: -74.006063},
     imageUrl: "https://images.unsplash.com/photo-1496664232858-ae3480e5d308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    }
];