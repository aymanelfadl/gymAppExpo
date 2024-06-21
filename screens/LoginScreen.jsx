import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FitFlexLogo from "../assets/Fitflex-HD.png";
import { useNavigation } from "@react-navigation/native";
import { setUser, getLink } from "./GlobalState";

const LoginScreen = ({isLogin}) => {
  const navigation = useNavigation();


  const [email, setEmail] = useState("");
  const [serverLink, setServerLink] = useState("");

  const [password, setPassword] = useState("");
  const [errMessages, setErrMessages] = useState("");

const saveAccessToken = async (token) => {
  try {
    await AsyncStorage.setItem('accessToken', token);
    console.log('Token saved successfully' + token);
  } catch (error) {
    console.error('Failed to save the token:', error);
  }
};


  useEffect(() => {
    const link = getLink();
    setServerLink(link);
    console.log("Server link initialized: ", link);
  }, []);


  useEffect(() => {
    if (isLogin) {
      navigation.navigate("HomeScreen");
    
    }
  }, [isLogin]); 

  // Handle forget password
  const handleForgetPassword = () => {
    console.log("forget password");
  };

  // Handle login backend
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        serverLink + "api/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Check for success response
      if (response.status === 200) {
        const data = response.data;
  
        // Login successful
        console.log("Login successful");
        saveAccessToken(data.data.access_token.token);
  
        await setUser(data.data.user);
        navigation.navigate("HomeScreen");
  
        // Uncomment the following line if you have AsyncStorage set up
        // await AsyncStorage.setItem('accessToken', data.data.access_token.token);
      } else {
        // Handle non-200 responses
        console.log("Login failed with status:", response.status);
        setErrMessages(data.message || "Login failed");
      }
    } catch (error) {
      // Handle error response
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error response", error.response);
        setErrMessages(error.response.data.message || "Login failed");
      } else if (error.request) {
        // No response was received
        console.error("Error request", error.request);
        setErrMessages("No response from server. " + serverLink);
      } else {
        // Other errors
        console.error("Error", error.message);
        setErrMessages("An unexpected error occurred: " + error.message);
      }
    }
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "rgb(191 219 254)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
            backgroundColor: "white",
            height: "30%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={FitFlexLogo}
            style={{
              width: "80%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          <View
            style={{
              backgroundColor: "rgb(191 219 254)",
              height: "100%",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 34,
                fontWeight: "900",
                marginBottom: "5%",
              }}
            >
               hhqتسجيل الدخول
            </Text>
            <View
              style={{
                shadowColor: "black",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderRadius: 100,
                width: "80%",
                alignSelf: "center",
                marginVertical: 20,
              }}
            >
              <TextInput
                style={{
                  textAlign: "right",
                  backgroundColor: "rgb(248 250 252)",
                  color: "black",
                  fontSize: 18,
                  borderRadius: 100,
                  paddingRight: 20,
                  paddingLeft: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
                placeholder="اسم المستخدم"
                placeholderTextColor="gray"
                onChangeText={setEmail}
                value={email}
              />
            </View>

            <View
              style={{
                shadowColor: "black",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderRadius: 100,
                width: "80%",
                alignSelf: "center",
                marginVertical: 20,
              }}
            >
              <TextInput
                style={{
                  textAlign: "right",
                  backgroundColor: " rgb(248 250 252)",
                  color: "black",
                  fontSize: 18,
                  borderRadius: 100,
                  paddingRight: 20,
                  paddingLeft: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
                placeholder="كلمة المرور"
                placeholderTextColor="gray"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
              />
            </View>

            <TouchableOpacity onPress={handleForgetPassword}>
              <Text
                style={{
                  fontSize: 14,
                  color: "white",
                  textAlign: "right",
                  marginRight: "20%",
                }}
              >
                نسيت كلمة المرور ؟
              </Text>
            </TouchableOpacity>

            <View>
              <TouchableOpacity
                style={{
                  shadowColor: "black",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  alignSelf: "center",
                  backgroundColor: "rgb(248 250 252)",
                  borderRadius: 100,
                  width: "50%",
                  marginVertical: "10%",
                  padding: 6,
                }}
                onPress={handleLogin}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    color: "gray",
                    fontSize: 26,
                    fontWeight: "light",
                  }}
                >
                  {" "}
                  تسجيل
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "red",
                  fontSize: 24,
                  fontWeight: "700",
                }}
              >
                {errMessages}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "white",
                width: "80%",
                alignSelf: "center",
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
