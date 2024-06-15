// questionnaireSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {questions} from '../constant/question';
import {State} from 'react-native-gesture-handler';

interface Option {
  text: string;
  score: number;
}

interface Answer {
  questionIndex: number;
  selectedOption: number | null;
  score: number;
}

interface QuestionnaireState {
  answers: Answer[];
  score: number;
  riskProfile: string;
}

const initialState: QuestionnaireState = {
  answers: questions.map((question, index) => ({
    questionIndex: index,
    selectedOption: null,
    score: 0,
  })),
  score: 0,
  riskProfile: '',
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setAnswer(
      state,
      action: PayloadAction<{
        questionIndex: number;
        selectedOption: number;
        score: number;
      }>,
    ) {
      const {questionIndex, selectedOption, score} = action.payload;
      state.answers[questionIndex].selectedOption = selectedOption;
      state.answers[questionIndex].score = score;
    },
    calculateScore(state) {
      const score = state.answers.reduce(
        (total, answer) => total + answer.score,
        0,
      );
      state.score = score;
      if (score <= 7) state.riskProfile = 'Low';
      else if (score <= 12) state.riskProfile = 'Medium';
      else state.riskProfile = 'High';
    },
    // Add other reducers as needed
    reset(state) {
      state.score = initialState.score;
      state.riskProfile = initialState.riskProfile;
      state.answers = [...initialState.answers];
    },
  },
});

export const {setAnswer, calculateScore, reset} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
