import { setUser, setLoggedUser, setQuestion, wipeDatabase } from './databases';

export const fill_database = async () => {
    try {
        await wipeDatabase();
        //create user admin
        const admin = {
            senha: 'admin',
            name: 'admin',
            faculdade: 'admin',
            curso: 'admin',
            ano_ingresso: 'admin',
            bio: 'admin',
        };
        await setUser('admin', admin);

        //create user Castanon
        const castanon = {
            email: 'rzzgame@usp.br',
            senha: 'castanon',
            name: 'Guilherme Castanon',
            faculdade: 'USP São Carlos',
            curso: 'Engenharia de Computação',
            ano_ingresso: '2020',
            bio: 'Sou o Guilherme, apesar de ter ingressado na Engenharia de Computação em 2020, tranquei o curso durante a pandemia e voltei no ano de 2021. Faço parte do FOG!',
        };
        await setUser(castanon.email, castanon);

        //create user Beatriz
        const beatriz = {
            email: 'bealomes@usp.br',
            senha: 'beatriz',
            name: 'Beatriz Lomes',
            faculdade: 'USP São Carlos',
            curso: 'Engenharia de Computação',
            ano_ingresso: '2021',
            bio: 'Sou a Beatriz, já fiz muita coisa na graduação, fui presidente da SAEComp, coordenadora da Campanha do Agasalho e já fiz IC, estou quase me formando!',
        };
        await setUser(beatriz.email, beatriz);

        //create user Lucas
        const lucas = {
            email: 'lucasegp@usp.br',
            senha: 'lucas',
            name: 'Lucas Gulka',
            faculdade: 'USP São Carlos',
            curso: 'Ciência da Computação',
            ano_ingresso: '2020',
            bio: 'Sou o Lucas, faço parte do FOG e já fiz IC, estou no último ano de graduação e estou procurando estágio!',
        };
        await setUser(lucas.email, lucas);

        //!perguntas
        const pergunta = {
            user: 'rzzgame@usp.br',
            time: '',
            title: 'Como fazer um app em React Native?',
            content: 'Estou tentando fazer um app em React Native, mas não estou conseguindo. Alguém pode me ajudar?',
            tags: ['React Native', 'App'],
            likes: 0,
        };
        await setQuestion(pergunta);

        const pergunta2 = {
            user: 'bealomes@usp.br',
            time: '',
            title: 'O que é um algoritmo?',
            content: 'Estou com dificuldades em entender o que é um algoritmo, alguém pode me ajudar?',
            tags: ['Algoritmo'],
            likes: 0,
        };
        await setQuestion(pergunta2);

        const pergunta3 = {
            user: 'bealomes@usp.br',
            time: '',
            title: 'Como fazer um algoritmo?',
            content: 'Estou com dificuldades em fazer um algoritmo, alguém pode me ajudar?',
            tags: ['Algoritmo'],
            likes: 0,
        };
        await setQuestion(pergunta3);

        console.log("Setting user Beatriz");
        await setLoggedUser(beatriz);


    } catch (error) {
        console.error('Failed to fill database', error);
    }
};