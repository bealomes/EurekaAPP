import {useStyles, createStyleSheet} from 'styles';
import {View, Text} from 'react-native';
import {Image} from 'react-exo/image';
import {BotaoAzul} from 'components/page-1/base/botao-azul';
import AkarIconsSearch from 'assets/svg/akariconssearch.svg';
import Share from 'assets/svg/share.svg';
import Vector from 'assets/svg/vector.svg';
import WifiTethering from 'assets/svg/wifitethering.svg';
import WifiTethering2 from 'assets/svg/wifitethering2.svg';
import bolinhas from 'assets/img/bolinhas.png';
import ellipse1 from 'assets/img/ellipse1.png';
import ellipse2 from 'assets/img/ellipse2.png';
import ellipse22 from 'assets/img/ellipse22.png';
import ellipse23 from 'assets/img/ellipse23.png';
import icon1 from 'assets/img/icon1.png';

export interface InicioCelularProps {
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export function InicioCelular(props: InicioCelularProps) {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root} testID={props.testID ?? "3001:124"}>
      <View style={styles.caebcalho} testID="139:3">
        <View style={styles.cabecalhoEsquerdo} testID="139:4">
          <Text style={styles.tireSuasDuvidas} testID="139:5">
            {`Tire suas
Dúvidas`}
          </Text>
          <View style={styles.group1} testID="139:6">
            <Text style={styles.compartilheSeuConhecimentoComOutrasPessoas} testID="139:7">
              {`Compartilhe seu conhecimento
com outras pessoas!`}
            </Text>
            <Share/>
          </View>
        </View>
        <View style={styles.barraDePesquisa} testID="139:11">
          <View style={styles.rectangle9} testID="139:12"/>
          <Text style={styles.qualASuaPergunta} testID="139:13">
            {`Qual a sua pergunta?`}
          </Text>
          <Image url={ellipse1} width={42.35} height={41.32}/>
          <AkarIconsSearch/>
        </View>
      </View>
      <View style={styles.barraDoMeio} testID="139:21">
        <View style={styles.rectangle10} testID="139:22"/>
        <View style={styles.group3} testID="139:23">
          <View style={styles.textoBox} testID="139:24">
            <Text style={styles.oQueEOEureka} testID="139:25">
              {`O QUE É O EUREKA?`}
            </Text>
            <Text style={styles.plataformaParaPerguntasDeExatas} testID="139:26">
              {`Plataforma para perguntas de exatas`}
            </Text>
          </View>
          <View style={styles.textoBox1} testID="139:27">
            <View style={styles.bot1} testID="139:28">
              <Image url={ellipse2} width={36} height={36}/>
              <WifiTethering/>
            </View>
            <Text style={styles.conecteSeComOutros} testID="139:33">
              {`Conecte-se com outros!`}
            </Text>
            <Text style={styles.participeAtivamenteDeNossaComunidadeGanhePontosEMedalhasAoResponderPerguntas} testID="139:34">
              {`Participe ativamente de nossa comunidade! Ganhe pontos e medalhas ao responder perguntas.`}
            </Text>
          </View>
          <View style={styles.textoBox12} testID="139:35">
            <View style={styles.bot12} testID="139:36">
              <Image url={ellipse22} width={36} height={36}/>
              <WifiTethering2/>
            </View>
            <Text style={styles.pergunteEResponda} testID="139:41">
              {`Pergunte e responda!`}
            </Text>
            <Text style={styles.facaPerguntasSobreCalculoGeometriaAnaliticaFisicaEOutrasMateriasRecebaAjudaEAjudeAosOutrosUsuarios} testID="139:42">
              {`Faça perguntas sobre Cálculo, Geometria Analítica, Física e outras matérias! Receba ajuda e ajude aos outros usuários.`}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.usuarios} testID="139:43">
        <View style={styles.user1} testID="139:44">
          <View style={styles.rectangle11} testID="139:45"/>
          <View style={styles.group4} testID="139:46">
            <Image url={ellipse23} width={56.06} height={50}/>
            <Vector/>
            <Text style={styles.usuario1} testID="139:49">
              {`Usuário 1`}
            </Text>
            <Text style={styles.faculdadeDaPessoa1} testID="139:50">
              {`Faculdade da Pessoa 1`}
            </Text>
            <Text style={styles.nossaMuitoLegalEssaPlataformaQueOToiEABiaCriaramAcheiMuitoIncrivelVouUsarMuitoTodosOsDiasPorAquiConseguiResolverAMinhaProvaInteiraDeCalculoIEDeFisicaIObrigado} testID="139:51">
              {`“Nossa, muito legal essa plataforma que o Toi e a Bia criaram! Achei muito incrível, vou usar muito, todos os dias! Por aqui consegui resolver a minha prova inteira de Cálculo I e de Física I, obrigado!”`}
            </Text>
            <Image url={bolinhas} width={50} height={10}/>
          </View>
        </View>
        <Text style={styles.agilizeSeuAprendizadoEODeOutros} testID="139:56">
          {`Agilize seu aprendizado
(e o de outros...)`}
        </Text>
      </View>
      <View style={styles.footer} testID="139:57">
        <View style={styles.rectangle14} testID="139:58"/>
        <Text style={styles.politicaDePrivacidadeTermosDeUso} testID="139:59">
          {`Política de Privacidade
Termos de Uso`}
        </Text>
      </View>
      <Image url={icon1} width={43} height={45.47}/>
      <BotaoAzul testID="140:65"/>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    width: 414,
    height: 1686,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  tireSuasDuvidas: {
    width: 264.75601,
    height: 167,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexShrink: 0,
    color: 'rgba(13, 36, 140, 1)',
    fontFamily: 'Nunito',
    fontSize: 61.098,
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: 0.611,
  },
  compartilheSeuConhecimentoComOutrasPessoas: {
    width: 276.05801,
    height: 49.83,
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 0,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Nunito',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0.64,
  },
  caebcalho: {
    width: 370,
    height: 327.319,
    flexShrink: 0,
  },
  cabecalhoEsquerdo: {
    width: 328.87799,
    height: 228,
    flexShrink: 0,
  },
  group1: {
    width: 328.87799,
    height: 49.83,
    flexShrink: 0,
  },
  rectangle9: {
    width: 370,
    height: 39.145,
    flexShrink: 0,
    borderBottomLeftRadius: 28.996,
    borderBottomRightRadius: 28.996,
    borderTopLeftRadius: 28.996,
    borderTopRightRadius: 28.996,
    backgroundColor: 'rgba(226, 228, 238, 1)',
  },
  qualASuaPergunta: {
    color: 'rgba(24, 25, 37, 1)',
    fontFamily: 'Nunito',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0.56,
  },
  barraDePesquisa: {
    width: 370,
    height: 41.319,
    flexShrink: 0,
  },
  rectangle10: {
    width: 370,
    height: 532,
    flexShrink: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'rgba(236, 238, 248, 1)',
  },
  oQueEOEureka: {
    color: 'rgba(183, 184, 195, 1)',
    fontFamily: 'Nunito',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0.64,
  },
  plataformaParaPerguntasDeExatas: {
    width: 273,
    color: 'rgba(13, 36, 140, 1)',
    fontFamily: 'Nunito',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: 0.28,
  },
  barraDoMeio: {
    width: 370,
    height: 532,
    flexShrink: 0,
  },
  group3: {
    width: 326,
    height: 440,
    flexShrink: 0,
  },
  textoBox: {
    width: 273,
    height: 112,
    flexShrink: 0,
  },
  textoBox1: {
    width: 321,
    height: 107,
    flexShrink: 0,
  },
  bot1: {
    width: 36,
    height: 36,
    flexShrink: 0,
  },
  conecteSeComOutros: {
    color: 'rgba(13, 36, 140, 1)',
    fontFamily: 'Nunito',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0.17,
  },
  participeAtivamenteDeNossaComunidadeGanhePontosEMedalhasAoResponderPerguntas: {
    width: 270,
    color: 'rgba(70, 78, 116, 1)',
    fontFamily: 'Nunito',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.16,
  },
  textoBox12: {
    width: 321,
    height: 129,
    flexShrink: 0,
  },
  bot12: {
    width: 36,
    height: 36,
    flexShrink: 0,
  },
  pergunteEResponda: {
    color: 'rgba(13, 36, 140, 1)',
    fontFamily: 'Nunito',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0.17,
  },
  facaPerguntasSobreCalculoGeometriaAnaliticaFisicaEOutrasMateriasRecebaAjudaEAjudeAosOutrosUsuarios: {
    width: 270,
    color: 'rgba(70, 78, 116, 1)',
    fontFamily: 'Nunito',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.16,
  },
  rectangle11: {
    width: 370,
    height: 256,
    flexShrink: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'rgba(236, 238, 248, 1)',
  },
  usuario1: {
    width: 89.697,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Nunito',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0.18,
  },
  faculdadeDaPessoa1: {
    width: 188.364,
    color: 'rgba(70, 78, 116, 1)',
    fontFamily: 'Nunito',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.16,
  },
  nossaMuitoLegalEssaPlataformaQueOToiEABiaCriaramAcheiMuitoIncrivelVouUsarMuitoTodosOsDiasPorAquiConseguiResolverAMinhaProvaInteiraDeCalculoIEDeFisicaIObrigado: {
    width: 292.63599,
    height: 120,
    flexShrink: 0,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Nunito',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.16,
  },
  usuarios: {
    width: 370,
    height: 325,
    flexShrink: 0,
  },
  user1: {
    width: 370,
    height: 256,
    flexShrink: 0,
  },
  group4: {
    width: 292.63599,
    height: 207,
    flexShrink: 0,
  },
  agilizeSeuAprendizadoEODeOutros: {
    color: 'rgba(13, 36, 140, 1)',
    textAlign: 'center',
    fontFamily: 'Nunito',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: 0.25,
  },
  rectangle14: {
    width: 414,
    height: 87,
    flexShrink: 0,
    backgroundColor: 'rgba(67, 97, 238, 1)',
  },
  politicaDePrivacidadeTermosDeUso: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Nunito',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0.56,
  },
  footer: {
    width: 414,
    height: 87,
    flexShrink: 0,
  },
}));
