// DisciplinasFavoritas.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import materias from "../../../utils/data/materias";
import axios from "axios";

export default function DisciplinasFavoritas({ user, changeDisciplinas, setNewDisciplinas }) {
    const [selecionadas, setSelecionadas] = useState([]);

    const inputDisciplina = (disc) => {
        const ind = selecionadas.indexOf(disc);
        let copy = [...selecionadas];
        if (ind !== -1) {
            copy.splice(ind, 1);
        } else {
            copy.push(disc);
        }
        setSelecionadas(copy);
    };

    const manageDisciplinas = async () => {
        try {
            const response = await axios.post("/api/usuario/addFavMat", { id_user: user._id, fav_disciplinas: selecionadas });
            if (response.status === 200) {
                changeDisciplinas(false);
                setNewDisciplinas([...selecionadas]);
                user.fav_disciplinas = selecionadas;
                sessionStorage.setItem("user", JSON.stringify(user));
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (user) {
            setSelecionadas(user.fav_disciplinas);
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => changeDisciplinas(false)} style={styles.closeButton}>
                <Text>❌</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Diga pra gente quais são suas <Text style={styles.highlight}>matérias favoritas</Text>!</Text>
            <View style={styles.grid}>
                {materias.map((materia) => {
                    const set = selecionadas.includes(materia.dados[0]);
                    return (
                        <TouchableOpacity key={materia.dados[0]} onPress={() => inputDisciplina(materia.dados[0])} style={[styles.item, set && styles.selectedItem]}>
                            {set && <Text style={styles.checkIcon}>✔️</Text>}
                            <View style={styles.itemContent}>
                                <Image source={{ uri: `/icons/iconsDisciplinas/${materia.dados[0]}.png` }} style={styles.icon} />
                                <Text>{materia.dados[1]}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <TouchableOpacity onPress={manageDisciplinas} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Definir</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 255, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    highlight: {
        color: 'blue',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 16,
    },
    item: {
        width: '30%',
        margin: 8,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedItem: {
        borderColor: 'blue',
    },
    checkIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
        color: 'green',
        fontSize: 18,
    },
    itemContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        marginBottom: 8,
    },
    confirmButton: {
        backgroundColor: 'blue',
        padding: 16,
        borderRadius: 16,
        marginTop: 16,
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
