import SignInScreen from "./Screens/SignIn"
import SignUpScreen from "./Screens/SignUp"
import HomeScreen from "./Screens/Home"
import PostScreen from "./Screens/Post"
import NewPostScreen from "./Screens/NewPost"
import NewReplyScreen from "./Screens/NewReply"
import React from "react"
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const AuthContext = React.createContext()

const Stack = createStackNavigator()

function App() {
    const [signedIn, setSignedIn] = React.useState(false)
    const [user, setUser] = React.useState('')

    return (
        <AuthContext.Provider
            value={{
                setSign: setSignedIn,
                setUser: setUser
            }}
        >
            <NavigationContainer>
                <Stack.Navigator>
                    {
                        signedIn ? (
                            <>
                                <Stack.Screen name="Home" component={HomeScreen} options={{ title: '' }} initialParams={{ user: user }}/>
                                <Stack.Screen name="Post" component={PostScreen} options={{ title: '' }} />
                                <Stack.Screen name="NewPost" component={NewPostScreen} options={{ title: '' }} />
                                <Stack.Screen name="NewReply" component={NewReplyScreen} options={{ title: '' }} />
                            </>
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
