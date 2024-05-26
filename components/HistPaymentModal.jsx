import { Modal, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign"

const HistPaymentModal = ({ onClose, userHistPaymentData, userData }) => {

  function formatDate(inputDate) {
    var parts = inputDate.split('T');
    var dateParts = parts[0].split('-');
    var formattedDate = dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];
    return formattedDate; 
  }

  const renderHeader = () => (
    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'lightgray' , backgroundColor:"rgb(219 234 254)" ,paddingVertical: "5%",}}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',borderColor:"gray", borderRightWidth:1 }}>
        </View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' ,borderColor:"gray", borderRightWidth:1 }}>
            <Text style={{ fontWeight: 'bold',color:"black" }}>المبلغ المسدد</Text>
        </View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold' , color:"black"  }}>تاريخ الدفع</Text>
        </View>
    </View>
);
const renderItem = ({ item ,index }) => (
    <View style={{ 
        flexDirection: 'row',  
        paddingVertical: 10,
        marginBottom:4,
        backgroundColor: "white",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    }}>
        <View style={{ flex: 1 ,justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color:"black"}}>{ index + 1 }</Text>
        </View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color:"black",fontWeight: 'bold' }}>{item.paid_price} MAD</Text>
        </View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color:"black"}}>{formatDate(item.created_at)}</Text>
        </View>
    </View>
  );
  


  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: "white" , width:"90%", padding: 20, borderRadius: 10,}}>
            <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 10, right: 10 ,paddingBottom:8}}>
                <Icon name="close" color="black" size={20}/> 
            </TouchableOpacity>
            <View style={{justifyContent:"center", alignItems:"center" ,backgroundColor:"white",marginBottom:10,marginTop:20,padding:10,borderRadius:10 ,elevation: 4}}>
                <View>
                    <Image source={{ uri: userData.picture_file }} style={{ width:70, height:70 , borderRadius: 50}} />
                    <Text style={{color:"black", fontWeight:"bold",marginTop:10}}>{userData.first_name} {userData.last_name}</Text>
                </View>
            </View>
            {userHistPaymentData.length === 0 ? (
                <Text style={{ color: 'gray',alignSelf:"center" }}>لا توجد فواتير حاليا</Text>
            ) : (
                <View style={{backgroundColor:"white", elevation:6, padding:10, borderRadius:10}}>

                    {renderHeader()}
                    <FlatList
                        data={userHistPaymentData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}  
                        style={{ maxHeight: 300, overflowY: "auto" }} 
                    />
                </View>
            )}
        </View>
      </View>
    </Modal>
  );
};

export default HistPaymentModal;
