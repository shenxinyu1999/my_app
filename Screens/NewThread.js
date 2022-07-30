import React from "react";
import { TextInput, View, StyleSheet, StatusBar, Button, SafeAreaView, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';

const NewThreadScreen = ({ navigation, route }) => {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    title="发布"
                    onPress={() => {
                        console.log(title)
                        console.log(title.trim())
                        if (title.trim().length == 0) {
                            Alert.alert(
                                "",
                                "标题不能为空",
                                [
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ]
                            );
                        } else {
                            const url = "https://fisher-shen-forum-test.herokuapp.com/forum/new"
                            const response = fetch(url, {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    title: title
                                })
                            }).then(response => response.json()).then(response => {
                                const thread = {
                                    _id: response,
                                    title: title,
                                }
                                navigation.dispatch(StackActions.replace('Post', {thread: thread}))
                            })
                        }
                    }}
                />
            ),
        });
    }, [navigation, title]);

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

export default NewThreadScreen