import { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/AntDesign"
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios'; // Import axios for making HTTP requests

const EditUserModal = ({ onClose, userData, onEditUser, onEndUser, visible, onReturnUser, serverLink }) => {

    const [userEdit, setUserEdit] = useState(userData);
    const [fullName, setFullName] = useState(userEdit.first_name);
    const [newImage, setNewImage] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [showBirthDay, setShowBirthDay] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [file, setFile] = useState(null); // State to store the image file
    const [fileisHere, setFileisHere] = useState(false); // State to store the image file


    useEffect(() => {
        requestPermissions(); // Request permissions when the component mounts
    }, []);

    // Function to request permissions for accessing the media library
    const requestPermissions = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access media library was denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    // Function to handle changes in the full name input
    const handleFullNameChange = (text) => {
        setFullName(text);
        setUserEdit(prevState => ({
            ...prevState,
            first_name: text,
        }));
    };

    // Function to handle image selection from the media library
    const handleLaunchImageLibrary = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
          console.log('Permission to access media library is required!');
          return;
      }
  
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
      });
      if (!result.cancelled) {
          const uri = result.assets[0].uri;
          const fileType = uri.split('.').pop(); // Extract file type from URI
          console.log('Selected image URI:', uri);
          console.log('File type:', fileType);
          setFileType(fileType);
          setFile({
              uri: uri,
              type: `image/${fileType}`,
              name: `${userEdit.first_name}.${fileType}`,
          });
          setFileisHere(true);
          setNewImage({ uri });
          setUserEdit({ ...userEdit, picture_file: uri });
      }
  };
  
    // Function to handle the date of birth selection
    const onChangeDateBirthDay = (event, selectedDate) => {
        if (selectedDate) {
            const currentDate = selectedDate.toISOString().split('T')[0];
            setUserEdit({ ...userEdit, date_birth: currentDate });
        }
        setShowBirthDay(false);
    };

    // Function to handle the end date selection
    const onChangeDateEnd = (event, selectedDate) => {
        if (selectedDate) {
            const currentDate = selectedDate.toISOString().split('T')[0];
            setUserEdit({ ...userEdit, end_date: currentDate });
        } 
        setShowEndDate(false);
    };

    // Function to toggle the visibility of the date picker for the date of birth
    const showMode = () => {
        setShowBirthDay(!showBirthDay);
    };

    // Function to toggle the visibility of the date picker for the end date
    const showModeEnd = () => {
        setShowEndDate(!showEndDate);
    };

    // Function to handle the modification of user data
    const modifyUser = async () => {
        try {

            const formData = new FormData();

            formData.append('first_name', userEdit.first_name);

            // Append the file with appropriate parameters
            if (fileisHere) {

                formData.append('picture_file', {
                    uri: file.uri,
                    name: `${userEdit.first_name}.${fileType}`,
                    type: `image/${fileType}`,
                });
            }
            console.log(fileisHere + "wtf is hapening");

            formData.append('date_birth', userEdit.date_birth);
            formData.append('phone_number', userEdit.phone_number);
            formData.append('end_date', userEdit.end_date);

            const response = await axios.post(`${serverLink}api/client/${userData.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Upload success', response.data);
            onEditUser(userEdit);
            // You may want to perform additional actions upon successful upload

        } catch (error) {
            console.error('Upload error', error);
            // Handle upload error
        }
    };


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
              value={fullName}
              onChangeText={handleFullNameChange}
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
            <TouchableOpacity onPress={() =>modifyUser() } style={{ borderRadius: 100, paddingHorizontal: 25, marginHorizontal: 20, backgroundColor: "blue", padding: 10, elevation: 5 }}>
              <Text style={{ color: 'white', fontSize: 18 }}>حفظ</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
 
  );
};

export default EditUserModal;
