import 'react-native-gesture-handler';
import {StyleSheet, StatusBar, Text, View} from 'react-native';
import MainNavigation from './src/Navigation';
import {useRef, useState} from 'react';
import Splash from './src/Screen/SplashScreen';
import {Provider} from 'react-redux';
import {persistor, store} from './src/Redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
export default function App() {
  const [splash, setSplash] = useState(true);
  const statusheight = StatusBar.currentHeight;
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        // onBeforeLift={() => new Promise(resolve => setTimeout(resolve, 3000))}
      >
        <View style={{flex: 1}}>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={'#2BA36F'}
            // style="light" translucent={true}
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
    </Provider>
  );
}

const styles = StyleSheet.create({});
