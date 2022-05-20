import React, { useState, useContext, useCallback, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../../context/auth";
import { useQuery, useMutation } from "@apollo/client";
import {
  ADD_MESSAGE,
  FETCH_CHAT_MESSAGES_QUERY,
  FETCH_CHATS_QUERY,
} from "../../util/graphql";

const Message = (props) => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const { loading, data, refetch } = useQuery(FETCH_CHAT_MESSAGES_QUERY, {
    variables: {
      chatId: props.route.params.chatId,
    },
  });
  let { getMessages: messages } = data ? data : [];
  let messagesList = [];
  let msgObj = {};

  const { chatsData } = useQuery(FETCH_CHATS_QUERY);
  const { getChats: chats } = chatsData ? chatsData : [];

  console.log("oi", messages);

  const [addMessage] = useMutation(ADD_MESSAGE, {
    update() {
      refetch();
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(errors);
    },
    variables: {
      chatId: props.route.params.chatId,
      receiverUserId: user.id,
      content: content,
    },
  });

  useEffect(() => {
    if (content !== "") {
      console.log("content:", content);
      console.log("userId:", user.id);
      console.log("chatId:", props.route.params.chatId);
      addMessage();
    }
  }, [content]);

  const onSend = useCallback((messages = []) => {
    GiftedChat.append(messagesList, messages);
    setContent(messages[messages.length - 1].text);
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View
          style={{
            backgroundColor: "#000",
            height: 35,
            width: 35,
            borderRadius: 10,
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <Icon
            name="send"
            style={{ alignSelf: "center" }}
            size={15}
            color="#fff"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#BDBDBD",
            borderTopRightRadius: 15,
          },
          left: {
            backgroundColor: "#CDDEFF",
            borderTopLeftRadius: 15,
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <MaterialIcon
        name="arrow-drop-down"
        size={30}
        color="#fff"
        style={{
          backgroundColor: "#000",
          width: 30,
          height: 30,
          borderRadius: 20,
          alignItems: "center",
        }}
      />
    );
  };

  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          marginStart: 15,
          marginBottom: 15,
          marginEnd: 15,
          elevation: 1,
          borderRadius: 15,
          borderTopColor: "transparent",
        }}
      />
    );
  };

  const renderLoading = () => {
    return(
      <View>
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", marginTop: "50%"}}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </View>
    )
  }

  const getMessageGiftedChat = () => {
    if (!loading && messages) {
      messagesList = messages.map((msg) => {
        let userId = msg.user.id == user.id ? 1 : 2;
        msgObj = {
          _id: msg.id,
          text: msg.content,
          createdAt: Date.parse(msg.sentAt),
          user: {
            _id: userId,
            // name: "Buyer",
            avatar: "https://react.semantic-ui.com/images/avatar/large/molly.png",
          },
        };
        return msgObj;
      });
      messagesList.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return b.createdAt - a.createdAt;
      });
    }
    return messagesList;
  };

  return (
    <>
      <GiftedChat
        renderBubble={renderBubble}
        renderSend={renderSend}
        messagesContainerStyle={{
          backgroundColor: "#f2f2f2",
          paddingBottom: 50,
          marginStart: 5,
          marginEnd: 5,
        }}
        messages={getMessageGiftedChat()}
        renderInputToolbar={customtInputToolbar}
        placeholder="Tulis pesan disini..."
        onSend={(messages) => onSend(messages)}
        alwaysShowSend
        renderLoading={renderLoading}
        showUserAvatar
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </>
  );
};

export default Message;
