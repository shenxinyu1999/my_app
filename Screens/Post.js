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
    const post_id = route.params.post_id

    const [POST, setPOST] = React.useState({});

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
    }, [])

    return <SafeAreaView>
        <Title item={{ title: POST.title }} />
        <FlatList
            data={POST.allReplies}
            renderItem={({ item, index }) => (
                <Poster item={item} color={index % 2 == 0 ? 'white' : 'gainsboro'} />
            )}
            keyExtractor={item => item._id}
        />
    </SafeAreaView>
};

const styles = StyleSheet.create({
    item: {
        padding: 30,
    }
});

export default PostScreen