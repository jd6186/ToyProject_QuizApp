import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { and } from 'react-native-reanimated';


export default function QuizScreen({ navigation, route }) {
    const { id, pw } = route.params;
    var name = '';
    const nameCheck = () => {
        if (id == "jd" && pw == "1234") {
            name = '정동욱'
        } else {
            name = 'default'
        };
    };
    nameCheck();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{name}의 Quiz Screen</Text>
            <Button
                title="Select Left" // 왼쪽 오른쪽 누굴 선택했는지 디비에 저장하기 ㅋㅋㅋㅋ

                onPress={() => navigation.navigate('Answer')}
            />
            <Button
                title="Select Right"
                onPress={() => navigation.navigate('Answer')}
            />
        </View>
    );
}