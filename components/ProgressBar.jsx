import React from 'react';
import { View, Text, Image , Dimensions} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

const ProgressBar = ({ data, total, Date, IconLogo, MiniLogo, hasRedBorder }) => {
    const calculateColor = (percentage) => {
        if (percentage >= 75) {
            return "#34D399"; 
        } else if (percentage >= 50) {
            return "#10B981";
        } else if (percentage >= 25) {
            return "#FBBF24"; 
        } else {
            return "#EF4444"; 
        }
    };

    const percentage = Math.round((data / total) * 100);
    const containerStyle = {
        borderRadius: 100,
        backgroundColor:"rgb(241 245 249)", 
    };

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    return (
        <View style={{ flexDirection: 'row', paddingLeft: 15, paddingBottom: 12, paddingRight: 10, width: "100%", height: windowHeight*0.1, borderRadius: 50, shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.1, shadowRadius: 20, marginTop: 16 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',height:40, alignItems: 'center' }}>
                    {!MiniLogo&&(<View style={{flexDirection:"row"}}>
                        <Text style={{color:"black", marginRight:8}}>{data}</Text>
                        <Icon name="user-alt" color="black" size={16} />
                    </View>)}
                    {MiniLogo && (
                        <View style={{flexDirection:"row"}}>
                            <Text style={{color:"black",marginLeft:20, marginRight:10, marginTop:8, fontWeight:"bold"}}>{data}</Text>
                            <Image source={MiniLogo} style={{width: 25, height: 25}} />
                        </View>
                    )}

                    <Text style={{ marginRight: 10, fontSize: 18, fontWeight: 'bold', textAlign: 'right',color:"black" }}>{Date}</Text>
                
                </View>
    
                <View style={[containerStyle, {height: 10,alignSelf:"center", alignItems:"flex-end", width: '90%',  }]}>
                    <View style={{ flex: 1, height: '100%', backgroundColor: 'rgb(239 246 255)', borderRadius: 100, }}>
                        <View style={[containerStyle, { height: '100%', flexDirection:"row-reverse", width: `${percentage}%` }]}>
                            <View style={{ flex: 1, height: '100%', backgroundColor: hasRedBorder ? "red" : calculateColor(percentage), borderRadius: 100,}} />
                        </View>
                    </View>
                </View>

                
            </View>
            {IconLogo &&
                <View style={{ width: 60, height: 60, borderRadius: 30, justifyContent:"center", alignItems: "center", backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.1, shadowRadius: 10 }}>
                    <Image source={IconLogo} style={{ width: '70%', height: '70%', resizeMode: 'contain' }} />
                </View>
            }
        </View>
    );
};

export default ProgressBar;
