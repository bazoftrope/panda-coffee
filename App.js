import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { store, persistor } from './src/store/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ActivityIndicator, StyleSheet, Image, ImageBackground, Text, View } from 'react-native';
import { colors } from './src/components/cssColors'


import Signin from './src/pages/Signin';
import Signup from './src/pages/Signup';
import Main from './src/pages/Main';
import Cart from './src/pages/Cart';
import Category from './src/pages/Categorys/category';
import Card from './src/pages/menuCards/Card';
import Admin from './src/pages/Admin';
import Order from './src/pages/Admin/Order';
import Navbar from './src/components/Navbar';
import Account from './src/components/Account';
import Favourite from './src/components/Favourite';
import PaymentForm from './src/components/PaymentForm';
import Yookassa from './src/components/Yookassa';
import MyOrders from './src/components/MyOrders'
import Edit from './src/components/Edit'
import EditComponents from './src/components/Edit/EditComponents'
import Add from './src/components/Edit/add'
import PaidOrders from './src/pages/PaidOrders'
import SMSCheck from './src/pages/SMSCheck'
import SplashScreen from './src/components/screens/SplashScreen';
import SubCut from './src/pages/subCat';

const App = () => {
  const Stack = createStackNavigator();
  const Options = {
    headerStyle: {
      backgroundColor: colors.light,
      shadowColor: 'transparent', // Установите цвет тени в прозрачный
      shadowOffset: { width: 0, height: 0 }, // Установите смещение тени в 0
      shadowOpacity: 0, // Установите прозрачность тени в 0
      shadowRadius: 0, // Установите радиус тени в 
    },
    headerTintColor: colors.darkBrown,

    headerTitleStyle: {
      fontFamily: 'DudkaBold',
      color: colors.darkBrown


    }
  }




  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size="large" style={styles.loader} />}
        persistor={persistor}>
        <NavigationContainer linking={linking} >
          <Stack.Navigator initialRouteName={'Главная'}>
            <Stack.Screen name="Главная" component={Main} options={Options} />
            <Stack.Screen name="Корзина" component={Cart} options={Options} />
            <Stack.Screen name="Регистрация" component={Signup} options={{ title: null }} />
            <Stack.Screen name="Авторизация" component={Signin} options={{ title: null }} />
            <Stack.Screen name="Меню" component={Category} options={Options} />
            <Stack.Screen name="Аккаунт" component={Account} options={{ title: null }} />
            <Stack.Screen name="card" component={Card} options={Options} />
            <Stack.Screen name="Избранное" component={Favourite} options={{ title: null }} />
            <Stack.Screen name="Оплата" component={PaymentForm} options={{ title: null }} />
            <Stack.Screen name="Юкасса" component={Yookassa} options={{ title: 'Оплата', headerLeft: null, gestureEnabled: false, }} />
            <Stack.Screen name="Админка" component={Admin} />
            <Stack.Screen name="Редактирование" component={Edit} options={{ title: null }} />
            <Stack.Screen name="EditComponents" component={EditComponents} options={{ title: null }} />
            <Stack.Screen name="addComponent" component={Add} options={{ title: null }} />
            <Stack.Screen name="Заказ" component={Order} options={{ title: null }} />
            <Stack.Screen name="мои заказы" component={MyOrders} options={{ title: null }} />
            <Stack.Screen name="Paid Orders" component={PaidOrders} options={{ title: null }} />
            <Stack.Screen name="SMSCheck" component={SMSCheck} options={{ title: null }} />
            <Stack.Screen name="splashscreen" component={SplashScreen} options={Options} />
            <Stack.Screen name="subCat" component={SubCut} options={Options} />

          </Stack.Navigator>
          <Navbar />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const linking = {
  prefixes: ['myapp://app'],
  config: {
    screens: {
      Главная: 'homescreen',
      Оплата: 'payment',
      Юкасса: 'yookassa',
      Account: 'account',
      Меню: 'category',
      Админка: 'admin',
      EditComponents: 'edit',
      Регистрация: 'signup',
      Авторизация: 'signin',
    },
  },
};

const styles = StyleSheet.create({
  loader: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }

});

export default App;
