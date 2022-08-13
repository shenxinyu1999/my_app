import React from "react"
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, TextInput, Button, SafeAreaView, Alert } from 'react-native'
import { AuthContext } from "../App.js"

const SignUpScreen = ({ navigation, route }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return <AuthContext.Consumer>
        {
            value => {
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
                        title="Sign Up"
                        onPress={() => {
                            fetch(process.env.REACT_APP_SERVER + 'login/register', {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    name: username,
                                    password: password,
                                })
                            }).then((response) => {
                                if (response.status == 200) {
                                    value.setUser(result)
                                    value.setSign(true)
                                } else {
                                    Alert.alert(
                                        "",
                                        "用户名已存在",
                                        [
                                            { text: "OK", onPress: () => console.log("OK Pressed") }
                                        ]
                                    );
                                }
                            })
                        }}
                    />
                </SafeAreaView>
            }
        }
    </AuthContext.Consumer>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default SignUpScreen