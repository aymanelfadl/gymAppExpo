import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/Feather";

const MembersTable = ({ data, searchTerm, onEditUser , onOpenHistPayment}) => {
    
    const filteredData = data.filter((item) => {
        const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        const matches = fullName.includes(searchTermLower) || item.last_name.toLowerCase().includes(searchTermLower);
        return matches;
    });


    const renderItem = ({ item }) => (

        <View style={{ 
            flexDirection: 'row',  
            paddingVertical: "5%",
            paddingRight:"2%",
            shadowColor: '#000',
            marginVertical:"0.8%",
            backgroundColor: new Date(item.end_date) < new Date() ? "rgb(252 165 165)" : "white" ,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation:5 , 
            
        }}>
            <TouchableOpacity onPress={()=>onOpenHistPayment(item.id)} style={{ flex: 1 ,justifyContent: 'center', alignItems: 'center', paddingHorizontal:10 }}>
                <Image
                    source={ {uri: item.picture_file} }
                    style={{ width: 40, height: 40, borderRadius: 25 }}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>onOpenHistPayment(item.id)} style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color:"black",fontWeight: 'bold' }}>{item.first_name} {item.last_name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>onOpenHistPayment(item.id)} style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{color:"black", fontWeight:"bold"}}>{item.end_date}</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  style={{ borderRadius: 5}}
                  onPress={() => onEditUser(item)}
                >
                    <Icon name="edit" color="rgb(37 99 235)" size={24} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderHeader = () => (
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'lightgray' , backgroundColor:"rgb(219 234 254)" ,paddingVertical: "5%",}}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',borderColor:"gray", borderRightWidth:1 }}>
            </View>
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' ,borderColor:"gray", borderRightWidth:1 }}>
                <Text style={{ fontWeight: 'bold',color:"black" }}>الاسم الكامل</Text>
            </View>
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center',borderColor:"gray", borderRightWidth:1 }}>
                <Text style={{ fontWeight: 'bold' , color:"black"  }}>تاريخ إنتهاء التسجيل</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
        </View>
    );

    return (
        <View style={{flex:1, marginTop: 20 , maxHeight:"66%"}}>
            {filteredData.length === 0 ? (
                <Text style={{ color: 'gray',alignSelf:"center" }}>لا يوجد أعضاء حاليا</Text>
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

export default MembersTable;
