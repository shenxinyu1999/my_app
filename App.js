import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import SignInScreen from "./Screens/SignIn";
import SignUpScreen from "./Screens/SignUp";

const AppStack = createStackNavigator({ Home: SignUpScreen });
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
