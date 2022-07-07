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
            onChangeText={(text) => setUsername(text.replace(/[^A-Za-z0-9]/g, ''))}
            value={username}
            placeholder="Username"
        />
        <TextInput
            style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1
            }}
            onChangeText={(text) => setPassword(text.replace(/[^A-Za-z0-9]/g, ''))}
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
                        password: password,
                        new: false
                    })
                }).then((response) => {
                    if (response.status == 200) {
                        navigation.navigate('Home')
                    } else {
                        response.text().then((text) => {
                            console.log(text)
                        })
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