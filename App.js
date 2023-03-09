
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { theme } from "./Colors";

const STORAGE_KEY = "@todos"

export default function App() {
  const [working, setWorking] = useState(true)
  const [text, setText] = useState("")
  const [todos, setTodos] = useState({})
  const work = () => setWorking(true)
  const travel = () => setWorking(false)
  const onChangeText = (payload) => setText(payload);

  const saveTodos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    } catch (error) {
      alert("저장에 실패했습니다.")
    }
  }

  const loadTodos = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY)
      if (data) setTodos(JSON.parse(data));
    } catch (error) {
      alert("데이터를 불러올 수 없습니다.")
    }
  }

  const addTodo = async () => {
    if (text === "") return
    const newTodos = { ...todos, [Date.now()]: { text, working } }
    setTodos(newTodos)
    await saveTodos(newTodos)
    setText("")
  }

  const deleteTodo = async (key) => {
    try {
      Alert.alert("정말 삭제하시겠습니까?", "확실합니까?", [
        { text: "취소" },
        {
          text: "확인", onPress: async () => {
            const newTodos = { ...todos }
            delete newTodos[key]
            setTodos(newTodos)
            await saveTodos(newTodos)
          }
        }
      ])
    } catch (error) {
      alert("삭제에 실패했습니다.")
    }
  }

  useEffect(() => {
    loadTodos()
  }, [])

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
      <TextInput onSubmitEditing={addTodo} value={text} onChangeText={onChangeText} placeholder={working ? "무슨 일을 하고 싶으세요?" : "어디로 여행을 가고 싶으세요?"} style={styles.input} />
      <ScrollView>{Object.keys(todos).map(key =>
        todos[key].working === working ?
          <View style={styles.todo} key={key}>
            <Text style={styles.todoText}>
              {todos[key].text}
            </Text>
            <TouchableOpacity onPress={() => deleteTodo(key)}>
              <Fontisto name="trash" size={16} color={theme.grey} />
            </TouchableOpacity>
          </View> : null)}</ScrollView>
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
    marginVertical: 20,
    fontSize: 18
  },
  todo: {
    backgroundColor: theme.todoBg,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  todoText: {
    color: "white",
    fontSize: 16
  }
});
