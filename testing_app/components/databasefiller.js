import { setUser, setLoggedUser, setQuestion, wipeDatabase, setAnswer } from './databases';

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

        //Create user Torrente
        const Pedro = {
            email: 'pedrotorrente@usp.br',
            senha: 'torrent',
            name: 'Pedro Oliveira Torrente',
            faculdade: 'USP São Carlos',
            curso: 'Engenharia de Computação',
            ano_ingresso: '2021',
            bio: 'Sou o Torrent, faço parte da SAEcOMP e já fiz IC, estou no 7° período graduação e estou fazendo estágio!',
        };
        await setUser(Pedro.email, Pedro);

           //create user Lucas
           const bruna = {
            email: 'bruna@ufscar.br',
            senha: 'bruna',
            name: 'Bruna Lomes',
            faculdade: 'Ufscar São Carlos',
            curso: 'Engenharia Elétrica',
            ano_ingresso: '2022',
            bio: 'Sou a Bruna, faço parte da RED e faço IC, estou no 5° período de graduação!',
        };
        await setUser(bruna.email, bruna);

        //!perguntas
        const pergunta1 = {
            user: 'rzzgame@usp.br',
            time: '2024-06-25-18-47-21',
            title: 'Como fazer um app em React Native?',
            content: 'Estou tentando fazer um app em React Native, mas não estou conseguindo. Alguém pode me ajudar?',
            tags: ['React Native', 'App'],
            likes: 0,
        };
        await setQuestion(pergunta1);

        const resposta1pergunta1 = {
            question: '1',
            user: 'lucasegp@usp.br',
            time: '',
            content: 'Você pode seguir o tutorial do React Native, é bem simples e fácil de entender.',
            likes: 0,
        };
        await setAnswer(resposta1pergunta1);

        const resposta2pergunta1 = {
            question: '1',
            user: 'bealomes@usp.br',
            time: '2024-06-25-20-47-21',
            content: 'Você pode acompanhar as aulas da Professora Lina Maria.',
            likes: 0,
        };

        await setAnswer(resposta2pergunta1);

        const pergunta2 = {
            user: 'bealomes@usp.br',
            time: '2024-06-25-17-47-01',
            title: 'O que é um algoritmo?',
            content: 'Estou com dificuldades em entender o que é um algoritmo, alguém pode me ajudar?',
            tags: ['Algoritmo'],
            likes: 0,
        };
        await setQuestion(pergunta2);

        const pergunta3 = {
            user: 'bealomes@usp.br',
            time: '2024-06-26-13-12-21-29',
            title: 'Como fazer um algoritmo?',
            content: 'Estou com dificuldades em fazer um algoritmo, alguém pode me ajudar?',
            tags: ['Algoritmo'],
            likes: 0,
        };
        await setQuestion(pergunta3);

        const pergunta4 = {
            user: 'bealomes@usp.br',
            time: '2024-06-28-08-12-21-29',
            title: 'Como testar um algoritmo?',
            content: 'Estou com dificuldades em testar um algoritmo, alguém pode me ajudar?',
            tags: ['Algoritmo'],
            likes: 0,
        };
        await setQuestion(pergunta4);

        const pergunta5 = {
            user:'rzzgame@usp.br',
            time:'2024-06-25-19-00-00',
            title:'Como calcular derivada',
            content:'Qual é a derivada da função f(x)=x^2+3x?',
            tags:['Cálculo'],
            likes:0
        }

        await setQuestion(pergunta5);

        const resposta1pergunta5 = {
            question: '5',
            user:'lucasegp@usp.br',
            time:'2024-06-25-19-47-21',
            content:' A derivada de x^2 é 2x e a derivada de 3x é 3, então a derivada de f(x)=x^2+3x é 2x+3.',
            likes:0
        }

        await setAnswer(resposta1pergunta5);

        const resposta2pergunta5 = {
            question: '5',
            user:'pedrotorrente@usp.br',
            time:'2024-06-25-20-40-21',
            content:'Esta resposta está incorreta porque adiciona um valor constante de 6, o que não faz sentido na diferenciação. O valor correto é 2x+3.',
            likes:0
        }

        await setAnswer(resposta2pergunta5);

        const pergunta6 = {
            user:'lucasegp@usp.br',
            time:'2024-06-20-19-47-21',
            title:'Velocidade Média',
            content:'Qual é a fórmula para calcular a velocidade média?',
            tags:['Física'],
            likes:0
        }

        await setQuestion(pergunta6);

        const resposta1pergunta6 = {
            question: '6',
            user:'rzzgame@usp.br',
            time:'2024-06-21-19-47-21',
            content:'A velocidade média é calculada dividindo a mudança na posição (Δs) pelo tempo (Δt).',
            likes:0
        }

        await setAnswer(resposta1pergunta6);

        const pergunta7 = {
            user:'pedrotorrente@usp.br',
            time:'2024-06-25-15-40-20',
            title:'Formação do ouro',
            content:' Qual é o símbolo químico do elemento ouro?',
            tags:['Química'],
            likes:0
        }
        await setQuestion(pergunta7);

        const resposta1pergunta7 = {
            question: '7',
            user:'lucasegp@usp.br',
            time:'2024-06-25-18-40-20',
            content:'"Au" é o símbolo químico correto para o elemento ouro, derivado do seu nome em latim, "aurum".',
            likes:0
        }

        await setAnswer(resposta1pergunta7);

        const resposta2pergunta7 = {
            question: '7',
            user:'bruna@ufscar.br',
            time:'2024-06-25-19-30-20',
            content:' Quem respondeu Al esta está errado. "Al" é o símbolo químico para o alumínio.',
            likes:0
        }

        await setAnswer(resposta2pergunta7);

        const resposta3pergunta7 = {
            question: '7',
            user:'b.lomes@usp.br',
            time:'2024-06-25-21-40-20',
            content:'Au" é o símbolo químico correto para o elemento ouro',
            likes:0
        }
        
        await setAnswer(resposta3pergunta7);


        const pergunta8 = {
            user:'bruna@ufscar.br',
            time:'2024-06-02-15-40-20',
            title:'Computação Distribuída',
            content:' Em um ambiente Hadoop, qual componente é responsável pela execução de tarefas de mapeamento e redução?',
            tags:['Algoritmos'],
            likes:0
        }

        await setQuestion(pergunta8);

        const resposta1pergunta8 = {
            question: '8',
            user:'lucasegp@usp.br',
            time:'2024-06-03-15-10-20',
            content:'YARN gerencia os recursos do cluster e coordena a execução de tarefas, incluindo mapeamento e reduçã',
            likes:0
        }

        await setAnswer(resposta1pergunta8);

        const resposta2pergunta8 = {
            question: '8',
            user:'rzzgame@usp.br',
            time:'2024-06-02-17-40-20',
            content:'HDFS (Hadoop Distributed File System) -> Explicação: Esta resposta está incorreta porque HDFS é responsável pelo armazenamento distribuído de dados, não pela execução de tarefas.',
            likes:0
        }

        await setAnswer(resposta2pergunta8);

        const resposta3pergunta8 = {
            question: '8',
            user:'pedrotorrente@usp.br',
            time:'2024-06-02-20-40-20',
            content:'Hive -> Explicação: Esta resposta está incorreta porque Hive é uma infraestrutura de data warehouse que facilita a consulta de dados armazenados no HDFS usando uma linguagem similar ao SQL. A execução de tarefas é gerenciada pelo YARN.',
            likes:0
        }

        await setAnswer(resposta3pergunta8);

        const pergunta9 = {
            user:'pedrotorrente@usp.br',
            time:'2024-06-10-15-40-20',
            title:'Filas em programação',
            content:'Qual estrutura de dados é mais adequada para implementar uma fila?',
            tags:['Algoritmos'],
            likes:0
        }

        await setQuestion(pergunta9);

        const resposta1pergunta9 = {
            question: '9',
            user:'rzzgame@usp.br',
            time:'2024-06-10-20-20-20',
            content:' A estrutura de dados mais adequada para implementar uma fila é a própria Fila (Queue), que segue a regra FIFO (First In, First Out).',
            likes:0
        }

        await setAnswer(resposta1pergunta9);

        const resposta2pergunta9 = {
            question: '9',
            user:'b.lomes@usp.br',
            time:'2024-06-14-20-20-20',
            content:' Uma Lista Encadeada pode ser usada para implementar uma fila, mas requer manipulação adicional para garantir que a inserção e a remoção sigam a regra FIFO. A estrutura mais direta é a Fila (Queue).',
            likes:0
        }

        await setAnswer(resposta2pergunta9);

        const pergunta10 = {
            user:'rzzgame@usp.br',
            time:'2024-06-10-16-40-20',
            title:'Computação de Alto Desempenho',
            content:' Qual é a principal vantagem do uso de MPI (Message Passing Interface) em um sistema de computação de alto desempenho?',
            tags:['Algoritmos'],
            likes:0
        }

        await setQuestion(pergunta10);

        const resposta1pergunta10 = {
            question: '10',
            user:'pedrotorrente@usp.br',
            time:'2024-06-10-16-20-20',
            content:'MPI é projetado para permitir a comunicação eficiente entre processos em sistemas distribuídos, facilitando a escalabilidade de aplicações em clusters de computadores.',
            likes:0
        }

        await setAnswer(resposta1pergunta10);

        const resposta2pergunta10 = {
            question: '10',
            user:'lucasegp@usp.br',
            time:'2024-06-10-22-41-20',
            content:'Embora MPI possa ser usado em sistemas de memória compartilhada, sua principal vantagem é em sistemas de memória distribuída. Em sistemas de memória compartilhada, OpenMP pode ser mais apropriado.',
            likes:0
        }
        await setAnswer(resposta2pergunta10);

        console.log("Setting user Beatriz");
        await setLoggedUser(beatriz);


    } catch (error) {
        console.error('Failed to fill database', error);
    }
};