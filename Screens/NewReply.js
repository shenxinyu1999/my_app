import React from "react";
import { TextInput, View, StyleSheet, StatusBar, Button, SafeAreaView, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';

const NewReplyScreen = ({ navigation, route }) => {
    const user = route.params.user
    const post = route.params.post

    const [content, setContent] = React.useState('');

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    title="发送"
                    onPress={() => {
                        if (content.trim().length == 0) {
                            Alert.alert(
                                "",
                                "内容不能为空",
                                [
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ]
                            );
                        } else {
                            const url = process.env.REACT_APP_SERVER + "forum/reply"
                            fetch(url, {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    user: user,
                                    post: post,
                                    content: content
                                })
                            }).then(response => navigation.dispatch(StackActions.pop()))
                        }
                    }}
                />
            ),
        });
    }, [navigation, content]);

    return <SafeAreaView>
        <TextInput
            style={{
                height: 400,
                borderColor: 'gray',
                borderWidth: 1
            }}
            onChangeText={(text) => setContent(text)}
            value={content}
            placeholder="内容"
        />
    </SafeAreaView>
}

const styles = StyleSheet.create({
})

export default NewReplyScreen