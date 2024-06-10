// Pergunta.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import timeFromPost from "../../../utils/functions/timeFromPost";
import { useNavigation } from '@react-navigation/native';
import materias from "../../../utils/data/materias";
import axios from "axios";
import DeleteConfirm from "../others/DeleteConfirm";
import BannerDisciplina from "../others/BannerDisciplina";
import ZoomablePhoto from "../others/ZoomablePhoto";
import Report from "../others/Report";

export default function Pergunta({ quest, full, showAnswering, user }) {
    const [showDelete, setShowDelete] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const navigation = useNavigation();

    const indMateria = materias.findIndex(element => element.dados[0] === quest.materia);

    const delQuestion = async () => {
        try {
            const response = await axios.post("/api/perguntas/deletarPergunta", { id: quest._id });
            if (response.status === 200) {
                navigation.navigate('App');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            {full && showReport && <Report setReport={setShowReport} id={quest._id} type="pergunta" />}
            {full && quest && <BannerDisciplina nome={quest.materia} />}
            <View style={styles.questionContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('Usuario', { username: quest.username })}>
                        <Image source={{ uri: quest.foto_user }} style={styles.userImage} />
                    </TouchableOpacity>
                    <View style={styles.userInfo}>
                        <Text style={styles.username}>{quest.username}</Text>
                        {quest.admin && <Text style={styles.admin}>👑</Text>}
                        <Text style={styles.postTime}>{timeFromPost(quest.date)}</Text>
                    </View>
                    {full && (
                        <View style={styles.actions}>
                            <Text onPress={() => setShowReport(true)}>🚩</Text>
                            {user && (quest.id_user === user._id.toString() || user.admin) && (
                                <Text onPress={() => setShowDelete(true)}>🗑️</Text>
                            )}
                        </View>
                    )}
                </View>
                {!full && (
                    <>
                        <TouchableOpacity onPress={() => navigation.navigate('Pergunta', { id: quest._id })}>
                            <Text style={styles.questionText}>{quest.texto}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Materia', { id: materias[indMateria].dados[0] })} style={styles.materia}>
                            <Text>{materias[indMateria].dados[1]}</Text>
                        </TouchableOpacity>
                    </>
                )}
                {full && (
                    <>
                        <Text style={styles.fullQuestionText}>{quest.texto}</Text>
                        <DeleteConfirm setConf={delQuestion} showDel={showDelete} setDel={setShowDelete} />
                        {quest.foto && (
                            <View style={styles.photoContainer}>
                                <ZoomablePhoto src={quest.foto} />
                            </View>
                        )}
                        {user && quest.id_user !== user._id.toString() && (
                            <TouchableOpacity onPress={() => showAnswering(true)} style={styles.answerButton}>
                                <Text>Responda</Text>
                            </TouchableOpacity>
                        )}
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        marginVertical: 8,
    },
    questionContainer: {
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    userInfo: {
        flex: 1,
        marginLeft: 8,
    },
    username: {
        fontWeight: 'bold',
    },
    admin: {
        color: 'gold',
    },
    postTime: {
        color: 'gray',
        fontSize: 12,
    },
    actions: {
        flexDirection: 'row',
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    fullQuestionText: {
        fontSize: 18,
    },
    materia: {
        backgroundColor: '#FFD700',
        padding: 8,
        borderRadius: 16,
        marginTop: 8,
    },
    photoContainer: {
        marginTop: 8,
    },
    answerButton: {
        backgroundColor: '#0000FF',
        padding: 16,
        alignItems: 'center',
        borderRadius: 16,
        marginTop: 16,
    },
});
