import React from "react"
import { RefreshControl, TouchableHighlight, Text, FlatList, View, StyleSheet, SafeAreaView } from 'react-native'
import { FAB } from 'react-native-paper'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu'

const Item = ({ item, color }) => (
    <View style={[styles.item, { backgroundColor: color }]}>
        <View>
            <Text>{item.title}</Text>
        </View>
        <View>
            <Text style={{ fontSize: 10 }}>{item.user.name}</Text>
            <Text style={{ fontSize: 10 }}>{item.updatedAt}</Text>
        </View>
    </View>
)

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

const HomeScreen = ({ navigation, route }) => {
    const user = route.params.user

    const [POSTS, setPOSTS] = React.useState([])
    const [refreshing, setRefreshing] = React.useState(false)
    const [value, setValue] = React.useState(0)
    const [menuVisible, setMenuVisible] = React.useState(false)

    const hideMenu = () => setMenuVisible(false)

    const showMenu = () => setMenuVisible(true)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Menu
                    visible={menuVisible}
                    anchor={<Text onPress={showMenu}>{user.name}</Text>}
                    onRequestClose={hideMenu}
                >
                    <MenuItem onPress={hideMenu}>功能1</MenuItem>
                    <MenuItem onPress={hideMenu}>功能2</MenuItem>
                    <MenuItem disabled>无法使用的功能</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={hideMenu}>登出</MenuItem>
                </Menu>
            ),
        });
    }, [menuVisible]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setValue(value + 1)
        wait(2000).then(() => setRefreshing(false));
    }, []);

    React.useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(process.env.REACT_APP_SERVER + "forum", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const allPosts = await response.json()
            setPOSTS(allPosts)
        }
        fetchPosts()
    }, [value])


    return <SafeAreaView>
        <SafeAreaView>
            <FlatList
                data={POSTS}
                renderItem={({ item, index }) => {
                    return <TouchableHighlight onPress={() => navigation.navigate('Post', { user: user._id, post: item._id })}>
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
                onPress={() => navigation.navigate('NewPost', { user: user._id })}
            />
        </SafeAreaView>
    </SafeAreaView>
}

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
})

export default HomeScreen