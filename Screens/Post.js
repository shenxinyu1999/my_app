import React from "react";
import { Text, FlatList, View, StyleSheet, StatusBar, Button, SafeAreaView, Alert } from 'react-native';

const OriginalPoster = ({ item }) => (
    <View style={[styles.item, { backgroundColor: 'gainsboro' }]}>
        <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
        <Text>{item.post}</Text>
    </View>
);

const Poster = ({ item, color }) => (
    <View style={[styles.item, { backgroundColor: color }]}>
        <Text>{item}</Text>
    </View>
);

const PostScreen = ({ navigation, route }) => {
    const title = 'TITLE'

    const threads = ["I'm the original post.", "First Floor~", "Aha"]

    return <SafeAreaView>
        <OriginalPoster item={{ title: title, post: threads[0] }} />
        <FlatList
            data={threads.slice(1)}
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
    },
});

export default PostScreen