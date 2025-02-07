import React, {useState} from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  Image,
  Platform,
  Keyboard,
  FlatList,
  ImageBackground,
} from "react-native";

function App () {


  interface Task{
    input: string;
    canedit: boolean;
  };

  const [task, settask]=useState<string>("");
  const [item, setitem]=useState<Task[]>([]);
  const [edititem, setedititem]=useState<string>("");
  const [edittext, setedittext]=useState<boolean>(false)
  
  const addtask=() => {
    if (task.trim()==="") return;
    Keyboard.dismiss();
    const newtask: Task={
      input: task,
      canedit: false,
    };
    setitem([...item, newtask]);
    settask("");
  };

  const finishtask=(index: number) => {
    let item_clone = item.slice();
    item_clone.splice(index, 1);
    setitem(item_clone);
  };

  const edittask=(index: number) => {
    setedittext(!edittext)
    let item_clone=item.slice();
    item[index].canedit=!item[index].canedit
    if (edititem.trim()!=="") item_clone[index] = { 
      ...item_clone[index], 
      input: edititem
    };
    else return;
    setitem(item_clone);
    setedititem("");
  };

  return(
    <ImageBackground source={require('./Pikachu_background.jpg')} resizeMode="cover" style={styles.backgroundimage}>
    <View style={styles.container}>
      <View style={styles.headercontainer}>
        <Text style={styles.header}>Work To Do</Text>
      </View>
      <TextInput
        placeholder="Input your task"
        value={task}
        onChangeText={settask}
      />
      <Pressable style={styles.button_add} onPress={addtask}>
        <Text>Add</Text>
      </Pressable>
      <FlatList
      data={item}
      keyExtractor={(_,index) => index.toString()}
      renderItem={
        ({item, index})=>
          <View style={styles.list}>
        <Text style={styles.task}>{item.input}</Text>
        <Pressable style={styles.button_complete} onPress={()=>finishtask(index)}>
          <Image style={styles.finish_img} source={require('./Image.jpg')}/>
        </Pressable>
        <Pressable style={styles.button_edit} onPress={()=>edittask(index)}>
          <Text>Edit</Text>
        </Pressable>
        {edittext &&  item.canedit &&(
      <TextInput
    placeholder="Input your task"
    value={edititem}
    onChangeText={setedititem}
  />
    )}
        </View>
}
      />
      <KeyboardAvoidingView
behavior={Platform.OS === "android" ? "padding" : "height"}
style={styles.writeTaskWrapper}
></KeyboardAvoidingView>
    </View>
    </ImageBackground>
    
  )
}

export default App

const styles=StyleSheet.create(
  {
    backgroundimage:{
      flex: 1,
    },
    container:{
      flex: 1,
      justifyContent: 'center',
      paddingTop: 20,
    },
    writeTaskWrapper: {
      position: "absolute",
      bottom: 40,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    task:{
      display: 'flex',
      padding: 15,
      textAlign:'left',
      fontSize: 20,
      fontFamily: 'sans-serif',
      flexWrap: 'wrap',
      maxWidth: 200,
    },
    list:{
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 15,
    },
    header:{
      textAlign:'center',
      fontSize: 35,
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
    },
    headercontainer:{
      borderBottomWidth: 10,
      borderBottomColor: 'rgb(0, 0, 0)',
      paddingBottom: 5,
      alignItems: 'center' 
    },
    button_add: {
      alignSelf: 'flex-start',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'black',
      paddingHorizontal: 20,
      paddingVertical: 10,
      margin: 10,
      backgroundColor: 'white',
    },
    button_complete: {
      alignSelf: 'flex-start',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'black',
      paddingHorizontal: 20,
      paddingVertical: 10,
      margin: 10,
      backgroundColor: 'white',
    },
    finish_img: {
      width: 25,
      height: 25,
    },
    button_edit: {
      alignSelf: 'flex-start',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'black',
      paddingHorizontal: 20,
      paddingVertical: 10,
      margin: 10,
      backgroundColor: 'white',
    },   
  }
)