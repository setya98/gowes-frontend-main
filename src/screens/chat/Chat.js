import React, { useContext } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Card } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import {
  CardStyles,
  User,
  UserImageView,
  TextInfo,
  UserInfo,
  UserName,
  MessageText,
} from "../../styles/ChatStyles";

import { FETCH_CHATS_QUERY } from "../../util/graphql";
import { AuthContext } from "../../context/auth";
import { useQuery } from "@apollo/client";
import { LogBox } from "react-native";

var { height, width } = Dimensions.get("window");

const Chat = (props) => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_CHATS_QUERY);
  const { getChats: chats } = data ? data : [];

  const receiver = (users) => {
    let userReceiver;
    if (users[0].id !== user.id) {
      userReceiver = users[0];
    } else {
      userReceiver = users[1];
    }
    return userReceiver;
  };
  // console.log("chats", chats);

  return (
    <>
      {!loading ? (
        <SafeAreaView style={{ backgroundColor: "#fff" }}>
          <View style={styles.header}>
            <FontAwesome
              onPress={() => props.navigation.goBack()}
              name="chevron-left"
              size={18}
              style={{ top: 4 }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                letterSpacing: 0.3,
                marginStart: 130,
              }}
            >
              Chat
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: height,
              backgroundColor: "#fff",
            }}
          >
            <FlatList
              scrollEnabled={false}
              style={{ marginStart: 15, marginEnd: 15 }}
              data={chats}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CardStyles
                  onPress={() =>
                    props.navigation.navigate("Message Screen", {
                      username: receiver(item.users).seller.username,
                      chatId: item.id,
                    })
                  }
                >
                  <User>
                    <UserImageView>
                      <Image
                        source={require("../../assets/man.png")}
                        style={{ width: 45, height: 45, marginStart: 15 }}
                      />
                    </UserImageView>
                    <TextInfo>
                      <UserInfo>
                        <UserName>
                          {receiver(item.users).seller.username}
                        </UserName>
                      </UserInfo>
                      <MessageText>{item.lastText}</MessageText>
                    </TextInfo>
                  </User>
                </CardStyles>
              )}
            />
          </ScrollView>
        </SafeAreaView>
      ) : (
        <Card.Content>
          <Image
            source={require("../../assets/ilus-empty.webp")}
            resizeMode="contain"
            style={{
              width: 250,
              height: 250,
              alignSelf: "center",
              marginTop: "25%",
            }}
          />
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Kamu belum punya pesan masuk
          </Text>
        </Card.Content>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 15,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
});

export default Chat;
