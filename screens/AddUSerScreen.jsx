import { useState } from "react";
import { launchImageLibrary } from 'react-native-image-picker';
import { Text, View, Dimensions, Image, TextInput, TouchableOpacity, ScrollView} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign"
import AddUserLogo from "../assets/adduserwhite.png";
import UserInfoLogo from "../assets/userinfo.png"

const AddUserScreen = () => {

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    
    const [newUser, setNewUser] = useState({
        picture_file:"",
        first_name: "",
        last_name:"",
        date_birth:"",
        phone_number:"",
        subscription_amount:"",
        end_date:"",
    });
    const [useImage , setUserImage] = useState(null);  
    const [showBirthDay, setShowBirthDay] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);

    const handleLaunchImageLibrary = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
          if (!response.didCancel && !response.error) {
            setUserImage(response.assets[0].uri)
            setNewUser({...newUser, picture_file: response.assets[0].uri })
          }
        });
      };

      const onChangeDateBirthDay = (event, selectedDate) => {
        const currentDate = selectedDate.toISOString().split('T')[0];
        setNewUser({ ...newUser, date_birth: currentDate });
        setShowBirthDay(false);
      };
    
      const onChangeDateEnd= (event, selectedDate) => {
        const currentDate = selectedDate.toISOString().split('T')[0];
        setNewUser({ ...newUser, end_date: currentDate });
        setShowEndDate(false);
      };
    
      const showMode = () => {
        setShowBirthDay(true); 
      };
      
      const showModeEnd = () =>{
        setShowEndDate(true); 
      };
      

      const saveNewUSer = (newUser) =>{
        // TODO ilyass,
      }


    return(
        <SafeAreaProvider>

            <ScrollView>
                <View style={{flex:1, flexDirection:"column" ,}}>
                    <View style={{
                        backgroundColor: "rgb(37 99 235)",
                        height: windowHeight * 0.08,
                        marginTop: "1%",
                        flexDirection: "row-reverse",
                        alignItems: "center"
                    }}>
                        <Image source={AddUserLogo} style={{ marginHorizontal: 18, width: 50, height: 50 }} />
                        <Text style={{
                            color: "white",
                            fontSize: 26,
                            fontWeight: "bold"
                        }}>إضافة عميل</Text>
                    </View>

                    <View style={{flex:1 , flexDirection:"column",}}>
                        
                        <View style={{flexDirection:"row-reverse",alignItems:"center" ,marginTop:"4%", justifyContent:"center"}}>
                            <View style={{borderColor:"blue" ,marginLeft:"5%",borderWidth:4, width:windowWidth*0.4 }}/>
                            <View style={{ flexDirection:"row-reverse",justifyContent:"center" ,alignItems:"center",width:windowWidth*0.5,}}>
                                <Image source={UserInfoLogo} style={{ width: 50, height: 50 }} />
                                <Text style={{color:"black" ,fontWeight:"bold", fontSize:18}}>المعلومات الشخصية</Text>
                            </View>
                            <View style={{borderColor:"blue"  ,marginRight:"5%", borderWidth:4 ,width:windowWidth*0.4 }}/>
                        </View>

                        <View style={{marginHorizontal:8, marginVertical:10 ,flexDirection:"row-reverse", backgroundColor: "white", justifyContent: "start", alignItems: "center", padding: 20, borderRadius: 10, elevation: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.1, shadowRadius: 3.84, }}>
                            <TouchableOpacity onPress={handleLaunchImageLibrary} style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                                <View>
                                    {useImage ? (
                                        <Image source={{ uri: newUser.picture_file }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                                    ) :
                                    (
                                        <Icon name="camera" color="black" size={30} />
                                    )
                                    }
                                </View>
                            </TouchableOpacity>
                            <View style={{marginHorizontal:20}}>
                                <Text style={{ color: "rgb(59 130 246)", fontWeight: "bold", fontSize: 20 }}>
                                الصورة الشخصية
                                </Text>
                            </View>
                        </View>

                        <View style={{marginHorizontal:8, marginBottom:10,flexDirection:"row-reverse", backgroundColor: "white", justifyContent: "start", alignItems: "center", padding: 20, borderRadius: 10, elevation: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.1, shadowRadius: 3.84, }}>
                            <View style={{backgroundColor:"white",paddingHorizontal:8, borderRadius:10, paddingVertical:10}}>
                                <View style={{flexDirection:"row-reverse",justifyContent:"space-between", width:"100%",alignItems:"center"}}>
                                    <Text style={{textAlign:"right", color:"rgb(37 99 235)", fontWeight:"bold" , fontSize:18}}>الاسم الكامل:</Text>
                                    <TextInput
                                    style={{ borderWidth: 1, borderColor: 'rgb(224 231 255)', borderRadius: 10, width: '60%', padding:8, marginBottom: 10, color: 'black' }}
                                    placeholder="الاسم الكامل"
                                    placeholderTextColor="gray"
                                    onChangeText={(text) => {
                                        const spaceIndex = text.indexOf(" ");
                                        setNewUser({
                                        ...newUser,
                                        first_name: spaceIndex !== -1 ? text.substring(0, spaceIndex) : text,
                                        last_name: spaceIndex !== -1 ? text.substring(spaceIndex + 1) : "",
                                        });
                                    }}
                                    />
                                </View>

                                <View style={{flexDirection:"row-reverse",justifyContent:"space-between", width:"100%",alignItems:"center"}}>
                                    <Text style={{textAlign:"right", color:"rgb(37 99 235)", fontWeight:"bold" , fontSize:18}}>تاريخ الميلاد:</Text>
                                    <View style={{width:"60%", paddingVertical:12}}>
                                        <Text style={{ borderWidth: 1, borderColor: 'rgb(224 231 255)', borderRadius: 10, width: '100%', padding:10,color: 'black' }}>
                                            {newUser.date_birth} 
                                        </Text>
                                        <View style={{position:"absolute" , right:"5%",top:"50%", alignSelf:"center"}}>
                                            <TouchableOpacity onPress={showMode}>
                                                <Icon name="calendar" size={20} color="rgb(59 130 246)" />
                                            </TouchableOpacity>
                                        </View>
                                        {showBirthDay && <DateTimePicker testID='dateTimePicker' value={new Date()} onChange={onChangeDateBirthDay} />}
                                    </View>
                                </View>

                                <View style={{flexDirection:"row-reverse",justifyContent:"space-between", width:"100%",alignItems:"center"}}>
                                    <Text style={{textAlign:"right", color:"rgb(37 99 235)", fontWeight:"bold" , fontSize:18}}>رقم الهاتف:</Text>  
                                    <TextInput
                                        placeholderTextColor="gray"
                                        style={{ borderWidth: 1, borderColor: 'rgb(224 231 255)', borderRadius: 10, width: '60%', padding: 8, marginBottom: 10, color: 'black' }}
                                        placeholder="رقم الهاتف"
                                        value={newUser.phone_number}
                                        onChangeText={(text) => setNewUser({ ...newUser, phone_number: text })}
                                    />
                                </View>

                                <View style={{flexDirection:"row-reverse",justifyContent:"space-between", width:"100%",alignItems:"center"}}>
                                    <Text style={{textAlign:"right", color:"rgb(37 99 235)", fontWeight:"bold" , fontSize:18}}>فاتورة جديدة:</Text>   
                                    <TextInput
                                    style={{ borderWidth: 1, borderColor: 'rgb(224 231 255)', borderRadius: 10, width: '60%', padding: 8, marginBottom: 10, color: 'black' }}
                                    placeholder="المبلغ المؤدى من الزبون"
                                    placeholderTextColor="gray"
                                    value={newUser.subscription_amount}
                                    onChangeText={(text) => setNewUser({ ...newUser, subscription_amount: text })}
                                    />
                                </View>

                                <View style={{flexDirection:"row-reverse",justifyContent:"space-between", width:"100%",alignItems:"center"}}>
                                    <Text style={{textAlign:"right", color:"rgb(37 99 235)", fontWeight:"bold" , fontSize:18}}>انتهاء العضوية:</Text>   
                                    <View style={{width:"60%", paddingVertical:12}}>
                                        <Text style={{ borderWidth: 1, borderColor: 'rgb(224 231 255)', borderRadius: 10, width: '100%', padding:10,color: 'black' }}>
                                            {newUser.end_date} 
                                        </Text>
                                        <View style={{position:"absolute" , right:"5%",top:"50%", alignSelf:"center"}}>
                                            <TouchableOpacity onPress={showModeEnd}>
                                            <Icon name="calendar" size={20} color="rgb(59 130 246)" />
                                            </TouchableOpacity>
                                        </View>
                                        {showEndDate && <DateTimePicker testID='dateTimePicker' value={new Date()} onChange={onChangeDateEnd} />}
                                    </View>
                                </View>   
                            </View>
                        </View>

                        <View style={{ justifyContent: "center", alignItems: "center",marginBottom:10 }}>
                            <TouchableOpacity onPress={() => saveNewUSer(newUser)} style={{ width: windowWidth * 0.4, borderRadius: 100, paddingHorizontal: 25, marginHorizontal: 20, backgroundColor: "blue", padding: 10, elevation: 5 }}>
                                <Text style={{ color: 'white', fontSize: 18 ,alignSelf:"center"}}>حفظ</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{borderColor:"blue" ,borderWidth:4, width:windowWidth*1,marginTop:"2%" }}/>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
)}

export default AddUserScreen;
