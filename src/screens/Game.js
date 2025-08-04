import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { PanResponder } from 'react-native';
import Slider from '@react-native-community/slider';
import AppBackground from '../components/AppBackground';

const { height } = Dimensions.get('window');

export default function Game() {
  const [paths, setPaths] = useState([]);
  const [savedDrawings, setSavedDrawings] = useState([]);
  const currentPath = useRef('');
  const [opacity, setOpacity] = useState(1);
  const viewShotRef = useRef(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const { moveX, moveY } = gestureState;
      currentPath.current += `L${moveX},${moveY} `;
      setPaths(prev => [...prev.slice(0, -1), currentPath.current]);
    },
    onPanResponderGrant: evt => {
      const { locationX, locationY } = evt.nativeEvent;
      currentPath.current = `M${locationX},${locationY} `;
      setPaths(prev => [...prev, currentPath.current]);
    },
    onPanResponderRelease: () => {
      // Finished drawing
    },
  });

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to save drawings',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const undoLast = () => {
    setPaths(prev => prev.slice(0, -1));
  };

  const saveDrawing = () => {
    if (paths.length === 0) return;
    setSavedDrawings(prev => [...prev, paths]);
    setPaths([]); // Clear current drawing after saving
  };

  return (
    <AppBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.7} onPress={saveDrawing}>
            <Image source={require('../assets/images/components/save.png')} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Image source={require('../assets/icons/close.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.drawContainer}>
          <View style={styles.drawingArea} {...panResponder.panHandlers}>
            {/* Background Image */}
            <Image
              source={{ uri: 'https://i.imgur.com/5EOyTDQ.jpg' }} // <-- Replace with your image URL or local asset
              style={[styles.backgroundImage, { opacity }]}
              resizeMode="cover"
            />
            {/* SVG Drawing Layer */}
            <Svg style={StyleSheet.absoluteFill}>
              {paths.map((d, index) => (
                <Path
                  key={index}
                  d={d}
                  stroke="red"
                  strokeWidth={3}
                  fill="none"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              ))}
            </Svg>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity activeOpacity={0.7} onPress={undoLast}>
              <Image source={require('../assets/icons/back.png')} />
            </TouchableOpacity>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={opacity}
              onValueChange={value => setOpacity(value)}
              minimumTrackTintColor="#FB6029"
              maximumTrackTintColor="#fff"
              thumbTintColor="#fff"
              thumbImage={require('../assets/icons/thumb.png')}
            />
          </View>
        </View>

        {/* Render saved drawings */}
        <ScrollView contentContainerStyle={styles.gallery}>
          {savedDrawings.map((drawingPaths, index) => (
            <View key={index} style={styles.thumbnail}>
              <Svg width="100%" height="100%" viewBox="0 0 200 200">
                {drawingPaths.map((d, i) => (
                  <Path
                    key={i}
                    d={d}
                    stroke="red"
                    strokeWidth={2}
                    fill="none"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                ))}
              </Svg>
            </View>
          ))}
        </ScrollView>
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.08,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 27,
  },
  drawContainer: {
    height: '80%',
  },
  drawingArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    borderRadius: 12,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    opacity: 0.5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 44,
    alignItems: 'center',
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'flex-start',
  },
  thumbnail: {
    width: 100,
    height: 100,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },

  box: {
    width: 200,
    height: 200,
    backgroundColor: 'blue',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  slider: {
    width: '80%',
    height: 40,
  },
});
