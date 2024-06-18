import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LoginScreen from "../screens/LoginScreen";
import UsersScreen from "../screens/UsersScreen";
import MoneyScreen from "../screens/MoneyScreen";
import CustomTabBar from "../components/CustomTabBar";
import Header from "../components/Header";
import AddUserScreen from "../screens/AddUSerScreen";
import MembersScreen from "../screens/MemebersScreen";
import BillsScreen from "../screens/BillsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();
const serverLink = "http://192.168.1.79:8000/";

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, lazy: true }}
      tabBarPosition="bottom"
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="العملاء" component={UsersScreen} />
      <Tab.Screen name="النقود" component={MoneyScreen} />
    </Tab.Navigator>
  );
};

const MemebrsTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, lazy: true }}
      tabBarPosition="bottom"
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="لائحة العملاء" component={MembersScreen} />
      <Tab.Screen name="إضافة عميل" component={AddUserScreen} />
    </Tab.Navigator>
  );
};

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerPosition: "right" }}
      gestureEnabled={true}
    >
      <Drawer.Screen name="لوحة القيادة" component={HomeTabs} />
      <Drawer.Screen name="سجل الزبائن" component={BillsScreen} />
      <Drawer.Screen name="سجل الفواتير" component={MemebrsTabs} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <LoginScreen {...props} serverLink={serverLink} />}
        </Stack.Screen>
        <Stack.Screen
          name="HomeScreen"
          component={HomeDrawer}
          options={({ navigation }) => ({
            header: () => <Header />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
