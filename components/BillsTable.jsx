import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const BillsTable = ({ data, searchTerm, onDeleteBill }) => {

  const formatDate = (inputDate) => {
    const parts = inputDate.split(' ');

    const dateParts = parts[0].split('-');

    const formattedDate = dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];

    return formattedDate;
  };

  const filteredData = data.filter((item) => item.full_name.toLowerCase().includes(searchTerm.toLowerCase()));


  const renderHeader = () => (
    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'lightgray' , backgroundColor:"rgb(219 234 254)" ,paddingVertical: "5%",marginTop:"2%"}}>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center',borderColor:"gray", borderRightWidth:1 }}>
           <Text style={{color:"black"}} >الاسم الكامل</Text>
        </View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' ,borderColor:"gray", borderRightWidth:1 }}>
            <Text style={{ fontWeight: 'bold',color:"black" }}>المبلغ المسدد</Text>
        </View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center',borderColor:"gray", borderRightWidth:1 }}>
            <Text style={{ fontWeight: 'bold' , color:"black"  }}>تاريخ الدفع</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
    </View>
);
  const renderItem = ({ item }) => (

    <View style={{ 
        flexDirection: 'row',  
        paddingVertical: "5%",
        shadowColor: '#000',
        marginVertical:"0.8%",
        backgroundColor: new Date(item.end_date) < new Date() ? "rgb(252 165 165)" : "white" ,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation:5 , 
        
    }}>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color:"black",fontWeight: 'bold' }}>{item.full_name}</Text>
        </View>
        <View onPress={()=>onOpenHistPayment(item.id)} style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color:"black", fontWeight:"bold"}}>{item.paid_price}</Text>
        </View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color:"black",fontWeight: 'bold' }}>{formatDate(item.created_at)}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ borderRadius: 5}}
              onPress={() => onDeleteBill(item)}
            >
                <Icon name="delete-empty-outline" color="rgb(220 38 38)" size={30} />
            </TouchableOpacity>
        </View>
    </View>
);

  return (
    <View>
      {filteredData.length === 0 ? (
        <Text style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>لا يوجد أعضاء حاليا</Text>
      ) : (
        <View>
            {renderHeader()}
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
        </View>
      )}
    </View>
  );
};

export default BillsTable;
