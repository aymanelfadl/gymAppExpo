import { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import MembersLogoWhite from "../assets/equipewhite.png";
import Icon from "react-native-vector-icons/AntDesign";
import MembersTable from "../components/MambersTable";
import { SelectCountry } from "react-native-element-dropdown";
import EditUserModal from "../components/EditUserModal";
import HistPaymentModal from "../components/HistPaymentModal";
import { getUser, getLink } from "./GlobalState"; // Adjust the path as necessary
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const MembersScreen = () => {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  const [serverLink, setServerLink] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
    const link = getLink();
    setServerLink(link);
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${serverLink}api/client/bygym/${user.id}`
      );
      setData(response.data.clients);
      console.log(response.data.clients);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user) {
        fetchData();
      }
    }, [user])
  );

  const disactivateClient = async () => {
    try {
      const response = await axios.post(
        `${serverLink}api/client/disactivate/${selectedUser.id}`
      );
      console.log("Client disactivated successfully!", response.data);
      handleEndUser();
    } catch (error) {
      console.error("An error occurred while disactivating the client:", error);
    }
  };
  const activateClient = async () => {
    try {
      const response = await axios.post(
        `${serverLink}api/client/activate/${selectedUser.id}`
      );
      console.log("Client sactivated successfully!", response.data);
      handleReturnUser();
    } catch (error) {
      console.error("An error occurred while disactivating the client:", error);
    }
  };

  const [data, setData] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [showHistPayment, setShowHistPayment] = useState(false);

  const getSearchText = (text) => {
    const nameParts = text.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";
    setSearchTerm(`${firstName} ${lastName}`);
  };

  const handleSelctedUser = (user) => {
    setSelectedUser(user);
    setIsEditUserModalOpen(true);
  };

  const handleUserEdit = (userEdit) => {
    const index = data.findIndex((user) => user.id === selectedUser.id);
    if (index !== -1) {
      const newData = [...data];
      newData[index] = userEdit;
      setData(newData);
      setSelectedUser(null);
      setIsEditUserModalOpen(false);
    }
  };

  const handleEndUser = () => {
    const index = data.findIndex((user) => user.id === selectedUser.id);
    if (index !== -1) {
      const newData = [...data];
      newData[index].active = 0;
      setData(newData);
      setSelectedUser(null);
      setIsEditUserModalOpen(false);
    }
  };

  const handleReturnUser = () => {
    const index = data.findIndex((user) => user.id === selectedUser.id);
    if (index !== -1) {
      const newData = [...data];
      newData[index].active = 1;
      setData(newData);
      setSelectedUser(null);
      setIsEditUserModalOpen(false);
    }
  };

  const handleUserEditClose = () => {
    setSelectedUser(null);
    setIsEditUserModalOpen(false);
  };

  const handleHistPayment = (user) => {
    setSelectedUser(user);
    setShowHistPayment(true);
  };

  const filterData = () => {
    let filteredData = [...data];

    switch (filterOption) {
      case "today":
        filteredData = filteredData.filter((user) => {
          const today = new Date().toISOString().split("T")[0];
          const userDate = user.created_at.split("T")[0];
          return user.active === 1 && userDate === today;
        });
        break;
      case "one_week":
        filteredData = filteredData.filter((user) => {
          const today = new Date().toISOString().split("T")[0];
          const oneWeekLater = new Date(today);
          oneWeekLater.setDate(oneWeekLater.getDate() - 7);
          const finalDate = oneWeekLater.toISOString().split("T")[0];
          const userDate = user.created_at.split("T")[0];
          return (
            user.active === 1 && finalDate <= userDate && userDate <= today
          );
        });
        break;
      case "one_month":
        filteredData = filteredData.filter((user) => {
          const today = new Date().toISOString().split("T")[0];
          const oneMonthLater = new Date(today);
          oneMonthLater.setMonth(oneMonthLater.getMonth() - 1);
          const finaleDate = oneMonthLater.toISOString().split("T")[0];
          const userDate = user.created_at.split("T")[0];
          return (
            user.active === 1 && finaleDate <= userDate && finaleDate <= today
          );
        });
        break;
      case "need_to_pay":
        filteredData = filteredData.filter((user) => {
          const today = new Date().toISOString().split("T")[0];
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
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View
        style={{
          backgroundColor: "rgb(37 99 235)",
          height: windowHeight * 0.08,
          marginTop: "1%",
          flexDirection: "row-reverse",
          alignItems: "center",
        }}
      >
        <Image
          source={MembersLogoWhite}
          style={{ marginHorizontal: 18, width: 50, height: 50 }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 26,
            fontWeight: "bold",
          }}
        >
          لائحة العملاء
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row-reverse",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
            maxWidth: "100%",
            marginTop: "2%",
            width: "60%",
          }}
        >
          <View
            style={{
              position: "absolute",
              right: "5%",
              zIndex: 100,
            }}
          >
            <Icon name="search1" size={20} color="rgb(148 163 184)" />
          </View>
          <TextInput
            placeholder="بحث..."
            onChangeText={(text) => setSearchTerm(text)}
            placeholderTextColor="rgb(148 163 184)"
            style={{
              flex: 1,
              height: 40,
              textAlign: "right",
              paddingRight: 40,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: "rgb(148 163 184)",
              backgroundColor: "white",
              color: "black",
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
            { label: "الجميع", value: "all" },
            { label: " هذا اليوم", value: "today" },
            { label: " هذا أسبوع", value: "one_week" },
            { label: " هذا شهر", value: "one_month" },
            { label: "يحتاجون الدفع", value: "need_to_pay" },
            { label: "انتهت العضوية", value: "end_date" },
          ]}
          valueField="value"
          labelField="label"
          placeholder="حدد تاريخ"
          searchPlaceholder="Search..."
          onChange={(item) => setFilterOption(item.value)}
        />
      </View>
      {data && (
        <MembersTable
          data={filterData()}
          searchTerm={searchTerm}
          onEditUser={handleSelctedUser}
          onOpenHistPayment={handleHistPayment}
        />
      )}

      {isEditUserModalOpen && (
        <EditUserModal
          visible={isEditUserModalOpen}
          userData={selectedUser}
          onEditUser={handleUserEdit}
          onEndUser={disactivateClient}
          onReturnUser={activateClient}
          id_user={user.id}
          onClose={handleUserEditClose}
          serverLink={serverLink}
        />
      )}

      {showHistPayment && (
        <HistPaymentModal
          userData={selectedUser}
          onClose={() => setShowHistPayment(false)}
          serverLink={serverLink}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 10,
    marginRight: 6,
    height: 40,
    width: "35%",
    backgroundColor: "white",
    borderRadius: 100,
    borderColor: "rgb(148 163 184)",
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "rgb(2 6 23)",
    marginVertical: 8,
  },
});

export default MembersScreen;
