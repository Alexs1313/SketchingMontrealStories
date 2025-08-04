import {
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppBackground from '../components/AppBackground';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const { height } = Dimensions.get('window');

const DrawDetails = ({ route }) => {
  const navigation = useNavigation();
  const drawingPaths = route.params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${name}
${description}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AppBackground>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.7} onPress={handleShare}>
              <Image source={require('../assets/icons/share.png')} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('../assets/icons/close.png')} />
            </TouchableOpacity>
          </View>

          <View style={styles.articleContainer}></View>

          <View style={styles.thumbnail}>
            <Svg width="100%" height="100%" viewBox="-100 55 600 350">
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

          <LinearGradient
            colors={['#FB6029', '#FEAE06']}
            style={styles.gradientButton}
          >
            <Text style={styles.btnText}>Black Forest Cake 🍰</Text>
          </LinearGradient>
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
  articleTitle: {
    fontWeight: '500',
    fontSize: 24,
    color: '#fff',
    marginBottom: 12,
  },
  articleDescription: {
    fontWeight: '400',
    fontSize: 16,
    color: '#fff',
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 345,
    borderRadius: 20,
    marginBottom: 8,
  },
  thumbnail: {
    width: '100%',
    height: height * 0.55,
    borderWidth: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  gradientButton: {
    width: '100%',
    height: 53,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  btnText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#fff',
  },
});

export default DrawDetails;
