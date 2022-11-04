import { useState } from "react";
import { StyleSheet, Text, View,Button } from "react-native";
import BottomSheet from "./BottomSheet";



const BottomSheetTestScreen = (props) => {

    const [ modalVisible, setModalVisible ] = useState(false);
    const pressButton = () => {
        setModalVisible(true);
    }
   
    return (
        <View style={styles.rootContainer}>
            
            <Button
                title={"Open BottomSheet!"}
                onPress={pressButton}
            />
            <BottomSheet
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default BottomSheetTestScreen;