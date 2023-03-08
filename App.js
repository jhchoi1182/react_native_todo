import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { theme } from "./Colors";

export default function App() {
  const [working, setWorking] = useState(true)
  const [text, setText] = useState("")
  const work = () => setWorking(true)
  const travel = () => setWorking(false)
  const onChangeText = (payload) => setText(payload);


  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{ ...styles.BtnText, color: working ? "white" : theme.grey }}>일</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{ ...styles.BtnText, color: !working ? "white" : theme.grey }}>여행</Text>
        </TouchableOpacity>
      </View>
      <TextInput value={text} onChangeText={onChangeText} placeholder={working ? "무슨 일을 하고 싶으세요?" : "어디로 여행을 가고 싶으세요?"} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 45,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 80
  },
  BtnText: {
    fontSize: 38,
    fontWeight: 700,
    color: theme.grey
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18
  }
});
