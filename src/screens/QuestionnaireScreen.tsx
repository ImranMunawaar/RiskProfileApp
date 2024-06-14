import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setAnswer, calculateScore} from '../store/questionnaireSlice';
import {RootState} from '../store';
import {RootStackParamList} from '../navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {questions} from '../constant/question';

type QuestionnaireScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Questionnaire'
>;

type Props = {
  navigation: QuestionnaireScreenNavigationProp;
};

const QuestionnaireScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentSelectedOptionScore, setCurrentSelectedOptionScore] =
    useState<number>(0);

  const answers = useSelector(
    (state: RootState) => state.questionnaire.answers,
  );
  const selectedOption = answers[currentQuestion]?.selectedOption ?? null;

  const handleNext = () => {
    if (selectedOption !== null) {
      dispatch(
        setAnswer({
          questionIndex: currentQuestion,
          selectedOption,
          score: currentSelectedOptionScore,
        }),
      );
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        dispatch(calculateScore());
        navigation.navigate('Result');
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleOptionPress = (index: number, score: number) => {
    setCurrentSelectedOptionScore(score);
    dispatch(
      setAnswer({questionIndex: currentQuestion, selectedOption: index, score}),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[currentQuestion].question}</Text>
      <FlatList
        data={questions[currentQuestion].options}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => handleOptionPress(index, item.score)}
            style={[
              styles.option,
              selectedOption === index && styles.selectedOption,
            ]}>
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View
        style={[
          styles.buttonContainer,
          currentQuestion === 0 && {justifyContent: 'flex-end'},
        ]}>
        {currentQuestion > 0 && (
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#2CB562'}]}
            onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                selectedOption === null ? 'lightGray' : '#2CB562',
            },
          ]}
          onPress={handleNext}
          disabled={selectedOption === null}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  option: {
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#2CB56230',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default QuestionnaireScreen;
