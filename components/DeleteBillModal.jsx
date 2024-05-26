import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign"
import deleteLogo from '../assets/delete.png';

const DeleteBillModal = ({ onClose, onConf }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 20,
          width: windowWidth * 0.8,
          maxWidth: 400, 
        }}>
          <View style={{ alignItems: 'flex-end'}} >
            <TouchableOpacity onPress={onClose}  style={{backgroundColor:"red" , borderRadius:50, padding:4, elevation:8}}>
                <Icon name="close" color="white" size={18}/> 
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical:28 }}>
            <Image source={deleteLogo} style={{ width: 50, height: 50 }} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginLeft: 10,maxWidth:200 }}>هل أنت متأكد من حذف هذه الفاتورة؟</Text>
          </View>
          <View style={{borderColor}}/>
          <TouchableOpacity
            style={{ alignSelf: "center", backgroundColor: 'red', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 }}
            onPress={onConf}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>تأكيد</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteBillModal;
