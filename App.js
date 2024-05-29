import 'react-native-gesture-handler';
import {StyleSheet, StatusBar, Text, View} from 'react-native';
import MainNavigation from './src/Navigation';
import {useEffect, useRef, useState} from 'react';
import Splash from './src/Screen/SplashScreen';
import {Provider} from 'react-redux';
import {persistor, store} from './src/Redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import {COLORS} from './src/Constants/COLORS';
import {PaperProvider} from 'react-native-paper';
export default function App() {
  const [splash, setSplash] = useState(true);
  const statusheight = StatusBar.currentHeight;

  return (
    <Provider store={store}>
      <PaperProvider>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{flex: 1}}>
            <StatusBar
              barStyle={'light-content'}
              backgroundColor={COLORS.themeColor}
            />
            {/* <MainNavigation /> */}
            {splash ? (
              <Splash splash={splash} setSplash={setSplash} />
            ) : (
              <MainNavigation />
            )}
            <FlashMessage
              position="center"
              statusBarHeight={statusheight}
              style={{borderBottomRightRadius: 10, borderBottomLeftRadius: 10}}
            />
          </View>
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});
