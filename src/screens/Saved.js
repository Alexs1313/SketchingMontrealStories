import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppBackground from '../components/AppBackground';
import LinearGradient from 'react-native-linear-gradient';
import { useStore } from '../store/context';
import Svg, { Path } from 'react-native-svg';

const { height } = Dimensions.get('window');

const Saved = () => {
  const { savedDrawings, setSavedDrawings } = useStore();
  const navigation = useNavigation();

  const handleDeleteDrawing = selectedDrawing => {
    const filtered = savedDrawings.filter(item => item !== selectedDrawing);
    setSavedDrawings(filtered);
  };

  const showConfirm = selectedDrawing => {
    Alert.alert(
      'Delete This Drawing?',
      'Are you sure you want to delete this masterpiece? This action cannot be undone!',
      [
        {
          text: 'Cancel',

          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            handleDeleteDrawing(selectedDrawing);
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <AppBackground>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>🎨 Just Me & the City</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('../assets/icons/close.png')} />
            </TouchableOpacity>
          </View>

          {savedDrawings.length === 0 && (
            <View style={{ alignItems: 'center', marginTop: height * 0.19 }}>
              <Image source={require('../assets/images/emptyScreen.png')} />
              <Text style={styles.emptyScreenTitle}>🖼️ No Drawings Yet</Text>
              <Text style={styles.emptyScreenSubtitle}>
                Your sketchbook is still waiting for its first story. Start
                drawing — solo or with friends — and your creations will appear
                here.
              </Text>
            </View>
          )}

          <View style={styles.wrapper}>
            {savedDrawings.map((drawingPaths, index) => (
              <TouchableOpacity
                onLongPress={() => showConfirm(drawingPaths)}
                key={index}
                style={styles.thumbnail}
              >
                <Svg width="100%" height="100%" viewBox="-150 100 600 350">
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
                <TouchableOpacity
                  style={{}}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate('DrawDetails', drawingPaths)
                  }
                >
                  <LinearGradient
                    colors={['#FB6029', '#FEAE06']}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.btnText}>Black Forest Cake 🍰</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}

            {/* {cities.map((city, idx) => (
              <View
                style={{ width: '48%', height: 248, marginBottom: 45 }}
                key={idx}
              >
                <Image source={city.image} style={styles.image} />
                <TouchableOpacity
                  style={{}}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Canvas', city)}
                >
                  <LinearGradient
                    colors={['#FB6029', '#FEAE06']}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.btnText}>Draw</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ))} */}
          </View>
        </View>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.09, padding: 24 },
  title: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  subtitle: {
    fontWeight: '300',
    fontStyle: 'italic',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
  },
  articleTitle: {
    fontWeight: '500',
    fontSize: 18,
    color: '#fff',
    marginBottom: 2,
  },
  articleDescription: {
    fontWeight: '300',
    fontSize: 12,
    color: '#C6C6C6',
    marginBottom: 24,
    width: '95%',
  },
  image: {
    width: '100%',
    height: 248,
    borderRadius: 20,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gradientButton: {
    width: '100%',
    height: 58,
    position: 'absolute',
    top: -50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#fff',
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  thumbnail: {
    width: '48%',
    height: 248,
    borderWidth: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  emptyScreenSubtitle: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
    marginVertical: 16,
  },
  emptyScreenTitle: {
    fontWeight: '500',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Saved;
