import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Dimensions, ActivityIndicator, Image } from "react-native";
import { Card, Chip } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ListItem } from "native-base";
import Icon from "react-native-vector-icons/AntDesign";

import { useQuery } from "@apollo/react-hooks";
import { FETCH_ITEM_REVIEWS } from "../../util/graphql";

import ProductReviewCard from "./ProductReviewCard";

var { height } = Dimensions.get("window")

const ProductReview = (props) => {
  const item = props.route.params.item
  const [activeChip, setActiveChip] = useState("All");
  const [active, setActive] = useState(-1);

  const { loading, data } = useQuery(FETCH_ITEM_REVIEWS, {
    variables: {
      itemId: item.id
    }
  })
  const { getItemReviews: reviews } = data ? data : []

  // console.log("score", reviews.score)

  const handleChip = (name) => {
    setActiveChip(name);
    console.log(name);
  };

  var reviewList = []

  if (reviews && activeChip === "All") {
    reviewList.push(reviews);
  } else if (
    reviews &&
    activeChip === "1" &&
    reviews.find((review) => review.score === 1)
  ) {
    reviewList.push(reviews.filter((review) => review.score === 1));
  } else if (
    reviews &&
    activeChip === "2" &&
    reviews.find((review) => review.score === 2)
  ) {
    reviewList.push(reviews.filter((review) => review.score === 2));
  } else if (
    reviews &&
    activeChip === "3" &&
    reviews.find((review) => review.score === 3)
  ) {
    reviewList.push(reviews.filter((review) => review.score === 3));
  } else if (
    reviews &&
    activeChip === "4" &&
    reviews.find((review) => review.score === 4)
  ) {
    reviewList.push(reviews.filter((review) => review.score === 4));
  } else if (
    reviews &&
    activeChip === "5" &&
    reviews.find((review) => review.score === 5)
  ) {
    reviewList.push(reviews.filter((review) => review.score === 5));
  }


  return (
    <>
    <SafeAreaView style={{ backgroundColor: "#f2f2f2" }}>
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
            marginStart: 100,
          }}
        >
          Ulasan Produk
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 190,
          backgroundColor: "#f2f2f2",
        }}
      >
          <Card.Content style={{marginStart: -20, marginTop: -5, backgroundColor: "#f2f2f2"}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                backgroundColor: "#f2f2f2",
              }}
            >
              <ListItem
                style={{
                  padding: 0,
                  marginTop: -5,
                  height: 75,
                  flexDirection: "row",
                  borderBottomColor: "transparent",
                }}
              >
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("All")}
                >
                  All
                </Chip>
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("1")}
                >
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                  <Text style={{fontSize: 16}}>1</Text>
                </Chip>
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("2")}
                >
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                  <Text style={{fontSize: 16}}>2</Text>
                </Chip>
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("3")}
                >
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                  <Text style={{fontSize: 16}}>3</Text>
                </Chip>
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("4")}
                >
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                  <Text style={{fontSize: 16}}>4</Text>
                </Chip>
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("5")}
                >
                  <Icon name="star" style={{ color: "#F18c06", fontSize: 20 }} />
                  <Text style={{fontSize: 16}}>5</Text>
                </Chip>
              </ListItem>
            </ScrollView>
      </Card.Content>
      {!loading ? (
        reviewList.length > 0 ? (
          <Card.Content>
            {reviewList[0] &&
              reviewList[0].map((review, index) => (
                <ProductReviewCard 
                key={index} 
                review={review}
                />
              ))
            }
          </Card.Content>
        ) : (
            <Card.Content style={{backgroundColor: "#f2f2f2", height: "100%", marginTop: "15%"}}>
              <Image 
              source={require("../../assets/ilus-empty.webp")}
              resizeMode="contain"
              style={{width: 250, height: 250, alignSelf: "center", marginTop: -15}}
              />
              <Text style={{alignSelf: "center", fontSize: 18, fontWeight: "bold"}}>Belum ada review nih</Text>
            </Card.Content>
        )
      ) : (
          <Card.Content style={{backgroundColor: "#f2f2f2", height: "100%"}}>
          <ActivityIndicator style={{justifyContent: "center", alignSelf:"center", marginTop: "50%"}} size="large" color="#000" />
          </Card.Content>
      )}
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
    header: {
      margin: 15,
      flexDirection: "row",
      backgroundColor: "#f2f2f2",
    },
    text: {
        color: '#000',
        fontSize: 18,
        fontWeight: "bold"
      },
      center: {
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#8c8c8c"
      },
      active: {
        backgroundColor: '#fff'
    },
    inactive: {
        backgroundColor: '#8c8c8c'
    },
      
})

export default ProductReview
