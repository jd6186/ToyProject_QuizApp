import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';


export default function QuizScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to BeforeQuiz"
                onPress={() => navigation.navigate('BeforeQuiz')}
            />
        </View>
    );
}