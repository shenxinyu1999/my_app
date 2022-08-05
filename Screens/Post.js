import React from "react";
import { RefreshControl, Text, FlatList, View, StyleSheet, SafeAreaView } from 'react-native';
import { FAB } from 'react-native-paper'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

const Title = ({ item }) => (
    <View style={[styles.item, { backgroundColor: 'white' }]}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.title}</Text>
    </View>
);

const Poster = ({ item, color }) => (
    <View style={[styles.item, { backgroundColor: color }]}>
        <Text>{item.content}</Text>
    </View>
);

const PostScreen = ({ navigation, route }) => {
    const user_id = route.params.user_id
    const post_id = route.params.post_id

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
                    id: post_id
                })
            })
            const post = await response.json()
            setPOST(post)
        }
        fetchReplies()
    }, [value])

    return <SafeAreaView>
        <SafeAreaView>
            <FlatList
                ListHeaderComponent={<Title item={{ title: POST.title }} />}
                data={POST.allReplies}
                renderItem={({ item, index }) => (
                    <Poster item={item} color={index % 2 == 0 ? 'white' : 'gainsboro'} />
                )}
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
                onPress={() => navigation.navigate('NewReply', { user_id: user_id, post_id: post_id })}
            />
        </SafeAreaView>
    </SafeAreaView>
};

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
});

export default PostScreen