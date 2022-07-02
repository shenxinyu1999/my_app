import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import SignInScreen from "./Screens/SignIn";
import SignUpScreen from "./Screens/SignUp";
import HomeScreen from "./Screens/Home"

const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({ 'Sign In': SignInScreen, 'Sign Up': SignUpScreen });

export default createAppContainer(
    createSwitchNavigator(
        {
            App: AppStack,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'Auth',
        }
    )
);
