import React from "react";
import { TextInput, View, StyleSheet, StatusBar, Button, SafeAreaView, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';

const NewPostScreen = ({ navigation, route }) => {
    const user = route.params.user

    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    title="发布"
                    onPress={() => {
                        if (title.trim().length == 0) {
                            Alert.alert(
                                "",
                                "标题不能为空",
                                [
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ]
                            );
                        } else {
                            const url = process.env.REACT_APP_SERVER + "forum/new"
                            fetch(url, {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    user_id: user,
                                    title: title,
                                    content: content
                                })
                            }).then(response => response.json()).then(post => {
                                navigation.dispatch(StackActions.replace('Post', { user: user, post: post }))
                            })
                        }
                    }}
                />
            ),
        });
    }, [navigation, title, content]);

    return <SafeAreaView>
        <TextInput
            style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1
            }}
            onChangeText={(text) => setTitle(text.trimStart())}
            value={title}
            placeholder="标题（必填）"
        />
        <TextInput
            style={{
                height: 400,
                borderColor: 'gray',
                borderWidth: 1
            }}
            onChangeText={(text) => setContent(text.trimStart())}
            value={content}
            placeholder="正文"
        />

    </SafeAreaView>
}

const styles = StyleSheet.create({
})

export default NewPostScreen