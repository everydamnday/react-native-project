import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
//@react-navigation/bottom-tabs;
import PostTab from "../screen/post/index";
import ChatTab from "../screen/chat/index";
import UserTab from "../screen/user/index";
const Tabs = createBottomTabNavigator();

const RootTab = () => {
    return(
        <Tabs.Navigator>
            <Tabs.Screen name="Post" component={PostTab} />
            <Tabs.Screen name="Chat" component={ChatTab} />
            <Tabs.Screen name="User" component={UserTab} />
        </Tabs.Navigator>
    )
}

export default RootTab;