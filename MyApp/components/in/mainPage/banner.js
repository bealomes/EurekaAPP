// Banner.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Banner() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ExternalLink', { url: 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2Feureka.app.br' })} style={styles.banner}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Convide seus colegas!</Text>
                <Text>Participe da construção de nossa Comunidade convidando novas pessoas para tirar as dúvidas!</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require('/public/illustrations/festa.svg')} style={styles.image} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    banner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFD700',
        padding: 16,
        borderRadius: 16,
        marginVertical: 16,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});
