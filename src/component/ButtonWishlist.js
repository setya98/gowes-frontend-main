import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/AntDesign";

import { BOOKMARK_ITEM_MUTATION, FETCH_BOOKMARKS_QUERY } from "../util/graphql";

function ButtonWishlist({ user, item: {id, bookmarkedBy} }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (
      user.user &&
      bookmarkedBy.find((bookmark) => bookmark.userId === user.user.id)
    ) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  }, [user, bookmarkedBy]);

  const [errors, setErrors] = useState({});

  const [wishlistItem] = useMutation(BOOKMARK_ITEM_MUTATION, {
    variables: { itemId: id },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_BOOKMARKS_QUERY
      })

      if (!bookmarked) {
        proxy.writeQuery({
          query: FETCH_BOOKMARKS_QUERY,
          data: {
            getBookmarks: [result.data.bookmarkItem, ...data.getBookmarks],
          },
        });
      } else {
        proxy.writeQuery({
          query: FETCH_BOOKMARKS_QUERY,
          data: {
            getBookmarks: data.getBookmarks.filter((item) => item.id !== id),
          },
        });
      }

      Toast.show({
        topOffset: 30,
        type: "success",
        text1: "Berhasil",
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(errors);
    },
  });

  const buttonWishlist = user.user ? (
    bookmarked ? (
      <View
        style={{
          width: 32,
          height: 32,
          backgroundColor: "rgba(245, 42, 42, 0.2)",
          borderRadius: 20,
          justifyContent: "center",
        }}
      >
        <Icon
          name="heart"
          size={18}
          color={"#C92643"}
          style={{ alignSelf: "center" }}
        />
      </View>
    ) : (
      <View
        style={{
          width: 32,
          height: 32,
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: 20,
          justifyContent: "center",
        }}
      >
        <Icon
          name="heart"
          size={18}
          color={"#595959"}
          style={{ alignSelf: "center" }}
        />
      </View>
    )
  ) : (
    <View
      style={{
        width: 32,
        height: 32,
        backgroundColor: "rgba(0,0,0,0.2)",
        borderRadius: 20,
        justifyContent: "center",
      }}
    >
      <Icon
        name="heart"
        size={18}
        color={"#595959"}
        style={{ alignSelf: "center" }}
      />
    </View>
  );

  return (
    <TouchableOpacity onPress={user ? wishlistItem : ""}>
      {buttonWishlist}
    </TouchableOpacity>
  );
}

export default ButtonWishlist;
