import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import CoinLogo from '../assets/coin.png';
import ClientLogo from '../assets/customer.png';
import AddUserLogo from "../assets/adduser.png";
import AddUSerLogoWhite from "../assets/adduserwhite.png";
import MembersLogo from "../assets/equipe.png";
import MembersLogoWhite from "../assets/equipewhite.png"

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'lightblue' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              padding: 20,
              backgroundColor: isFocused ? 'rgb(37 99 235)' : 'white',
            }}
            key={index}
          >
            <View style={{flexDirection:"row-reverse"}}>
                {
                  label ==='العملاء' ? (
                    <Image source={ClientLogo} style={{ marginLeft:16, width: 28, height: 28 }} />
                  ): 
                  label === 'النقود' ? (
                    <Image source={CoinLogo} style={{ marginLeft:16,width: 28, height: 28 }} />
                  ): 
                  label === 'لائحة العملاء' ? (
                    isFocused ? (
                      <Image source={MembersLogoWhite} style={{ marginLeft:16,width: 28, height: 28 }} />
                    ):(
                      <Image source={MembersLogo} style={{ marginLeft:16,width: 28, height: 28 }} />
                    )

                  ):
                  label ==="إضافة عميل" ? (
                    isFocused ? (
                      <Image source={AddUSerLogoWhite} style={{ marginLeft:16,width: 28, height: 28 }} />
                    ):(
                      <Image source={AddUserLogo} style={{ marginLeft:16,width: 28, height: 28 }} />
                    )
                  ):
                   null}
                <Text style={{ color: isFocused ? 'white' : 'rgb(37 99 235)', fontSize:22}}>{label}</Text>
            </View>

          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
