import { useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import FitFlexLogo from "../assets/Fitflex-HD.png";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = (onLogin) => {

  const navigation = useNavigation();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMessages, setErrMessages] = useState("");

  // password forgots
  const handleForgetPassword = () =>{
    console.log("forget password");
  }

  // login backend 

  const handleLogin = () =>{
    navigation.navigate("HomeScreen");
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ 
        flex: 1, 
        flexDirection: "column", 
        backgroundColor: "rgb(191 219 254)", 
        justifyContent: "center", 
        alignItems: "center" 
      }}>
        <View style={{ 
          borderTopLeftRadius: 0, 
          borderTopRightRadius: 0, 
          borderBottomLeftRadius: 100, 
          borderBottomRightRadius: 100, 
          backgroundColor: "white", 
          height: "30%", 
          width: "100%", 
          justifyContent: "center", 
          alignItems: "center" 
        }}>
          <Image 
            source={FitFlexLogo} 
            style={{ 
              width: "80%", 
              height: "100%", 
              resizeMode: "contain" 
            }} 
          />
        </View>

        <View style={{ 
          flex: 1, 
          width: "100%" 
        }}>
          <View style={{ 
            backgroundColor: "rgb(191 219 254)", 
            height: "100%", 
            flexDirection: "column", 
            justifyContent: "center" 
          }}>
            <Text style={{ 
              color: "white", 
              textAlign: "center", 
              fontSize: 34, 
              fontWeight: "900", 
              marginBottom: "5%" 
            }}>تسجيل الدخول</Text>
            <View style={{ 
              shadowColor: "black", 
              shadowOffset: { 
                width: 0, 
                height: 2 
              }, 
              shadowOpacity: 0.25, 
              shadowRadius: 3.84, 
              elevation: 5, 
              borderRadius: 100, 
              width: "80%", 
              alignSelf: "center", 
              marginVertical: 20 
            }}>
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
                onChangeText={setUserName}
                value={userName} 
              />
            </View>

            <View style={{ 
              shadowColor: "black", 
              shadowOffset: { 
                width: 0, 
                height: 2 
              }, 
              shadowOpacity: 0.25, 
              shadowRadius: 3.84, 
              elevation: 5, 
              borderRadius: 100, 
              width: "80%", 
              alignSelf: "center", 
              marginVertical: 20 
            }}>
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
                  paddingBottom: 10 
                }} 
                placeholder="كلمة المرور" 
                placeholderTextColor="gray"
                onChangeText={setPassword}
                value={password} 
              />
            </View>

            <TouchableOpacity onPress={handleForgetPassword}>
              <Text style={{ 
                fontSize: 14, 
                color: "white", 
                textAlign: "right", 
                marginRight: "20%" 
              }}>نسيت كلمة المرور ؟</Text>
            </TouchableOpacity>

            <View>
              <TouchableOpacity style={{ 
                  shadowColor: "black", 
                  shadowOffset: { 
                    width: 0, 
                    height: 2 
                  }, 
                  shadowOpacity: 0.25, 
                  shadowRadius: 3.84, 
                  elevation: 5, 
                  alignSelf: "center", 
                  backgroundColor: "rgb(248 250 252)", 
                  borderRadius: 100, 
                  width: "50%", 
                  marginVertical: "10%",
                  padding:6
                  }}
               onPress={handleLogin}
              >
                <Text style={{ 
                  alignSelf: "center", 
                  color: "gray", 
                  fontSize: 26, 
                  fontWeight: "light" 
                }}>تسجيل</Text>
              </TouchableOpacity>
            </View>
            <View style={{
              alignItems:"center"
            }}>
              <Text style={{
                color:"red",
                fontSize:24,
                fontWeight:"700",
              }}>
                {errMessages}
              </Text>
            </View>
            <View style={{ 
              borderBottomWidth: 1, 
              borderBottomColor: "white", 
              width: "80%", 
              alignSelf: "center" 
            }} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
