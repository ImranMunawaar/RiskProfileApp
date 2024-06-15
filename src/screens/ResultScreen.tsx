import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {RootStackParamList} from '../navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

type ResultScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Result'
>;

type Props = {
  navigation: ResultScreenNavigationProp;
};

const ResultScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();

  const {score, riskProfile} = useSelector(
    (state: RootState) => state.questionnaire,
  );

  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  const getRiskProfileColor = (category: string) => {
    switch (category) {
      case 'Low':
        return ['#43A047', '#2E7D32']; // Green gradient for Low risk profile
      case 'Medium':
        return ['#FFB300', '#FF8F00']; // Orange gradient for Medium risk profile
      case 'High':
        return ['#E53935', '#C62828']; // Red gradient for High risk profile
      default:
        return ['#757575', '#616161']; // Default gradient
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Risk Profile</Text>
      <Animated.View
        style={[styles.cardContainer, {transform: [{translateY}]}]}>
        <LinearGradient
          colors={getRiskProfileColor(riskProfile)}
          style={styles.card}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.categoryLabel}>Category</Text>
          <Text style={styles.category}>{riskProfile}</Text>
        </LinearGradient>
      </Animated.View>
      <TouchableOpacity style={styles.button} onPress={handleBack}>
        <Text style={styles.buttonText}>Retake Questionnaire</Text>
      </TouchableOpacity>

      <View style={styles.rangesContainer}>
        <View>
          <View style={styles.rangeItem}>
            <LinearGradient
              colors={getRiskProfileColor('Low')}
              style={styles.rangeColor}
            />
            <Text style={styles.rangeText}>Low: 0 - 7</Text>
          </View>
          <View style={styles.rangeItem}>
            <LinearGradient
              colors={getRiskProfileColor('Medium')}
              style={styles.rangeColor}
            />
            <Text style={styles.rangeText}>Medium: 8 - 12</Text>
          </View>
          <View style={styles.rangeItem}>
            <LinearGradient
              colors={getRiskProfileColor('High')}
              style={styles.rangeColor}
            />
            <Text style={styles.rangeText}>{'High: ≥ 13 '}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  card: {
    width: 200,
    height: 200,
    borderRadius: 100, // Half of width and height to make it a circle
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  score: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: '#2CB562',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rangesContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  rangeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rangeColor: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 5,
  },
  rangeText: {
    fontSize: 12,
    color: '#333',
  },
});

export default ResultScreen;
