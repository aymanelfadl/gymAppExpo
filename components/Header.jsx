import React, { useState } from 'react';
import { Image, View, Dimensions, TouchableOpacity } from 'react-native';
import FitFlexLogo from '../assets/Fitflex-HD.png';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get('window').height;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
    setIsOpen(!isOpen);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        height: windowHeight * 0.1,
        backgroundColor: 'white',
        shadowColor: 'rgba(0, 0, 0,1)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation:12 
      }}>
      <View>
        <Image
          source={FitFlexLogo}
          style={{
            width: 100,
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={{ justifyContent: 'center'}}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Icon
            name={'menu-unfold'}
            color="rgb(2 6 23)"
            size={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
