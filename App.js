import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/Feather';
import Styled from './BottomSheetTestScreen';
import Input from './Input';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => {
              return (
                <View>
                  <Icon name="shopping-bag" size={26} />
                </View>
              );
            },
          }}
        />
        <Stack.Screen name="Styled" component={Styled} />
        <Stack.Screen name="Input" component={Input} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
