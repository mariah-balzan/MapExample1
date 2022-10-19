import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

export function MapScreen() {
  //Constants
  const [origin, setOrigin] = useState({
    latitude: 33.640411,
    longitude:-84.419853,
  })

  const [destination, setDestination] = useState({
    latitude: 33.753746,
    longitude:-84.419853,
  })


  return (
      <MapView style={styles.map} 
      initialRegion={{
        latitude:origin.latitude,
        longitude:origin.longitude,
        latitudeDelta:0.09,
        longitudeDelta:0.09,
      }}
      >
      {/* Start Pin */}
      <Marker
      draggable 
      coordinate = {origin} 
      onDragEnd={(direction => setOrigin(direction.nativeEvent.coordinate))}>
      </Marker>

      {/* End Pin */}
      <Marker
      draggable 
      coordinate = {destination} 
      onDragEnd={(direction => setOrigin(direction.nativeEvent.coordinate))}>
      </Marker>

      {/* Line */}
      <Polyline 
      coordinates={[origin,destination]}
      strokeColor = "pink"
      strokeWidth={8}/>
      </MapView>
      
      
  );
}

const styles = StyleSheet.create({
  map:{
    width:'100%',
    height:'100%',
}
},
);

