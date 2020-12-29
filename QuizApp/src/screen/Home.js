import React, { Component } from 'react';
import { Button, View, Text, Image } from 'react-native';
import axios from 'axios';
import { Container, Header, Footer, Content, FooterTab, Title, Form, Item, Input } from 'native-base';


class QuizInfo extends Component {
    render(){
        return (
            <View style={{ borderTopWidth: 3, borderTopColor: 'gray' }}>
                <Header style={{ alignItems: 'center', backgroundColor: '#f8f8f8' }}>
                    <Title style={{ color: 'black' }}>{this.props.dataList['title']}</Title>
                </Header>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ margin: 15 }}>
                        <Image
                            source= {{uri: this.props.dataList['first_image']}}
                            style= {{width: 100, height: 100, backgroundColor: 'red'}}
                        />
                        <Text> {this.props.dataList['first_name']} </Text>
                    </View>
                    <View style={{ margin: 15 }}>
                        <Image
                            source= {{uri: this.props.dataList['second_image']}}
                            style= {{width: 100, height: 100, backgroundColor: 'red'}}
                        />
                        <Text> {this.props.dataList['second_name']} </Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default class HomeScreen extends Component {
    state = {
        dataList: [{'기본정보': '정동욱'}],
        searchText: "bj",
        indexs: 0,
        subText: "여자"
    }
    dataAxios = () => {
        try {
            this.state.searchText = this.state.subText;
            const url = "http://10.0.2.2:8000/quizapp/home/" + this.state.searchText + '/' + this.state.indexs;
            console.log(url);
            const response = axios.get(url)
                .then(response => {
                    const { dataList } = this.state;
                    this.setState({
                        dataList: response.data
                        });
                });
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    subTextSetting(texts){
        console.log(texts.nativeEvent.text);
        this.state.subText = this.state.subText + texts.nativeEvent.text;
        console.log(this.state.subText);
    }
    // constructor(){} => 뷰의 creact와 동일 생성될 때 작동 => 여기서는 setState는 불가능하지만 this.state를 이용해 state를 초기화는 가능
    componentDidMount(){ // => Mount가 된 직후 작동 화면에 값이 뿌려지기 전이라 여기서 setState를 해주는 곳이다.
        this.dataAxios();
        this.state.subText = ""
    }
    render(){
        const { dataList } = this.state;
        const navigates = this.props.navigation.navigate;
        const mapToComponent = data => {
            return data.map((quiz, i) => {
                return (<QuizInfo dataList={quiz} key={i}/>);
            });
        };
        return (
            <Container>
                <Content>
                    <Form>
                        <Item last>
                            <Input 
                                placeholder="원하는 월드컵을 검색하세요" 
                                onTextInput={(text) => this.subTextSetting(text)}
                                value={this.state.subText}
                            />
                        </Item>
                        <Button
                            title="검색"
                            titleStyle={{
                                color: "white",
                                fontSize: 30,
                            }}
                            onPress={this.dataAxios}
                        />
                    </Form>
                    { mapToComponent(dataList) }
                </Content>
                <Footer>
                    <FooterTab>
                        <Button
                            onPress={this.dataAxios}
                            title='정보'
                        />
                        <Button
                            title="Go to Quiz"
                            onPress={() => navigates('Quiz', {id: 'jd', pw: '1234'})}
                        />
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}