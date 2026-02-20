import { Image } from 'expo-image';
import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

 type HeadingProps = {
    text?: ReactNode,
    onAboutPress?: ()=>void
}

const HeaderComponent = ({onAboutPress, text}:HeadingProps) => {


  return (
    <View style={styles.header}>

        <Image style={styles.imgStyle} source={require('../assets/images/kidneys.png')}></Image>

        <View>
            <Text style={styles.headerTxt}>YHealth</Text>
            <Text style={styles.headerTxtSml}>Check your kidney health</Text>
        </View>

        <View style={styles.info}>
            {onAboutPress && ( 
            <Pressable onPress={(onAboutPress)}>
                {text}
            </Pressable>
        )}
        </View>
    </View>
  )
}

export default HeaderComponent

const styles = StyleSheet.create({
    header: {
        height: 130,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingLeft: 10,
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        elevation: 5  ,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    imgStyle: {
        width: 80,
        height: 80,
        marginRight: 20,
        marginTop: 20
    },
    headerTxt: {
        fontSize: 30,
        marginTop: 30
    },
    headerTxtSml: {
        fontSize: 15,
        color: '#3FA1E8'
    },
    info: {
        paddingTop: 40,
        paddingLeft: 60
    }
})