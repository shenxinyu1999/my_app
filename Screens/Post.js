import React from "react";
import { RefreshControl, Text, FlatList, View, StyleSheet, SafeAreaView } from 'react-native';
import { FAB } from 'react-native-paper'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

const OriginalPost = ({ item }) => {
    console.log(item)
    return !item ? (<View></View>) : (
    <View style={[styles.item, { backgroundColor: 'gainsboro' }]}>
        <View>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.title}</Text>
            <Text>{item.content}</Text>
        </View>
        <View>
            <Text style={{ fontSize: 10 }}>{item.name}</Text>
            <Text style={{ fontSize: 10 }}>{item.modified}</Text>
        </View>
    </View>
)}

const Poster = ({ item, color }) => (
    <View style={[styles.item, { backgroundColor: color }]}>
        <View>
            <Text>{item.content}</Text>
        </View>
        <View>
            <Text style={{ fontSize: 10 }}>{item.name}</Text>
            <Text style={{ fontSize: 10 }}>{item.modified}</Text>
        </View>
    </View>
)

const PostScreen = ({ navigation, route }) => {
    const user = route.params.user
    const post = route.params.post

    const [POST, setPOST] = React.useState({})
    const [refreshing, setRefreshing] = React.useState(false)
    const [value, setValue] = React.useState(0)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setValue(value + 1)
        wait(2000).then(() => setRefreshing(false));
    }, []);

    React.useEffect(() => {
        const fetchReplies = async () => {
            const url = "https://fisher-shen-forum-test.herokuapp.com/forum"
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post_id: post
                })
            })
            const result = await response.json()
            setPOST(result)
        }
        fetchReplies()
    }, [value])

    return <SafeAreaView>
        <SafeAreaView>
            <FlatList
                ListHeaderComponent={<OriginalPost item={POST.original} />}
                data={POST.replies}
                renderItem={({ item, index }) => (
                    <Poster item={item} color={index % 2 == 0 ? 'white' : 'gainsboro'} />
                )}
                keyExtractor={item => item.reply_id}
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
                onPress={() => navigation.navigate('NewReply', { user: user, post: post })}
            />
        </SafeAreaView>
    </SafeAreaView>
};

const styles = StyleSheet.create({
    item: {
        padding: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
});

export default PostScreen