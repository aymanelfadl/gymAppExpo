import { useState } from 'react';
import { Image, ScrollView, Text, View, Dimensions } from 'react-native';
import UsersLogo from '../assets/users.png';
import Icon from 'react-native-vector-icons/AntDesign';
import ProgressBar from '../components/ProgressBar';
import PlusLogo from "../assets/plus.png";
import NoMoneyLogo from "../assets/nomoney.png"

const UsersScreen = () => {
  
  const [totalUsers, setTotalUsers] = useState(0);

  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={{ flex: 1 ,backgroundColor:"white"}}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 30,
            width: windowWidth * 0.9,
            height: windowHeight * 0.25,
            flexDirection: 'row',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginBottom: 20, 
          }}
        >
          <View style={{ justifyContent: 'center', marginRight: 30 }}>
            <Image style={{ height: 100, width: 120 }} source={UsersLogo} />
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <Text style={{ alignSelf: 'center', color: 'rgb(59 130 246)', fontSize: 24, fontWeight: 'bold', marginBottom:18 }}>
              إجمالي العملاء
            </Text>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <Text style={{ color: 'black' }}>{totalUsers}</Text>
              <Icon name="user" size={20} color="black" style={{ marginLeft: 5 }} />
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: 'rgb(254 226 226)', borderRadius: 100, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginBottom: 18, width:windowWidth*0.9 }}>
          <ProgressBar data={60} total={100} Date={"العملاء بدون دفع"} MiniLogo={NoMoneyLogo} hasRedBorder={true} />
        </View>
        <View style={{width: windowWidth*0.9, backgroundColor: 'white', borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation:5 , marginBottom: 18 }}>
          <View style={{ flexDirection: 'row', borderTopLeftRadius:20,borderTopRightRadius:20,paddingVertical:20,alignItems: 'center', backgroundColor: 'white', padding:10, marginBottom:10, shadowColor: 'rgba(0, 0, 0,0.4)', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 10, elevation:10, }}>
            <View style={{ flex: 1,borderBottomWidth: 4, borderBottomColor: '#3B82F6', marginRight:18, marginTop:6 }}/>
              <Text style={{ fontSize:28, textAlign:"right",fontWeight: 'bold', color: '#3B82F6', marginRight:14 }}>العملاء</Text>
          </View>
          <View>
            <View style={{ flex: 1, marginBottom:14 , paddingHorizontal:10 , paddingVertical:8}}>
              <View style={{ backgroundColor: 'white', borderRadius: 30, shadowColor: 'rgba(0, 0, 0, 0.5)', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 10, elevation: 8, }}>
                  <ProgressBar data={100} total={100} IconLogo={PlusLogo} Date={"عملاء اليوم"} />
              </View>
            </View>
            <View style={{ flex: 1, marginBottom:14,paddingHorizontal:10, paddingVertical:8 }}>
              <View style={{ backgroundColor: 'white', borderRadius: 30, shadowColor: 'rgba(0, 0, 0, 0.5)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 5}}>
                  <ProgressBar data={70} total={100} IconLogo={PlusLogo} Date={"عملاء الأسبوع"} />
              </View>
            </View>
            <View style={{ flex: 1, marginBottom:14,paddingHorizontal:10,  paddingVertical:8 }}>
              <View style={{ backgroundColor: 'white', borderRadius: 30, shadowColor: 'rgba(0, 0, 0, 0.5)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 5}}>
                  <ProgressBar data={20} total={100} IconLogo={PlusLogo} Date={"عملاء الشهر"} />
              </View>
           </View>
          </View>

        </View>
      </View>
    </ScrollView>
  );
};

export default UsersScreen;
