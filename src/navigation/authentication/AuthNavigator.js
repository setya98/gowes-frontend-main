import React, {useContext, useState, useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../../context/auth";
import AsynStorage from "@react-native-async-storage/async-storage"

// Stacks
import Login from "../../screens/authentication/Login";
import Register from "../../screens/authentication/Register";
import BottomTabNavigator from "../../navigation/home/bottomTabNavigator/BottomTabNavigator"
import jwtDecode from "jwt-decode";

const Auth = createStackNavigator()

export default function AuthNavigator() {
    const {user, logout} = useContext(AuthContext)
    const {users, setUsers} = useContext(AuthContext)
    const [isLogin, setLogin] = useState(null)

    async function loginCheck() {
        if (await AsynStorage.getItem('jwtToken')) {
          setLogin(await AsynStorage.getItem('jwtToken'));
          setUsers(jwtDecode(await AsynStorage.getItem('jwtToken')))
        } else {
          setLogin(null);
        }
      }
    
      useEffect(() => {
        loginCheck();
        return () => {
        };
      }, [isLogin, user, logout, users]);

  return (
      <Auth.Navigator
      screenOptions={{
          gestureEnabled: false
      }}
      >
        <Auth.Screen 
          name="Login"
          component={Login}
          options={{
            title: "",
            headerShown: false
          }}
        />
        <Auth.Screen 
          name="Register"
          component={Register}
          options={{
            title: "",
            headerShown: false
          }}
        />
        <Auth.Screen 
          name="HomeTabNavigator"
          component={BottomTabNavigator}
          options={{
            title: "",
            headerShown: false
          }}
        />
      </Auth.Navigator>
  );
}

