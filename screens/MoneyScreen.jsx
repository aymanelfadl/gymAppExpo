import { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View, Dimensions } from 'react-native';
import InComeLogo from '../assets/generous.png';
import CoinsLogo from '../assets/coin.png';
import ProgressBar from '../components/ProgressBar';
import DayLogo from "../assets/day.png";
import WeekLogo from "../assets/week.png";
import MonthLogo from "../assets/month.png"
import { getUser, getLink } from './GlobalState'; // Adjust the path as necessary
import axios from 'axios';

const MoneyScreen = () =>{
    const [totalIncome, setTotalIncome] = useState(0);
    const [Income, setIncome] = useState(0);
    const [user, setUser] = useState(null);
    const[serverLink, setServerLink] =useState('');




    useEffect(() => {
      setUser(getUser());
      const link = getLink();
      setServerLink(link);
  }, []);

  useEffect(() => {
    if (user) {
        
       
      fetchData();
    }
}, [user]);
const fetchData = async () => {
  console.log(`${serverLink}/api/dashboardNumbers/${user.id}`)

  try {
      const response = await axios.get(`${serverLink}api/dashboardNumbers/${user.id}`);
      setIncome(response.data.timeMoney);
      console.log(response.data.timeMoney);
      console.log(`${serverLink}/api/dashboardNumbers/${user.id}`)
  

  } catch (error) {
      console.error('Error fetching data:', error);
  }
};



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
              <Image style={{ height: 100, width: 100 }} source={InComeLogo} />
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <Text style={{ alignSelf: 'center', color: 'rgb(59 130 246)', fontSize: 24, fontWeight: 'bold', marginBottom:18 }}>
              الدخل الإجمالي 
              </Text>
              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Text style={{ color: 'black',marginRight:10,fontWeight:"bold" }}>{Income?Income.totalAmount:0}</Text>
                <Image source={CoinsLogo} style={{width: 25, height: 25}} />
              </View>
            </View>
          </View>
          <View style={{width: windowWidth*0.9, backgroundColor: 'white', borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation:5 , marginBottom: 18 }}>
            <View style={{ flexDirection: 'row', borderTopLeftRadius:20,borderTopRightRadius:20,paddingVertical:20,alignItems: 'center', backgroundColor: 'white', padding:10, marginBottom:10, shadowColor: 'rgba(0, 0, 0,0.4)', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 10, elevation:10, }}>
              <View style={{ flex: 1,borderBottomWidth: 4, borderBottomColor: '#3B82F6', marginRight:18, marginTop:6 }}/>
                <Text style={{ fontSize:28, textAlign:"right",fontWeight: 'bold', color: '#3B82F6', marginRight:14 }}>المداخيل</Text>
            </View>
            <View>
              <View style={{ flex: 1, marginBottom:14 , paddingHorizontal:10 , paddingVertical:8}}>
                <View style={{ backgroundColor: 'white', borderRadius: 30, shadowColor: 'rgba(0, 0, 0, 0.5)', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 10, elevation: 8, }}>
                    <ProgressBar data={Income?Income.dayAmount:0} total={Income?Income.weekAmount:0} IconLogo={DayLogo} Date={"هذا اليوم"} />
                </View>
              </View>
              <View style={{ flex: 1, marginBottom:14,paddingHorizontal:10, paddingVertical:8 }}>
                <View style={{ backgroundColor: 'white', borderRadius: 30, shadowColor: 'rgba(0, 0, 0, 0.5)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 5}}>
                    <ProgressBar data={Income?Income.weekAmount:0} total={Income?Income.monthAmount:0} IconLogo={WeekLogo} Date={"هذا الأسبوع"} />
                </View>
              </View>
              <View style={{ flex: 1, marginBottom:14,paddingHorizontal:10,  paddingVertical:8 }}>
                <View style={{ backgroundColor: 'white', borderRadius: 30, shadowColor: 'rgba(0, 0, 0, 0.5)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 5}}>
                    <ProgressBar data={Income?Income.monthAmount:0} total={Income?Income.totalAmount:0} IconLogo={MonthLogo} Date={"هذا الشهر"} />
                </View>
             </View>
            </View>
  
          </View>
        </View>
      </ScrollView>
    );
  };

export default MoneyScreen;