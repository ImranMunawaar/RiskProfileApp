# Risk Profile Questionnaire Mobile App

This mobile app helps users determine their risk profile. It guides users through a series of questions related to their investment preferences and calculates a risk profile score based on their answers.

## Features

- User-friendly interface with a series of questions about investment preferences.
- Navigation between questions and results using React Navigation.
- State management using Redux.
- Animations for a better user experience using `react-native-animatable`.
- Calculation of risk profile score based on user responses.
- Display of the risk profile category (Low, Medium, High) based on the calculated score.

## Screens

1. **Questionnaire Screen**: Presents a series of questions to the user.
2. **Result Screen**: Displays the user's risk profile score and category.

## Technologies Used

- React Native
- Redux for state management
- React Navigation for screen navigation
- `react-native-animatable` for animations
- TypeScript for type safety

## Prerequisites

- Node.js (>= v18, currently using v19.9.0)
- npm (currently using v9.6.3)
- Yarn or npm
- Android Studio or Xcode for running the app on a physical device or simulator

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/risk-profile-app.git
    cd risk-profile-app
    ```

2. Install dependencies:
    ```bash
    yarn install
    # or
    npm install
    ```

## Running the App

1. Start the Metro bundler:
    ```bash
    npx react-native start
    ```

2. Run the app on an Android device/simulator:
    ```bash
    npx react-native run-android
    ```

3. Run the app on an iOS device/simulator:
    ```bash
    npx react-native run-ios
    ```

## Project Structure

```bash
risk-profile-app
├── App.tsx
├── navigation
│   └── AppNavigator.tsx
├── screens
│   ├── QuestionnaireScreen.tsx
│   └── ResultScreen.tsx
├── store
│   ├── index.ts
│   └── questionnaireSlice.ts
├── constant
│   └── question.ts
├── README.md
├── package.json
└── tsconfig.json
