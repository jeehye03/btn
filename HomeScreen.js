import {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Pressable,
  Button,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import Test from './assets/test.svg';
import Arrow from './assets/arrowDown.svg';
import styled from 'styled-components';
import NativeStatusBarManager from 'react-native/Libraries/Components/StatusBar/NativeStatusBarManagerIOS';

const HomeScreen = ({navigation}) => {
  const bodyRef = useRef();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [fadeIn, setFadeIn] = useState(false);
  const [rotate, setRotate] = useState('0deg');
  const [count, setCount] = useState(1);
  const [focus, setFocus] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  const handlePress = () => {
    Animated.timing(fadeAnim, {
      toValue: fadeIn ? 0 : 60,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setFadeIn(prev => !prev);
    Animated.timing(rotateAnim, {
      toValue: fadeIn ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const changeText = number => {
    setCount(number);
  };
  const addPress = () => {
    setCount(prev => Number(prev) + 1);
  };
  const minusPress = () => {
    setCount(prev => (prev <= 1 ? 1 : prev - 1));
  };
  const testPress = () => {
    setFocus(true);
  };
  const blurPress = () => {
    setFocus(false);
  };
  useEffect(() => {
    setRotate(
      rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
      }),
    );
  }, [rotateAnim]);
  useEffect(() => {
    Platform.OS == 'ios'
      ? NativeStatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} onBlur={blurPress}>
      <Container>
        <Button title="bottomSheet" onPress={() => navigation.push('Styled')} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'none'}
          style={{width: '100%'}}
          keyboardVerticalOffset={statusBarHeight + 44}>
          <Input focus={focus}>
            <View style={styles.count}>
              <Text onPress={minusPress}>-</Text>
              <TextInput
                keyboardType="number-pad"
                onPress={testPress}
                ref={bodyRef}
                onChangeText={changeText}>
                {count}
              </TextInput>
              <Text onPress={addPress}>+</Text>
            </View>
          </Input>
        </KeyboardAvoidingView>
        <BtnContainer focus={focus}>
          <View style={styles.touch}>
            <Pressable onPress={handlePress}>
              <Test />
              <Animated.View
                style={{
                  transform: [{rotate: rotate}],
                  position: 'absolute',
                  top: 5,
                  right: 24,
                }}>
                <Arrow />
              </Animated.View>
            </Pressable>
          </View>
          <View style={styles.innerContainer}>
            <Animated.View style={{height: fadeAnim}}>
              <View style={styles.anim}>
                <View style={styles.inner}>
                  <View>
                    <Text style={styles.text}>7,500원</Text>
                  </View>
                  <View style={styles.count}>
                    <Text style={styles.input}>
                      <Text onPress={minusPress}>-</Text>
                      <Text
                        onPress={() => {
                          testPress();
                          bodyRef.current.focus();
                        }}>
                        {count}
                      </Text>
                      <Text onPress={addPress}>+</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </Animated.View>
            <Pressable style={styles.button}>
              <Text style={styles.text}>
                {fadeIn ? '장바구니에 담기' : '1개 담기'}
              </Text>
            </Pressable>
          </View>
        </BtnContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};
const Input = styled.View`
  display: ${props => (props.focus ? null : 'none')};
  width: 100%;
  height: 56px;
  background-color: white;
`;
const Container = styled.SafeAreaView`
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;
const BtnContainer = styled.View`
  display: ${props => (props.focus ? 'none' : null)};
  margin-bottom:100px;
`;
const styles = StyleSheet.create({
  inner: {
    backgroundColor: 'white',
    height: 56,
    borderTopStartRadius: 27,
    borderTopEndRadius: 27,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 18,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  anim: {
    backgroundColor: '#FDC800',
    width: 343,
    height: 100,
    borderRadius: 29,
    padding: 4,
  },
  button: {
    backgroundColor: '#FDC800',
    width: 343,
    height: 56,
    borderRadius: 29,
    padding: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  touch: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  innerContainer: {
    backgroundColor: '#FDC800',
    borderRadius: 29,
    overflow: 'hidden',
  },
  count: {
    flexDirection: 'row'
    
    
  },
  input: {
    fontSize: 16,
  },
  textInputContainer: {
    marginTop: 'auto',
    borderWidth: 1,
    borderColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  textInput: {
    width: '100%',
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'pink',
  },
});
export default HomeScreen;
