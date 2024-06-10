// Container.js
import React, { useState, useContext, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { UserContext } from "../../utils/contexts/UserContext";
import DisciplinasFavoritas from "./profile/DisciplinasFavoritas";
import NotLogged from "./others/NotLogged";
import Pergunte from "./perguntas/Pergunte";

export default function Container({ children, showHeader, hideRightBar }) {
    const [showAsk, setShowAsk] = useState(false);
    const [showChangeFav, setShowChangeFav] = useState(false);
    const [showLog, setShowLog] = useState(false);
    const USERCONTEXT = useContext(UserContext);

    useEffect(() => {
        if (USERCONTEXT.user[0]) {
            USERCONTEXT.disciplinas[1](USERCONTEXT.user[0].fav_disciplinas);
        }
    }, [USERCONTEXT.user[0], USERCONTEXT.disciplinas, USERCONTEXT.user]);

    return (
        <View style={styles.container}>
            {showLog && <NotLogged showLog={setShowLog} />}
            {showAsk && <Pergunte value={showAsk} onChange={setShowAsk} />}
            {showChangeFav && <DisciplinasFavoritas user={USERCONTEXT.user[0]} changeDisciplinas={setShowChangeFav} setNewDisciplinas={USERCONTEXT.disciplinas[1]} />}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {showHeader && <Header />}
                <View style={styles.content}>
                    {children}
                    {!hideRightBar && <RightBar user={USERCONTEXT.user[0]} />}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    content: {
        flexDirection: 'row',
        gap: 5,
    },
});
