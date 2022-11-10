import {
  View,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState,useEffect} from 'react';
import {
  getHash,
  startOtpListener,
  useOtpVerify,
} from 'react-native-otp-verify';

const Input = () => {

  const [copiedText, setCopiedText] = useState('');
  const [otp,setOtp] = useState('');
  const copyToClipboard = () => {
    Clipboard.setString('hello world');
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  const { hash, otpTest, message, timeoutError, stopListener, startListener } = useOtpVerify({numberOfDigits: 7});

  useEffect(() => {
    getHash().then(hash => {
      // use this hash in the message.
    }).catch(console.log);
  
    startOtpListener(message => {
      // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
      const otpTest = /(\d{7})/g.exec(message)[1];
      setOtp(otpTest);
      
    });
    //return () => removeListener();
  }, []);
  console.log(hash,"hash")
  console.log(otp)
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <TouchableOpacity onPress={copyToClipboard}>
            <Text>Click here to copy to Clipboard</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={fetchCopiedText}>
            <Text>View copied text</Text>
          </TouchableOpacity>

          <TextInput style={styles.copiedText} placeholder="인증번호" autoComplete='sms-otp'>
            {copiedText} {otp}
          </TextInput>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copiedText: {
    marginTop: 10,
    color: 'red',
  },
});

export default Input;
