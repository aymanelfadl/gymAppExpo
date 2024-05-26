import { useState } from "react";
import { Text, View, Dimensions, Image, TextInput, StyleSheet } from "react-native";
import MembersLogoWhite from "../assets/equipewhite.png";
import Icon from "react-native-vector-icons/AntDesign";
import MembersTable from "../components/MambersTable";
import { SelectCountry } from 'react-native-element-dropdown';
import EditUserModal from "../components/EditUserModal";
import HistPaymentModal from "../components/HistPaymentModal";
const MembersScreen = () => {
  
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    
    const [data, setData] = useState([
        {
          id: 1,
          first_name: "John",
          last_name: "Doe",
          date_birth: "1990-05-15",
          phone_number: "+1234567890",
          picture_file: "https://via.placeholder.com/640x480.png/009988?text=eius", 
          end_date: "2025-12-31",
          created_at: "2024-04-1T11:06:24.000Z", // Today
          updated_at: "2024-04-18T11:06:24.000Z",
          active: 1
        },
        {
          id: 2,
          first_name: "Alice",
          last_name: "Smith",
          date_birth: "1985-08-25",
          phone_number: "+1987654321",
          picture_file: "https://via.placeholder.com/640x480.png/009988?text=eius", 
          end_date: "2024-04-15",
          created_at: "2024-04-25T11:08:24.000Z", // Within one week
          updated_at: "2024-04-18T11:08:24.000Z",
          active: 1
        },
        {
          id: 3,
          first_name: "Emma",
          last_name: "Johnson",
          date_birth: "1993-02-10",
          phone_number: "+1122334455",
          end_date: "2024-08-29",
          picture_file: "https://via.placeholder.com/640x480.png/009988?text=eius", 
          created_at: "2024-03-01T11:08:24.000Z", // Within one month
          updated_at: "2024-04-18T11:08:24.000Z",
          active: 1
        },
        {
          id: 5,
          first_name: "Sophia",
          last_name: "Garcia",
          date_birth: "1991-07-20",
          phone_number: "+1231231234",
          end_date: "2023-05-10",
          picture_file: "https://via.placeholder.com/640x480.png/009988?text=eius", 
          created_at: "2023-04-01T11:08:24.000Z", // More than one month ago
          updated_at: "2024-04-18T11:08:24.000Z",
          active: 1
        },
        {
          id: 6,
          first_name: "Ethan",
          last_name: "Miller",
          date_birth: "1988-03-28",
          phone_number: "+9876543210",
          end_date: "2024-11-15",
          picture_file: "https://via.placeholder.com/640x480.png/009988?text=eius", 
          created_at: "2023-11-01T11:08:24.000Z", // More than one month ago
          updated_at: "2024-04-18T11:08:24.000Z",
          active: 1
        },
        {
          id: 7,
          first_name: "Olivia",
          last_name: "Brown",
          date_birth: "1995-12-10",
          phone_number: "+1122334455",
          end_date: "2024-07-02",
          picture_file: "https://via.placeholder.com/640x480.png/009988?text=eius", 
          created_at: "2022-03-10T11:08:24.000Z", // More than one month ago
          updated_at: "2024-04-18T11:08:24.000Z",
          active: 1
        },
        {
          id: 8,
          first_name: "Liam",
          last_name: "Taylor",
          date_birth: "1983-09-18",
          phone_number: "+9998887776",
          end_date: "2023-04-25",
          picture_file: "https://via.placeholder.com/640x480.png/009988?text=eius", 
          created_at: "2024-04-29T11:08:24.000Z", 
          updated_at: "2024-04-18T11:08:24.000Z",
          active: 0
        },
        {
          id: 9,
          first_name: "Ava",
          last_name: "Clark",
          date_birth: "1992-01-30",
          phone_number: "+4567891230",
          end_date: "2022-10-20",
          picture_file: "https://via.placeholder.com/640x480.png/009988?text=eius", 
          created_at: "2024-03-01T11:08:24.000Z", 
          updated_at: "2024-04-18T11:08:24.000Z",
          active: 0// 
        },
        {
          id: 10,
          first_name: "Noah",
          last_name: "Wilson",
          date_birth: "1987-06-12",
          phone_number: "+9876543210",
          end_date: "2025-08-20",
          picture_file: "https://via.placeholder.com/640x480.png/009988?text=eius", 
          created_at: "2024-04-25T11:08:24.000Z", 
          updated_at: "2024-04-18T11:08:24.000Z",
          active: 1
        }
      ]);
      const [paymentHistData, setPaymentHistData] = useState([
        {
          id: 1,
          id_user: 4,
          paid_price: "790.24",
          created_at: "2024-04-18T11:12:16.000000Z",
          updated_at: "2024-04-18T11:12:16.000000Z"
        },
        {
          id: 2,
          id_user: 4,
          paid_price: "405.86",
          created_at: "2024-04-18T11:12:16.000000Z",
          updated_at: "2024-04-18T11:12:16.000000Z"
        },
        {
          id: 3,
          id_user: 4,
          paid_price: "806.28",
          created_at: "2024-04-18T11:12:16.000000Z",
          updated_at: "2024-04-18T11:12:16.000000Z"
        }, {
          id: 4,
          id_user: 4,
          paid_price: "790.24",
          created_at: "2024-04-18T11:12:16.000000Z",
          updated_at: "2024-04-18T11:12:16.000000Z"
        },
        {
          id: 5,
          id_user: 4,
          paid_price: "405.86",
          created_at: "2024-04-18T11:12:16.000000Z",
          updated_at: "2024-04-18T11:12:16.000000Z"
        },
        {
          id: 6,
          id_user: 4,
          paid_price: "806.28",
          created_at: "2024-04-18T11:12:16.000000Z",
          updated_at: "2024-04-18T11:12:16.000000Z"
        },
        {
          id: 7,
          id_user: 4,
          paid_price: "790.24",
          created_at: "2024-04-18T11:12:16.000000Z",
          updated_at: "2024-04-18T11:12:16.000000Z"
        },
        {
          id: 8,
          id_user: 4,
          paid_price: "405.86",
          created_at: "2024-04-18T11:12:16.000000Z",
          updated_at: "2024-04-18T11:12:16.000000Z"
        },
        {
          id: 9,
          id_user: 4,
          paid_price: "806.28",
          created_at: "2024-04-18T11:12:16.000000Z",
          updated_at: "2024-04-18T11:12:16.000000Z"
        }, {
          id: 10,
          id_user: 4,
          paid_price: "790.24",
          created_at: "2024-04-18T11:12:16.000000Z",
          updated_at: "2024-04-18T11:12:16.000000Z"
        },
        {
          id: 90,
          id_user: 4,
          paid_price: "405.86",
          created_at: "2024-04-18T11:12:16.000000Z",
          updated_at: "2024-04-18T11:12:16.000000Z"
        }
    
      ]);
      
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOption, setFilterOption] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [showHistPayment , setShowHistPayment] = useState(false);


    const handleSelctedUser = (user) =>{
      setSelectedUser(user);
      setIsEditUserModalOpen(true);
    } 

    
    const handleUserEdit = (userEdit) =>{
      const index = data.findIndex((user) => user.id === selectedUser.id);
      if (index !== -1) {
        const newData = [...data];
        newData[index] = userEdit;
        setData(newData);
        setSelectedUser(null);
      }
    }
    
    const handleEndUser = () => {
      const index = data.findIndex((user) => user.id === selectedUser.id);
      if (index !== -1) {
        const newData = [...data];
        newData[index].active = 0;
        setData(newData);
        setSelectedUser(null);
      }
    };

    const handleReturnUser = () => {
      const index = data.findIndex((user) => user.id === selectedUser.id);
      if (index !== -1) {
        const newData = [...data];
        newData[index].active = 1;
        setData(newData);
        setSelectedUser(null);
      }
    };

    const handleUserEditClose = () =>{
      setSelectedUser(null);
      setIsEditUserModalOpen(false);
    }


    const handleHistPayment = (id) =>{
      console.log(id);
      setSelectedUser(data.at(id));
      setShowHistPayment(true);
    }


    const filterData = () => {
      let filteredData = [...data];
      
      switch (filterOption) {
          case "today":
            filteredData = filteredData.filter((user) => {
              const today = new Date().toISOString().split('T')[0];
              const userDate = user.created_at.split('T')[0];
              return user.active === 1 && userDate === today;
            });
            break;      
          case "one_week":
            filteredData = filteredData.filter((user) => {
              const today = new Date().toISOString().split('T')[0];
              const oneWeekLater = new Date(today);
              oneWeekLater.setDate(oneWeekLater.getDate() - 7);
              const finalDate = oneWeekLater.toISOString().split('T')[0];
              const userDate = user.created_at.split('T')[0]; 
              return user.active === 1 && finalDate <= userDate && userDate <= today; 
            });
          break;
          case "one_month":
            filteredData = filteredData.filter((user) => {
              const today = new Date().toISOString().split('T')[0]; 
              const oneMonthLater = new Date(today); 
              oneMonthLater.setMonth(oneMonthLater.getMonth() - 1); 
              const finaleDate = oneMonthLater.toISOString().split('T')[0]; 
              const userDate = user.created_at.split('T')[0];
              return user.active === 1 && finaleDate <= userDate && finaleDate <= today;
            });
            break;     
          case "need_to_pay":
            filteredData = filteredData.filter((user) => {
              const today = new Date().toISOString().split('T')[0];
              return user.active === 1 && user.end_date < today;
            });
            break;
          case "end_date":
            filteredData = filteredData.filter((user) => user.active === 0);
            break;
          default:
            filteredData = filteredData.filter((user) => user.active === 1);
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
                <Image source={MembersLogoWhite} style={{ marginHorizontal: 18, width: 50, height: 50 }} />
                <Text style={{
                    color: "white",
                    fontSize: 26,
                    fontWeight: "bold"
                }}>لائحة العملاء</Text>
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
                    { label: 'يحتاجون الدفع', value: 'need_to_pay' },
                    { label: 'انتهت العضوية', value: 'end_date' },                  
                  ]}
                  valueField="value"
                  labelField="label"
                  placeholder="حدد تاريخ"
                  searchPlaceholder="Search..."
                  onChange={(item) => setFilterOption(item.value)}
            />

            </View>
            
            <MembersTable 
              data={filterData()}
              searchTerm={searchTerm}
              onEditUser={handleSelctedUser}
              onOpenHistPayment={handleHistPayment}
            />

            {isEditUserModalOpen &&
              <EditUserModal
                visible={isEditUserModalOpen}
                userData={selectedUser}
                onEditUser={handleUserEdit}
                onEndUser={handleEndUser}
                onReturnUser={handleReturnUser}
                onClose={handleUserEditClose}/>
            }

            {showHistPayment && 
              <HistPaymentModal 
                userData={selectedUser}
                userHistPaymentData={paymentHistData}   
                onClose={()=>setShowHistPayment(false)}
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

export default MembersScreen;
