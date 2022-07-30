import React from "react";
import { RefreshControl, TouchableHighlight, Text, FlatList, View, StyleSheet, StatusBar, Button, SafeAreaView, Alert } from 'react-native';
import { FAB } from 'react-native-paper'

const Item = ({ item, color }) => (
    <View style={[styles.item, { backgroundColor: color }]}>
        <Text>{item.title}</Text>
    </View>
);

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = ({ navigation, route }) => {
    const [DATA, setDATA] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [value, setValue] = React.useState(0);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setValue(value + 1)
        wait(2000).then(() => setRefreshing(false));
    }, []);

    React.useEffect(() => {
        const fetchThreads = async () => {
            const url = "https://fisher-shen-forum-test.herokuapp.com/forum"
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const allThreads = await response.json()
            setDATA(allThreads)
        }
        fetchThreads()
    }, [value])

    return <SafeAreaView>
        <SafeAreaView>
            <FlatList
                data={DATA}
                renderItem={({ item, index }) => {
                    return <TouchableHighlight onPress={() => navigation.navigate('Post', { thread: item })}>
                        <Item item={item} color={index % 2 == 0 ? 'white' : 'gainsboro'} ></Item>
                    </TouchableHighlight>
                }}
                keyExtractor={item => item._id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
        <SafeAreaView style={styles.fixedView}>
            <FAB
                style={styles.fab}
                color="white"
                icon="plus"
                onPress={() => navigation.navigate('NewThread')}
            />
        </SafeAreaView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    item: {
        padding: 30,
    },
    fab: {
        margin: 5
    },
    fixedView: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
})

export default HomeScreen