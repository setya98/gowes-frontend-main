import React, { memo, useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import Toast from "react-native-toast-message";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTheme } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "native-base";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER_USER } from "../../util/graphql";
import { List } from "react-native-paper";

const Register = ({ navigation }) => {
  const { colors } = useTheme();
  const [hidePass, setHidePass] = useState(true);
  const [hidePassConfirm, setHidePassConfirm] = useState(true);
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (key, val) => {
    setValues({ ...values, [key]: val });
  };

  const [register, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      console.log("succeeded register - userData: ", userData);
      navigation.navigate(
        "Login"
      )
      Toast.show({
        topOffset: 30,
        type: "success",
        text1: "Daftar akun berhasil",
      })
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    register();
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.logo}>
        <Image
          source={require("../../assets/bicycle.png")}
          resizeMode="contain"
          style={{ height: 75, width: 75 }}
        />
        <Text style={{ fontSize: 40, fontWeight: "bold", marginStart: 10, marginTop: 35 }}>
          Gowes
        </Text>
      </View>
      <View style={styles.action}>
        <FontAwesome
          name="user"
          size={18}
          style={{ marginStart: 15, marginTop: 16, color: "#595959" }}
        />
        <TextInput
          placeholder="Nama"
          placeholderTextColor="#666666"
          autoCapitalize="none"
          autoComplete="name"
          value={values.name}
          error={errors.name ? true : false}
          onChangeText={(val) => onChange("name", val)}
          textContentType="name"
          returnKeyType="next"
        //   error={errors.name ? true : false}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome
          name="envelope"
          size={18}
          style={{ marginStart: 15, marginTop: 16, color: "#595959" }}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#666666"
          autoComplete="email"
          autoCapitalize="none"
          value={values.email}
          error={errors.email ? true : false}
          onChangeText={(val) => onChange("email", val)}
          textContentType="emailAddress"
          returnKeyType="next"
        //   error={errors.email ? true : false}
          keyboardType="email-address"
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome
          name={hidePass ? 'eye-slash' : 'eye'}
          size={20}
          style={{ marginStart: 15, marginTop: 15, color: "#595959" }}
          onPress={() => setHidePass(!hidePass)}
        />
        <TextInput
          placeholder="Password"
          returnKeyType="done"
          value={values.password}
          error={errors.password ? true : false}
          onChangeText={(val) => onChange("password", val)}
          placeholderTextColor="#666666"
          secureTextEntry={hidePass ? true : false}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome
          name={hidePassConfirm ? 'eye-slash' : 'eye'}
          size={20}
          style={{ marginStart: 15, marginTop: 15, color: "#595959" }}
          onPress={() => setHidePassConfirm(!hidePassConfirm)}
        />
        <TextInput
          placeholder="Konfirmasi Password"
          placeholderTextColor="#666666"
          returnKeyType="done"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChangeText={(val) => onChange("confirmPassword", val)}
          secureTextEntry={hidePassConfirm ? true : false}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>

      {Object.keys(errors).length > 0 && (
            <View style={styles.errorContainer}>
              <List.Section style={styles.errorSection}>
                {Object.values(errors).map((value) => (
                  <List.Item
                    key={value}
                    title={value}
                    titleStyle={styles.errorItem}
                    titleNumberOfLines={10}
                    left={() => (
                      <List.Icon
                        color={'white'}
                        style={{ margin: 0 }}
                        icon="alert-circle"
                      />
                    )}
                  />
                ))}
              </List.Section>
            </View>
          )}

      <Button
      onPress={onSubmit}
      loading={loading ? true : false}
      style={styles.btn}>
          <Text style={{color: "#fff", fontWeight: "bold", fontSize: 18}}>Buat Akun</Text>
      </Button>
      <View style={{flexDirection: "row", justifyContent: "center"}}>
      <Text style={{fontWeight: "800", fontSize: 16, color: "#595959", marginTop: 15}}>Sudah punya akun ?</Text>
      <TouchableOpacity
      onPress={() => navigation.navigate("Login")}>
      <Text style={{fontWeight: "bold", fontSize: 17, color: "#000", marginStart: 5, marginTop: 14}}>Masuk</Text>
      </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: "100%",
    height: "100%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: 30
  },
  action: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
    height: 60,
    borderBottomColor: "transparent",
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    alignSelf: "center",
    padding: 5,
    width: "85%",
    elevation: 0.2
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
  btn: {
      backgroundColor: "#000",
      width: "75%",
      borderRadius: 25,
      marginTop: 25,
      height: 55,
      alignSelf: "center",
      justifyContent: "center",
  },
  errorSection: {
    width: "70%",
    borderRadius: 25,
    alignSelf: "center",
    backgroundColor: "#E63f5b",
  },
  errorHeader: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorItem: {
    fontSize: 15,
    color: "#fff",
  },
});

export default memo(Register);
