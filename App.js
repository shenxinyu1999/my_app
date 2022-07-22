import SignInScreen from "./Screens/SignIn";
import SignUpScreen from "./Screens/SignUp";
import HomeScreen from "./Screens/Home"
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AuthContext = React.createContext();

const Stack = createStackNavigator();

function App() {
    const [signedIn, setSignedIn] = React.useState(false);

    return (
        <AuthContext.Provider value={setSignedIn}>
            <NavigationContainer>
                <Stack.Navigator>
                    {
                        signedIn ? (
                            <Stack.Screen name="Home" component={HomeScreen} />
                        ) : (
                            <>
                                <Stack.Screen name="Sign In" component={SignInScreen} />
                                <Stack.Screen name="Sign Up" component={SignUpScreen} />
                            </>
                        )
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

export { AuthContext }
export default App
