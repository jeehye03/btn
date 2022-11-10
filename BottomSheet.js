import React, {useEffect, useRef, useState} from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
const todos = [
  {id: 1, text: "샤워하기", done: true},
  {id: 2, text: "기술 공부하기", done: false},
  {id: 3, text: "독서하기", done: false},
  {id: 4, text: "샤워하기", done: true},
  {id: 5, text: "기술 공부하기", done: false},
  {id: 6, text: "독서하기", done: false},
  {id: 7, text: "샤워하기", done: true},
  {id: 8, text: "기술 공부하기", done: false},
  {id: 9, text: "독서하기", done: false},
  {id: 10, text: "샤워하기", done: true},
  {id: 11, text: "기술 공부하기", done: false},
  {id: 12, text: "독서하기", done: false},
];
const BottomSheet = props => {
  const {modalVisible, setModalVisible} = props;
  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const upY = useRef(new Animated.Value(0)).current;
  const list = useRef();
  const [up, setUP] = useState(0);
  const [y, setY] = useState(0);
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });
  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });
  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });
  const pressOutUp = e => {
    const {pageY} = e.nativeEvent;
    console.log("test : " + pageY);
    if (pageY > y + 30) {
      if (up < 500) {
        closeModal();
      } else {
        downSheet.start();
        list.current.scrollToOffset({animated: false, y: 0});
      }
    } else if (pageY < y - 30) {
      upSheet.start();
    } else {
      downSheet.start();
      list.current.scrollToOffset({animated: false, y: 0});
    }
  };
  const pressInUp = e => {
    const {pageY} = e.nativeEvent;
    console.log("test2 : " + pageY);
    setY(pageY);
  };
  const upSheet = Animated.timing(upY, {
    toValue: 700,
    duration: 300,
    useNativeDriver: false,
  });
  const downSheet = Animated.timing(upY, {
    toValue: 350,
    duration: 300,
    useNativeDriver: false,
  });
  useEffect(() => {
    if (props.modalVisible) {
      resetBottomSheet.start();
    }
  }, [props.modalVisible, resetBottomSheet]);
  useEffect(() => {
    const id = upY.addListener(state => {
      setUP(state.value);
    });
    return () => {
      upY.removeListener(id);
    };
  }, [up, upY]);
  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };
  return (
    <Modal visible={modalVisible} animationType={"slide"} transparent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{translateY: translateY}],
            height: up,
            width: Dimensions.get("window").width,
          }}>
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              borderRadius: 50,
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              top: -36,
            }}
            onPressIn={pressInUp}
            onPressOut={pressOutUp}
            // onPress={() => {
            //   if (up > 350) {
            //     downSheet.start();
            //   } else {
            //     upSheet.start();
            //   }
            // }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: 50,
                height: 7,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
            />
          </TouchableOpacity>
          <FlatList
            style={styles.list}
            data={todos}
            ref={list}
            scrollEnabled={up > 500}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Text style={[styles.text, item.done && styles.lineThrough]}>
                  {item.text}
                </Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    position: "relative",
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    minHeight: 350,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
  },
  text: {
    padding: 15,
    fontSize: 34,
  },
  container: {
    flex: 1,
  },
  scroll: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  item: {
    width: Dimensions.get("screen").width,
  },
});
export default BottomSheet;