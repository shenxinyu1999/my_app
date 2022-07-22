import React from "react";
import { TouchableHighlight, Text, FlatList, View, StyleSheet, StatusBar, Button, SafeAreaView, Alert } from 'react-native';

const Item = ({ item, color }) => (
    <View style={[styles.item, { backgroundColor: color }]}>
        <Text>{item.title}</Text>
    </View>
);

const HomeScreen = ({ navigation, route }) => {
    const DATA = [
        { title: 'Ta Item'},
        { title: 'Th Item' },
        { title: 'Thi Item' },
        { title: 'Thir Item' },
        { title: 'Third Item' },
        { title: 'Thir Item' },
        { title: 'Thi Item' },
        { title: 'Th Item' },
        { title: 'T Item' },
        { title: 'Th Item' },
        { title: 'Thi Item' },
        { title: 'Thir Item' },
        { title: 'Third Item' },
        { title: 'Thir Item' },
    ]

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title="+" />
            ),
        });
    }, [navigation]);

    return <SafeAreaView>
        <FlatList
            data={DATA}
            renderItem={({ item, index }) => (
                <TouchableHighlight onPress={() => navigation.navigate('Post', { id: index })}>
                    <Item item={item} color={index % 2 == 0 ? 'white' : 'gainsboro'} ></Item>
                </TouchableHighlight>
            )}
            keyExtractor={(item, index) => index}
        />
    </SafeAreaView>
};

const styles = StyleSheet.create({
    item: {
        padding: 30,
    },
});

export default HomeScreen