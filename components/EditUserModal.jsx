import { useState ,useEffect} from 'react';
import { PermissionsAndroid,View, Text, Modal, TouchableOpacity, Image, TextInput, } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from "react-native-vector-icons/AntDesign"
import DateTimePicker from '@react-native-community/datetimepicker';


const EditUserModal = ({ onClose, userData, onEditUser, onEndUser, visible, onReturnUser }) => {
  
  const [userEdit, setUserEdit] = useState(userData);
  const [newImage, setNewImage] = useState(null);
  const [showBirthDay, setShowBirthDay] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED ? 
        console.log('Camera, storage, and audio recording permissions granted') : console.log('One or more permissions denied');
    } catch (err) {
        console.warn(err);
    }
  };
  useEffect(() => {
    requestPermissions();
  }, []);


  const handleLaunchImageLibrary = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.error) {
        setNewImage({ uri: response.assets[0].uri });
        setUserEdit({...userEdit, picture_file: response.assets[0].uri })
      }
    });
  };

  const onChangeDateBirthDay = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate.toISOString().split('T')[0];
      setUserEdit({ ...userEdit, date_birth: currentDate });
    } else {
      setUserEdit({ ...userEdit, date_birth: userEdit.date_birth });
    }
    setShowBirthDay(false);
  };

  const onChangeDateEnd= (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate.toISOString().split('T')[0];
      setUserEdit({ ...userEdit, end_date: currentDate });
    } else {
      setUserEdit({ ...userEdit, end_date: userEdit.end_date });
    }
    setShowEndDate(false);
  };

  const showMode = () => {
    setShowBirthDay(!showBirthDay);
  }

  const showModeEnd = () =>{
    setShowEndDate(!showEndDate);
  }

  console.log(userEdit);
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: "white" , padding: 20, borderRadius: 10, width: '90%', alignItems: 'center' }}>
          <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
            <Icon name="close" color="black" size={20}/> 
          </TouchableOpacity>
          <View>
          <TouchableOpacity onPress={handleLaunchImageLibrary}>
            <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
              <Image source={{ uri: newImage ? newImage.uri : userEdit.picture_file }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            </View>
          </TouchableOpacity>
          </View>
      <View style={{backgroundColor:"white",paddingHorizontal:8, borderRadius:10, paddingVertical:10 ,elevation: 3}}>
          <View style={{flexDirection:"row-reverse",justifyContent:"space-between", width:"100%",alignItems:"center"}}>
            <Text style={{textAlign:"right", color:"rgb(37 99 235)", fontWeight:"bold" , fontSize:18}}>الاسم الكامل:</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: 'rgb(224 231 255)', borderRadius: 10, width: '60%', padding:8, marginBottom: 10, color: 'black' }}
              placeholder="الاسم الكامل"
              value={userEdit.first_name + " " + userEdit.last_name}
              onChangeText={(text) => {
                const spaceIndex = text.indexOf(" ");
                setUserEdit({
                  ...userEdit,
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
                      {userEdit.date_birth} 
                    </Text>
                  <View style={{position:"absolute" , right:"5%",top:"50%", alignSelf:"center"}}>
                    <TouchableOpacity onPress={showMode}>
                      <Icon name="calendar" size={20} color="rgb(59 130 246)" />
                    </TouchableOpacity>
                  </View>
                  {showBirthDay && <DateTimePicker testID='dateTimePicker' value={new Date(userEdit.date_birth)} onChange={onChangeDateBirthDay} />}
              </View>
           </View> 
           <View style={{flexDirection:"row-reverse",justifyContent:"space-between", width:"100%",alignItems:"center"}}>
              <Text style={{textAlign:"right", color:"rgb(37 99 235)", fontWeight:"bold" , fontSize:18}}>رقم الهاتف:</Text>  
              <TextInput
                style={{ borderWidth: 1, borderColor: 'rgb(224 231 255)', borderRadius: 10, width: '60%', padding: 8, marginBottom: 10, color: 'black' }}
                placeholder="رقم الهاتف"
                value={userEdit.phone_number}
                onChangeText={(text) => setUserEdit({ ...userEdit, phone_number: text })}
              />
          </View>
          <View style={{flexDirection:"row-reverse",justifyContent:"space-between", width:"100%",alignItems:"center"}}>
            <Text style={{textAlign:"right", color:"rgb(37 99 235)", fontWeight:"bold" , fontSize:18}}>فاتورة جديدة:</Text>   
            <TextInput
              style={{ borderWidth: 1, borderColor: 'rgb(224 231 255)', borderRadius: 10, width: '60%', padding: 8, marginBottom: 10, color: 'black' }}
              placeholder="المبلغ المؤدى من الزبون"
              placeholderTextColor="rgb(23 37 84)"
              value={userEdit.subscription_amount}
              onChangeText={(text) => setUserEdit({ ...userEdit, subscription_amount: text })}
            />
          </View>
          <View style={{flexDirection:"row-reverse",justifyContent:"space-between", width:"100%",alignItems:"center"}}>
            <Text style={{textAlign:"right", color:"rgb(37 99 235)", fontWeight:"bold" , fontSize:18}}>انتهاء العضوية:</Text>   
            <View style={{width:"60%", paddingVertical:12}}>
                    <Text style={{ borderWidth: 1, borderColor: 'rgb(224 231 255)', borderRadius: 10, width: '100%', padding:10,color: 'black' }}>
                      {userEdit.end_date} 
                    </Text>
                  <View style={{position:"absolute" , right:"5%",top:"50%", alignSelf:"center"}}>
                    <TouchableOpacity onPress={showModeEnd}>
                      <Icon name="calendar" size={20} color="rgb(59 130 246)" />
                    </TouchableOpacity>
                  </View>
                  {showEndDate && <DateTimePicker testID='dateTimePicker' value={new Date(userEdit.end_date)} onChange={onChangeDateEnd} />}
              </View>
          </View>
          
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', padding: 10, marginTop: 10 }}>
            {userEdit.active === 1 ? (
              <TouchableOpacity onPress={() => onEndUser(userEdit)} style={{backgroundColor:"white", borderRadius: 100, borderColor: "red", borderWidth: 1, paddingHorizontal: 20, marginHorizontal: 20, padding: 10, elevation: 5 }}>
                <Text style={{ color: 'red', fontSize: 18 }}>انهاء العضوية</Text>
              </TouchableOpacity>
            ):(
              <TouchableOpacity onPress={() => onReturnUser(userEdit)} style={{backgroundColor:"white", borderRadius: 100, borderColor: "green", borderWidth: 1, paddingHorizontal: 20, marginHorizontal: 20, padding: 10, elevation: 5 }}>
                <Text style={{ color: 'green', fontSize: 18 }}>إرجاع العضوية</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => onEditUser(userEdit)} style={{ borderRadius: 100, paddingHorizontal: 25, marginHorizontal: 20, backgroundColor: "blue", padding: 10, elevation: 5 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>حفظ</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
 
  );
};

export default EditUserModal;
