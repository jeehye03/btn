import {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet, Animated, Pressable, Button} from 'react-native';
import Test from './assets/test.svg';
import Arrow from './assets/arrowDown.svg';

const HomeScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const [fadeIn, setFadeIn] = useState(false);
  const [rotate, setRotate] = useState('0deg');
  const [count,setCount] = useState(1);

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

  const addPress = () => {
    setCount(count + 1)
  }
  
  const minusPress = () => {
    setCount((prev) => (prev <= 1 ? 1 : prev - 1 ))
  }

  useEffect(() => {
    setRotate(
      rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
      }),
    );
  }, [rotateAnim]);

  return (
    <View style={styles.container}>
      <Button title="bottomSheet" onPress={() => navigation.push('Styled')}/>
      <View>
        <Pressable style={styles.touch} onPress={handlePress}>
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
              <Text onPress={minusPress}>-</Text>
              <Text>{count}</Text>
              <Text onPress={addPress}>+</Text>
            </View>
          </View>
        </Animated.View>
        <Pressable style={styles.button}>
          <Text style={styles.text}>
            {fadeIn ? '장바구니에 담기' : '1개 담기'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inner: {
    backgroundColor: 'white',
    height: 56,
    borderTopStartRadius: 27,
    borderTopEndRadius: 27,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 100,
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
  },
  innerContainer:{
    backgroundColor: '#fdc800',
    borderRadius:29,
    overflow: 'hidden'
  }
});
export default HomeScreen;
