import * as React from "react";
import { StyleSheet } from "react-native";
import { Title } from "react-native-paper";

const TitleHeader = (props) => (
    <Title style={[styles.titleHeader, props.style]}>{props.title}</Title>
)

const styles = StyleSheet.create({
    titleHeader: {
        color: "#000",
        fontSize: 28,
        marginBottom: 20,
        letterSpacing: 0.6,
        marginStart: 20,
        marginTop: 35,
        lineHeight: 35,
        fontWeight: "bold"
    }
})

export default TitleHeader