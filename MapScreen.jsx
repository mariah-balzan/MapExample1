import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// import {GOOGLE_MAPS_KEY} from '@env';

export function MapScreen() {
    //Origin
    const [origin, setOrigin] = React.useState({
      latitude: 35.902705,
      longitude:14.483579,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
    //Destination
    const [destination, setDestination] = React.useState({
      latitude: 35.898020,
      longitude:14.476714,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })

    //Initial Region
    const initialRegion={
      latitude:origin.latitude,
      longitude:origin.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }

    //Handles zoom onloading the app
    const mapRef = React.useRef()

    // Function to get realtime location
      const [location, setLocation] = React.useState(null);
    //Car image
    const carImage = require('./assets/car.png')

  React.useEffect(() => {
    getLocationPermission();
  }, []);

        async function getLocationPermission(){
          let {status} = await Location.requestForegroundPermissionsAsync();
          if(status != 'granted'){
            alert('Permission denied');
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          const current = {
            latitude : location.coords.latitude,
            longitude: location.coords.longitude
            
          }
          setOrigin(current);
        }
  

  return (
      <MapView 
      style={StyleSheet.absoluteFill} 
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      initialRegion={initialRegion}>

          {/* Origin Pin */}
          <Marker
          draggable 
          image={carImage}
          style={{maxHeight:'30%', maxWidth:'30%'}}
          coordinate = {origin} 
          onDragEnd={(direction => setOrigin(direction.nativeEvent.coordinate))}>
          </Marker>

          {/* Destination Pin */}
          <Marker
          draggable 
          coordinate = {destination} 
          onDragEnd={(direction => setOrigin(direction.nativeEvent.coordinate))}>
          </Marker>

      {/* Line */}
      <Polyline 
      coordinates={[origin,destination]}
      strokeColor = "blue"
      strokeWidth={5}/>

      {/* Directions: used Directions and iOS APIs*/}
      {/* <MapViewDirections
      origin = {origin}
      destination={destination}
      apikey={GOOGLE_MAPS_KEY} 
      strokeColor = "black"
      strokeWidth={5}
      //Handles zoom onloading the app
      optimizeWaypoints={true}
      onReady={result => {
        mapRef.current.fitToCoordinates(result.coordinates, {
          edgePadding: {
              right: 30,
              bottom: 300,
              left: 30,
              top: 100
          }
        })
      }}
      /> */}
      </MapView>
      
  );
}

const styles = StyleSheet.create({
  map:{
    width:'100%',
    height:'100%',
    marginBottom:'35%'
},
},
);

