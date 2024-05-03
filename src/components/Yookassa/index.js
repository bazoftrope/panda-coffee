import {React} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

export default function Yookassa({route}) {
  return (
    <View style={styles.yooKassaView}>
      <WebView source={{uri: route.params}} style={{flex: 1}} />
    </View>
  );
}

const styles = StyleSheet.create({
  yooKassaView: {
    width: '100%',
    height: '100%',
  },
});
