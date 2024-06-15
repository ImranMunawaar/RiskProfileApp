import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import QuestionnaireScreen from '../screens/QuestionnaireScreen';
import ResultScreen from '../screens/ResultScreen';

export type RootStackParamList = {
  Questionnaire: undefined;
  Result: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Questionnaire">
        <Stack.Screen
          name="Questionnaire"
          component={QuestionnaireScreen}
          options={{headerLeft: () => null, headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{headerLeft: () => null, headerTitleAlign: 'center'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
