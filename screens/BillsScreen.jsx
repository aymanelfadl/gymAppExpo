import { useState, useEffect } from 'react';
import { Text, View, Dimensions, Image, TextInput, StyleSheet } from "react-native";
import BillLogo from "../assets/billwhite.png";
import Icon from "react-native-vector-icons/AntDesign";
import { SelectCountry } from 'react-native-element-dropdown';
import BillsTable from "../components/BillsTable";
import DeleteBillModal from "../components/DeleteBillModal";
import { getUser, getLink } from './GlobalState'; // Adjust the path as necessary
import axios from 'axios';

const BillsScreen = ()=>{

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const[serverLink, setServerLink] =useState('');
    const [user, setUser] = useState(null);
    

    const [data, setData] = useState([ {
        id: "7",
        full_name: "Samantha Miller",
        paid_price: 200.50,
        id_user: "1007",
        created_at: "2024-01-03 11:25:00"
      },
      {
        id: "8",
        full_name: "James Anderson",
        paid_price: 95.75,
        id_user: "1008",
        created_at: "2024-04-4 11:30:00"
      },  ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOption, setFilterOption] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const fetchData = async () => {
      try {
          const response = await axios.get(`${serverLink}api/payment/gym/${user.id}`);
          console.log(response.data.payments);
          setData(response.data.payments)

    
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };
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


    const handleSelecteBill =(item) =>{
        console.log(item);
        setSelectedUser(item);
    }
  
    const handleDeleteBill = () => {

        const newData = data.filter(user => user.id !== selectedUser.id);
        setData(newData);
        setSelectedUser(null);
    };
    const deletePayment = async () => {
      try {
        await axios.delete(`${serverLink}api/payment/${selectedUser.id}`);
        console.log(`Payment ${selectedUser.id} deleted successfully!`);
        handleDeleteBill();
      } catch (error) {
        console.error(`Error deleting payment ${selectedUser.id}:`, error);
      }
    };



    const filterData = () => {
        let filteredData = [...data];
        
        switch (filterOption) {
            case "today":
              filteredData = filteredData.filter((user) => {
                const today = new Date().toISOString().split('T')[0];
                const userDate = user.created_at.split(' ')[0];
                return user.active === 1 && userDate === today;
              });
              break;      
            case "one_week":
              filteredData = filteredData.filter((user) => {
                const today = new Date().toISOString().split('T')[0];
                const oneWeekLater = new Date(today);
                oneWeekLater.setDate(oneWeekLater.getDate() - 7);
                const finalDate = oneWeekLater.toISOString().split('T')[0];
                const userDate = user.created_at.split(' ')[0]; 
                return user.active === 1 && finalDate <= userDate && userDate <= today; 
              });
            break;
            case "one_month":
              filteredData = filteredData.filter((user) => {
                const today = new Date().toISOString().split('T')[0]; 
                const oneMonthLater = new Date(today); 
                oneMonthLater.setMonth(oneMonthLater.getMonth() - 1); 
                const finaleDate = oneMonthLater.toISOString().split('T')[0]; 
                const userDate = user.created_at.split(' ')[0];
                return user.active === 1 && finaleDate <= userDate && finaleDate <= today;
              });
              break;     
            default:
              break;
        }
  
        return filteredData;
    };
  
    return (
        <View style={{flex:1, flexDirection:"column" ,}}>
                <View style={{
                    backgroundColor: "rgb(37 99 235)",
                    height: windowHeight * 0.08,
                    marginTop: "1%",
                    flexDirection: "row-reverse",
                    alignItems: "center"
                }}>
                    <Image source={BillLogo} style={{ marginHorizontal: 18, width: 50, height: 50 }} />
                    <Text style={{
                        color: "white",
                        fontSize: 26,
                        fontWeight: "bold"
                    }}>سجل الفواتير</Text>
                </View>
    
                <View style={{
                    flexDirection: "row-reverse",
                    alignItems: "center",
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'relative',
                        maxWidth: '100%',
                        marginTop:"2%",
                        width: "60%"
                    }}>
                        <View style={{
                            position: "absolute",
                            right: "5%",
                            zIndex: 100,
                        }}>
                            <Icon name="search1" size={20} color="rgb(148 163 184)" />
                        </View>
                        <TextInput
                            placeholder="بحث..."
                            onChangeText={(text) => setSearchTerm(text)}
                            placeholderTextColor="rgb(148 163 184)"
                            style={{
                                flex: 1,
                                height: 40,
                                textAlign: 'right',
                                paddingRight: 40,
                                borderRadius: 100,
                                borderWidth: 1,
                                borderColor: "rgb(148 163 184)",
                                backgroundColor: 'white',
                                color: 'black',
                            }}
                        />
                    </View>
                    <SelectCountry
                      style={styles.dropdown}
                      selectedTextStyle={styles.selectedTextStyle}
                      placeholderStyle={styles.placeholderStyle}
                      imageStyle={styles.imageStyle}
                      iconStyle={styles.iconStyle}
                      maxHeight={200}
                      value={filterOption}
                      data={[
                        { label: 'الجميع', value: 'all' },
                        { label: ' هذا اليوم', value: 'today' },
                        { label: ' هذا أسبوع', value: 'one_week' },
                        { label: ' هذا شهر', value: 'one_month' },                
                      ]}
                      valueField="value"
                      labelField="label"
                      placeholder="حدد تاريخ"
                      searchPlaceholder="Search..."
                      onChange={(item) => setFilterOption(item.value)}
                />
                </View>

                <BillsTable
                    data={filterData()} 
                    searchTerm={searchTerm}
                    onDeleteBill={handleSelecteBill}
                />

                {selectedUser && 
                    <DeleteBillModal 
                        onClose={() => setSelectedUser(null)} 
                        onConf={deletePayment} 
                    />
                }

                
        </View>
    )
    }



const styles = StyleSheet.create({
    dropdown: {
      marginTop:10,
      marginRight:6,
      height: 40,
      width:"35%",
      backgroundColor: 'white',
      borderRadius: 100,
      borderColor:"rgb(148 163 184)",
      borderWidth:1,
      paddingHorizontal: 8,
    },
    selectedTextStyle: {
      fontSize: 14,
      color:"rgb(2 6 23)",
      marginVertical:8,
    },
  });



export default BillsScreen;