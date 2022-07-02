import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Button, SafeAreaView } from 'react-native';

const SignInScreen = ({ navigation, route }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <TextInput
            style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1
            }}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
        />
        <TextInput
            style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1
            }}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
        />
        <Button
            title="Login"
            onPress={() => {
                fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: username,
                        password: password
                    })
                }).then((response) => response.text()).then((text) => {
                    if (text == "fail") {

                    } else if (text == 'success') {
                        navigation.navigate('Home')
                    }
                })
            }}
        />
        <Button
            title="Sign Up"
            onPress={() =>
                navigation.navigate('Sign Up')
            }
        />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default SignInScreen