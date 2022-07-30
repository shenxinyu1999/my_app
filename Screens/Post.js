import React from "react";
import { Text, FlatList, View, StyleSheet, StatusBar, Button, SafeAreaView, Alert } from 'react-native';

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
    const [POSTS, setPOSTS] = React.useState([]);
    const thread = route.params.thread

    React.useEffect(() => {
        const fetchThreads = async () => {
            const url = "https://fisher-shen-forum-test.herokuapp.com/forum"
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: thread._id
                })
            })
            const allPosts = await response.json()
            setPOSTS(allPosts)
        }
        fetchThreads()
    }, [])

    return <SafeAreaView>
        <Title item={{ title: thread.title }} />
        <FlatList
            data={POSTS}
            renderItem={({ item, index }) => (
                <Poster item={item} color={index % 2 == 0 ? 'white' : 'gainsboro'} />
            )}
            keyExtractor={(item, index) => index}
        />
    </SafeAreaView>
};

const styles = StyleSheet.create({
    item: {
        padding: 30,
    }
});

export default PostScreen