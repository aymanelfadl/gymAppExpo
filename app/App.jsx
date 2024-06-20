import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from '../screens/LoginScreen';
import UsersScreen from '../screens/UsersScreen';
import MoneyScreen from '../screens/MoneyScreen';
import CustomTabBar from '../components/CustomTabBar';
import Header from '../components/Header';
import AddUserScreen from '../screens/AddUSerScreen';
import MembersScreen from '../screens/MemebersScreen';
import BillsScreen from '../screens/BillsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser, getLink } from '../screens/GlobalState';
import axios from 'axios';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{ headerShown: false, lazy: true }}
    tabBarPosition='bottom'
    tabBar={(props) => <CustomTabBar {...props} />}
  >
    <Tab.Screen name='العملاء' component={UsersScreen} />
    <Tab.Screen name='النقود' component={MoneyScreen} />
  </Tab.Navigator>
);

const MembersTabs = () => (
  <Tab.Navigator
    screenOptions={{ headerShown: false, lazy: true }}
    tabBarPosition='bottom'
    tabBar={(props) => <CustomTabBar {...props} />}
  >
    <Tab.Screen name='لائحة العملاء' component={MembersScreen} />
    <Tab.Screen name='إضافة عميل' component={AddUserScreen} />
  </Tab.Navigator>
);

const HomeDrawer = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false, drawerPosition: 'right' }}
    gestureEnabled={true}
  >
    <Drawer.Screen name='Home' component={HomeTabs} />
    <Drawer.Screen name='members' component={MembersTabs} />
    <Drawer.Screen name='bills' component={BillsScreen} />
  </Drawer.Navigator>
);

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [serverLink, setServerLink] = useState(null);
  const [isLogin, setisLogin] = useState(false);


  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          setAccessToken(token);
          await fetchUserCurrent(token);
        } else {
          setLoadingUser(false);
        }
      } catch (error) {
        console.error('Failed to retrieve the token:', error);
        setLoadingUser(false);
      }
    };

    const link = getLink();
    setServerLink(link);
    initialize();
  }, []);

  const fetchUserCurrent = async (token) => {   
    console.log(serverLink)
    try {
      const response = await axios.get(`${serverLink}api/userToken`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`${serverLink}api/userToken`);
      setUser(response.data.data.user);
      setisLogin(true)
      console.log("access : " + accessToken);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoadingUser(false);
    }
  };

  return (
    <NavigationContainer independent={true}>
    
        <Stack.Navigator initialRouteName={ isLogin ? 'HomeScreen' : 'Login'}>
          <Stack.Screen
            name='Login'
            options={{ headerShown: false }}
          >
            {props => <LoginScreen {...props} serverLink={serverLink} />}
          </Stack.Screen>
          <Stack.Screen
            name='HomeScreen'
            component={HomeDrawer}
            options={{ header: () => <Header /> }}
          />
        </Stack.Navigator>
    
    </NavigationContainer>
  );
};

export default App;
