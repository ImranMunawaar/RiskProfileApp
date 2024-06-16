// src/store/questionnaireSlice.test.ts

import questionnaireReducer, { setAnswer, calculateScore, reset } from '../src/store/questionnaireSlice';

describe('questionnaireReducer', () => {
  it('should handle setAnswer', () => {
    const initialState = {
      answers: [
        { questionIndex: 0, selectedOption: null, score: 0 },
        { questionIndex: 1, selectedOption: null, score: 0 },
      ],
      score: 0,
      riskProfile: '',
    };

    const nextState = questionnaireReducer(initialState, setAnswer({ questionIndex: 0, selectedOption: 1, score: 3 }));
    expect(nextState.answers[0].selectedOption).toEqual(1);
    expect(nextState.answers[0].score).toEqual(3);
  });

  it('should handle calculateScore', () => {
    const initialState = {
      answers: [
        { questionIndex: 0, selectedOption: 1, score: 3 },
        { questionIndex: 1, selectedOption: 2, score: 4 },
      ],
      score: 0,
      riskProfile: '',
    };

    const nextState = questionnaireReducer(initialState, calculateScore());
    expect(nextState.score).toBeGreaterThan(0);
    expect(nextState.riskProfile).toBeDefined();
  });

  it('should handle reset', () => {
    const initialState = {
      answers: [
        { questionIndex: 0, selectedOption: 1, score: 3 },
        { questionIndex: 1, selectedOption: 2, score: 4 },
      ],
      score: 10,
      riskProfile: 'Medium',
    };

    const nextState = questionnaireReducer(initialState, reset());
    expect(nextState.score).toEqual(0);
    expect(nextState.riskProfile).toEqual('');
    expect(nextState.answers.every(answer => answer.selectedOption === null && answer.score === 0)).toBe(true);
  });
});
