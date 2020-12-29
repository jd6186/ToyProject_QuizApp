import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import axios from 'axios';

async function dataAxios() {
    try {
        const response = await axios.get("http://10.0.2.2:8000/quizapp/home/");
        const crawlingData = response.data;
        return crawlingData;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export default async function HomeScreen({ navigation }) {
    const data = await dataAxios();
    console.log("데이터 수신대기");
    console.log(data);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Quiz"
                onPress={() => navigation.navigate('Quiz', {id: 'jd', pw: '1234'})}
            />
        </View>
    );
}