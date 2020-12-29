import 'react-native-gesture-handler';
import React, {Component} from 'react';
import HomeScreen from './src/screen/Home';
import QuizScreen from './src/screen/Quiz';
import AnswerScreen from './src/screen/Answer';
import BeforeQuizScreen from './src/screen/BeforeQuiz';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class App extends Component {
  render () {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: '이상형 월드컵' }}/>
          {/* <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={'HomeScreen'} />}
          </Stack.Screen> */}
          <Stack.Screen name="Quiz" component={QuizScreen}  options={{ title: 'QuizScreen' }}/>
          <Stack.Screen name="Answer" component={AnswerScreen}  options={{ title: 'AnswerScreen' }}/>
          <Stack.Screen 
            name="BeforeQuiz" 
            component={BeforeQuizScreen}  
            options={{ title: 'BeforeQuizScreen' }}
          /> 
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;