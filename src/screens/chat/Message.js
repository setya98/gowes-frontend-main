import React, { useState, useContext, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../../context/auth";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_MESSAGE, FETCH_CHAT_MESSAGES_QUERY } from "../../util/graphql";

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
        <View>
          <Icon
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5,}}
            size={40}
            color="#000"
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
          }
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <FontAwesome
        name="angle-double-down"
        size={18}
        color="#fff"
        style={{
          backgroundColor: "#000",
          width: 35,
          height: 35,
          borderRadius: 20,
          paddingStart: 12,
          paddingTop: 8,
        }}
      />
    );
  };

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
            // name: msg.user.buyer.name,
            avatar:
              "https://react.semantic-ui.com/images/avatar/large/molly.png",
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
    <GiftedChat
      renderBubble={renderBubble}
      renderSend={renderSend}
      messagesContainerStyle={{ backgroundColor: "#fff" }}
      messages={getMessageGiftedChat()}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      alwaysShowSend
      showUserAvatar
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default Message;