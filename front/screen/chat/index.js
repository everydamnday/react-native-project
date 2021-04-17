import React from "react"
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "./detail"
import Chat from "./chat"

const Stack = createStackNavigator();

const ChatTab = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
    )
}

export default ChatTab;