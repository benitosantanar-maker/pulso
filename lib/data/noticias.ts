import type { Noticia } from "@/types";

export const noticias: Noticia[] = [
  // ── DIARIO FINANCIERO (5) ──────────────────────────────────────────────────
  {
    slug: "df-bcentral-tpm-5-proyecciones-2026",
    titulo: "Banco Central mantiene TPM en 5% y advierte que la inflación no cede",
    bajada: "El Consejo del BCCh pausó el ciclo de recortes y revisó al alza la proyección de inflación para 2026, citando presiones de costos y tipo de cambio.",
    resumen: "En su reunión de abril, el Banco Central mantuvo la Tasa de Política Monetaria (TPM) en 5,0%, marcando una pausa en el ciclo de recortes que comenzó en agosto de 2023. La decisión fue unánime. El IPoM revisó la inflación a 4,1% para 2026, sobre el rango meta de 3%.",
    porQueImporta: "La TPM determina el costo del crédito en toda la economía chilena: hipotecas, créditos de consumo, financiamiento de empresas. Una pausa prolonga el ciclo de encarecimiento del dinero justo cuando el consumo muestra señales de enfriamiento.",
    impactoIC: "Fundamental para modelos de valoración de empresas, análisis de deuda corporativa y estrategias de inversión en renta fija chilena. El diferencial TPM-Fed afecta directamente el tipo de cambio y flujos de capital.",
    contenido: `El Banco Central de Chile mantuvo su tasa de referencia en 5,0% en la reunión de política monetaria de abril de 2026, sorprendiendo a un mercado que asignaba 40% de probabilidad a un recorte adicional de 25 puntos base.

**¿Qué dijo el Consejo?**

El comunicado destacó tres factores que justifican la pausa: la inflación subyacente (sin volátiles) se mantiene en 4,3% anual, el tipo de cambio ha depreciado el peso cerca de 5% en el año, y los salarios nominales crecen por sobre el 6% anual, generando presiones de costos.

**La revisión del IPoM**

El Informe de Política Monetaria de abril revisó la inflación IPC de 3,6% a 4,1% para el cierre de 2026. El crecimiento del PIB se mantiene en el rango 2,0%–2,5%, con sesgo a la baja por incertidumbre externa.

**Próximos pasos**

El mercado de swaps descuenta que el próximo recorte llegará en julio o septiembre, dependiendo de los datos de inflación de mayo y junio. Una sorpresa al alza en el IPC postergaría el ciclo.

**Implicancias para el peso**

La pausa del BCCh, mientras la Fed también pausa, mantiene el diferencial de tasas estable. El dólar oscila en torno a los $950–960, un nivel que CORFO considera "manejable para los exportadores medianos".`,
    categoria: "economia",
    fuente: "Diario Financiero",
    fuenteUrl: "https://www.df.cl",
    fecha: "2026-04-18",
    tiempoLectura: 4,
    destacada: true,
    principal: true,
    tags: ["Banco Central", "TPM", "inflación", "Chile"],
  },
  {
    slug: "df-retail-chileno-primer-trimestre",
    titulo: "Retail chileno anota caída de 3,2% en ventas reales en el primer trimestre",
    bajada: "Las grandes tiendas lideran la baja mientras el canal online sigue ganando participación. El consumidor prioriza necesidades sobre aspiracionales.",
    resumen: "Según la CNC, las ventas del retail en Chile cayeron 3,2% real en Q1 2026 versus el mismo período del año anterior. Falabella, Ripley y La Polar registraron bajas de entre 4% y 7% en sus reportes de tráfico. El canal e-commerce creció 8% pero no compensa el total.",
    porQueImporta: "El retail es el termómetro más directo del consumo privado, que representa el 65% del PIB chileno. Una caída sostenida en ventas presiona márgenes, empleo y confianza empresarial.",
    impactoIC: "Señal clave para análisis de estados financieros de empresas listadas, estrategia de marcas de consumo masivo y modelos de proyección económica con enfoque en demanda interna.",
    contenido: `El primer trimestre de 2026 confirmó lo que los indicadores adelantados venían anticipando: el consumidor chileno está en modo defensivo.

**Los números de la CNC**

La Cámara Nacional de Comercio reportó una caída de 3,2% real en ventas del sector retail para Q1 2026, la segunda caída consecutiva tras el -1,8% del Q4 2025.

**Por segmento:**
- Tiendas por departamento: -6,4%
- Supermercados: +1,2% (los únicos en verde)
- Ferreterías y hogar: -4,1%
- Vestuario y calzado: -8,3%
- E-commerce: +8,0% (pero desde una base menor)

**¿Por qué cae el consumo?**

El encarecimiento del crédito de consumo (tasas promedio sobre 30% anual para tarjetas), el alza del arriendo y la incertidumbre laboral en sectores como construcción y manufactura explican el ajuste. Además, el efecto de los retiros de pensiones se extinguió completamente.

**Lo que buscan las marcas**

Falabella anunció un plan de reducción de locales y enfoque en la experiencia digital. Ripley acelera su modelo de marketplace. La presión sobre márgenes lleva a negociaciones duras con proveedores.`,
    categoria: "negocios",
    fuente: "Diario Financiero",
    fuenteUrl: "https://www.df.cl",
    fecha: "2026-04-16",
    tiempoLectura: 4,
    destacada: true,
    principal: false,
    tags: ["retail", "consumo", "Chile", "Falabella"],
  },
  {
    slug: "df-codelco-produccion-q1-2026",
    titulo: "Codelco produce 10% menos en Q1 y presiona el presupuesto fiscal",
    bajada: "La estatal más importante del mundo enfrenta retrasos en proyectos estructurales, mina envejecida y costos operativos al alza.",
    resumen: "Codelco produjo 342.000 toneladas de cobre en el primer trimestre de 2026, un 10,3% menos que el mismo período de 2025. Los retrasos en el proyecto Rajo Inca y problemas operacionales en Chuquicamata explican la mayor parte de la caída.",
    porQueImporta: "Codelco aporta cerca del 10% de los ingresos fiscales de Chile y es el mayor empleador del norte del país. Su desempeño impacta directamente en el presupuesto público y la agenda de inversión del Estado.",
    impactoIC: "Clave para análisis del sector minero, finanzas públicas chilenas y cualquier tesis de inversión ligada al cobre. El deterioro de Codelco es un problema estructural que ya tiene más de una década.",
    contenido: `Codelco publicó sus resultados del primer trimestre con una producción de 342.000 toneladas de cobre fino, la cifra más baja para un Q1 desde 2015.

**Los proyectos que no despegan**

Rajo Inca, el proyecto más importante de la empresa, registra un retraso adicional de 8 meses en su cronograma. El costo del proyecto ya supera en 35% el presupuesto original aprobado en 2021.

**Chuquicamata underground**

La conversión de Chuquicamata de mina a rajo abierto a subterránea, el proyecto más ambicioso de la historia de Codelco, opera al 62% de su capacidad diseñada tres años después de su inauguración.

**El impacto fiscal**

Con el precio del cobre en USD 4,78/lb, Codelco debería generar ingresos fiscales récord. Sin embargo, los menores volúmenes y los costos crecientes (C1 de USD 2,10/lb vs USD 1,85/lb el año pasado) limitan el excedente transferible al Estado.

**Perspectivas**

La nueva administración de Codelco se comprometió a recuperar producción hacia 2027 con un plan de USD 8.000 millones en inversión. El financiamiento de ese plan depende de emisión de bonos y aportes del Estado.`,
    categoria: "mercados",
    fuente: "Diario Financiero",
    fuenteUrl: "https://www.df.cl",
    fecha: "2026-04-15",
    tiempoLectura: 4,
    destacada: false,
    principal: false,
    tags: ["Codelco", "cobre", "minería", "Chile"],
  },
  {
    slug: "df-fintechs-chile-regulacion-cmf",
    titulo: "CMF aplica primer marco regulatorio a fintechs y el sector reacciona con cautela",
    bajada: "Las nuevas exigencias de capital y compliance entran en vigor en julio. Para las startups de pagos y crédito, el costo de cumplimiento cambia el modelo de negocio.",
    resumen: "La Comisión para el Mercado Financiero publicó la normativa definitiva de la Ley Fintech chilena, que obliga a 47 empresas a obtener licencias, mantener capital mínimo y reportar incidentes de ciberseguridad. El plazo de adecuación es julio 2026.",
    porQueImporta: "Chile fue pionero en Latinoamérica al aprobar una ley fintech específica. La regulación ordena el mercado y da certeza jurídica, pero también eleva barreras de entrada y puede consolidar el sector en menos actores.",
    impactoIC: "Importante para quienes estudien finanzas, regulación o emprendimiento fintech. La tensión regulación-innovación es un tema central en mercados de capitales modernos.",
    contenido: `La Comisión para el Mercado Financiero publicó las normas de carácter general que regulan a los prestadores de servicios financieros bajo la Ley Fintech (Ley 21.521), dando inicio al plazo de adecuación que vence el 31 de julio de 2026.

**Qué exige la CMF**

Las empresas que operan en pagos, crédito digital, inversión colectiva o intermediación deben:
- Capital mínimo entre UF 2.000 y UF 10.000 según categoría
- Política documentada de gestión de riesgos
- Reportar incidentes de ciberseguridad en 24 horas
- Auditoría externa anual de sistemas

**Quiénes se ven más afectados**

Las startups de crédito digital (Bnext, Cumplo, Destacame) y las plataformas de inversión colectiva (Broota, Cumplo empresas) son las más impactadas por los requisitos de capital. Las grandes plataformas de pagos ya cumplen la mayoría de los requisitos.

**La perspectiva de la industria**

FinteChile, el gremio del sector, celebró la claridad regulatoria pero advirtió que el capital mínimo es "elevado para modelos en etapa temprana". Se esperan entre 5 y 10 fusiones o adquisiciones para cumplir los requisitos.`,
    categoria: "finanzas",
    fuente: "Diario Financiero",
    fuenteUrl: "https://www.df.cl",
    fecha: "2026-04-12",
    tiempoLectura: 4,
    destacada: false,
    principal: false,
    tags: ["fintech", "CMF", "regulación", "Chile"],
  },
  {
    slug: "df-startups-chile-q1-inversiones",
    titulo: "Startups chilenas captaron USD 180M en Q1 2026, con foco en agtech y fintech",
    bajada: "Chile lidera la captación de venture capital en la región como porcentaje del PIB. Los fondos internacionales siguen apostando por el ecosistema.",
    resumen: "Según el reporte trimestral de ACVC, las startups chilenas cerraron USD 180 millones en inversiones durante Q1 2026, con 23 rondas completadas. Agtech (28%), fintech (24%) y climatech (19%) concentran el 71% del capital.",
    porQueImporta: "Chile se consolida como hub de innovación en Latinoamérica. El ecosistema emprendedor genera empleo calificado, exportaciones de servicios y tecnologías que se escalan a otros mercados.",
    impactoIC: "Los datos de VC son indicadores líderes de dónde van los recursos y el talento. Para estudiantes de IC interesados en emprendimiento, innovación o venture capital, estos números muestran dónde están las oportunidades.",
    contenido: `El primer trimestre de 2026 confirmó que el ecosistema de startups chileno se recuperó del enfriamiento global de 2022–2024 y entra en una nueva fase de madurez.

**Desglose de inversiones Q1 2026**

| Sector | Monto (USD M) | N° rondas |
|--------|--------------|-----------|
| Agtech | 50,4 | 6 |
| Fintech | 43,2 | 7 |
| Climatech | 34,2 | 4 |
| SaaS B2B | 29,7 | 4 |
| Salud digital | 22,5 | 2 |

**Las rondas más grandes**

NotCo cerró una ronda Serie D de USD 45M liderada por General Atlantic para expandir su plataforma de IA a Europa. Capitalizr (fintech de factoring) levantó USD 18M en Serie B. Algramo (empaque sustentable) cerró USD 12M con fondos europeos.

**El rol de Corfo**

El programa Startup Chile y el fondo de fondos de Corfo participaron en 8 de las 23 rondas como co-inversor, apalancando capital privado. El gobierno apunta a convertir a Chile en el "Silicon Valley del agtech latinoamericano".`,
    categoria: "emprendimiento",
    fuente: "Diario Financiero",
    fuenteUrl: "https://www.df.cl",
    fecha: "2026-04-10",
    tiempoLectura: 3,
    destacada: false,
    principal: false,
    tags: ["startups", "venture capital", "Chile", "innovación"],
  },

  // ── FINANCIAL TIMES (3) ───────────────────────────────────────────────────
  {
    slug: "ft-fed-mantiene-tasas-aranceles",
    titulo: "La Fed mantiene tasas mientras los aranceles elevan la incertidumbre",
    bajada: "La Reserva Federal pausó su ciclo de recortes ante señales mixtas de inflación y un mercado laboral que se enfría más rápido de lo previsto.",
    resumen: "En su reunión de abril, la Fed decidió mantener la tasa de fondos federales en el rango de 4.25%–4.50%, citando que 'los riesgos de mayor inflación y mayor desempleo han aumentado'. La decisión refleja la presión de los nuevos aranceles sobre los costos de insumos.",
    porQueImporta: "Cuando la Fed duda, los mercados globales también dudan. Una pausa prolongada encarece el crédito, frena la inversión y presiona a economías emergentes como Chile que dependen del diferencial de tasas para atraer capital.",
    impactoIC: "Esta decisión impacta directamente en valoración de activos, costo de capital corporativo y estrategias de cobertura cambiaria. Entender el ciclo de tasas es fundamental en cualquier análisis financiero.",
    contenido: `La Reserva Federal mantuvo sin cambios su tasa de referencia en 4.25%–4.50% en abril, marcando una pausa en el ciclo de flexibilización monetaria.

**¿Qué dijo Powell?**

"Los riesgos de mayor inflación y mayor desempleo han aumentado simultáneamente". Esta combinación recuerda el fantasma de la estanflación de los años 70.

**El rol de los aranceles**

Los nuevos aranceles impuestos a importaciones de China, México y la UE están siendo absorbidos de dos formas:
- **Costos más altos** para empresas que dependen de insumos importados
- **Menores márgenes** para retailers que no pueden traspasar el costo

Goldman Sachs estima que los aranceles actuales añadirán entre 0.5 y 1 punto porcentual a la inflación PCE durante 2026.

**¿Cuándo recortan?**

Los mercados de futuros asignan 35% de probabilidad a un recorte en junio. El consenso apunta a septiembre.

**Implicancias para Chile**

El BCCh enfrenta el mismo dilema: bajar tasas para estimular la economía local, pero arriesgando presión sobre el peso si la Fed no acompaña.`,
    categoria: "economia",
    fuente: "Financial Times",
    fuenteUrl: "https://www.ft.com/global-economy",
    fecha: "2026-04-17",
    tiempoLectura: 4,
    destacada: true,
    principal: false,
    tags: ["Fed", "tasas de interés", "política monetaria", "aranceles"],
  },
  {
    slug: "ft-global-trade-war-escalation",
    titulo: "La guerra comercial escala: EE.UU. eleva aranceles a la UE al 25%",
    bajada: "Washington amplía su política arancelaria a Europa en respuesta a subsidios del sector automotriz, provocando medidas de retaliación inmediatas de Bruselas.",
    resumen: "El gobierno de Trump anunció aranceles del 25% a importaciones europeas de vehículos y acero, efectivos desde mayo. La UE respondió con contramedidas sobre tecnología y productos agrícolas estadounidenses por EUR 30.000 millones.",
    porQueImporta: "Una guerra comercial entre EE.UU. y la UE —las dos mayores economías del mundo— fragmenta las cadenas de suministro globales, eleva costos para consumidores y empresas en todo el mundo, incluido Chile.",
    impactoIC: "Impacto en comercio exterior chileno, volatilidad de tipo de cambio y modelos de proyección macro global. También relevante para estrategia corporativa de empresas con operaciones internacionales.",
    contenido: `La decisión de la administración Trump de extender su política arancelaria a Europa marca una escalada significativa en las tensiones comerciales globales.

**Los sectores afectados**

En el lado europeo, los exportadores más golpeados son:
- Automotriz alemán (BMW, VW, Mercedes): 25% de arancel
- Acero europeo: 50% (subiendo desde el 25% de 2018)
- Maquinaria industrial: 15%

La respuesta de la UE apunta a:
- Bourbon y whiskey americano: 50%
- Motocicletas Harley-Davidson: 31%
- Soja y maíz: 15%
- Servicios digitales (GAFA): nuevo impuesto del 5%

**El impacto en Chile**

Chile tiene TLCs activos con ambos bloques. La fragmentación del comercio global podría crear oportunidades para exportadores chilenos en categorías donde se busquen proveedores alternativos (frutas, proteínas, cobre), pero también genera volatilidad en los precios de importaciones.

**Perspectivas del FMI**

El organismo estimó que una escalada completa de la guerra comercial reduciría el PIB global en 1,2% adicional en 2027, distribuyendo el daño desproporcionadamente hacia economías emergentes.`,
    categoria: "economia",
    fuente: "Financial Times",
    fuenteUrl: "https://www.ft.com/global-economy",
    fecha: "2026-04-14",
    tiempoLectura: 5,
    destacada: false,
    principal: false,
    tags: ["comercio", "aranceles", "EE.UU.", "Europa"],
  },
  {
    slug: "ft-private-equity-latam-2026",
    titulo: "Private equity apuesta por Latinoamérica: USD 12.000M en nuevos fondos",
    bajada: "Blackstone, KKR y Apollo lanzan vehículos dedicados a la región ante el atractivo de valoraciones, crecimiento de clase media y nearshoring.",
    resumen: "Tres de los mayores fondos de private equity del mundo anunciaron estrategias dedicadas a Latinoamérica en Q1 2026, con compromisos de capital total de USD 12.000 millones. México y Brasil lideran el interés, pero Chile y Colombia atraen capital para infraestructura y energías renovables.",
    porQueImporta: "La llegada de PE global a LATAM señaliza madurez de mercados, mejora en marcos regulatorios y oportunidades de consolidación sectorial. Para Chile implica más capital, valuaciones más altas y nuevas opciones de exit para emprendedores.",
    impactoIC: "Relevante para quienes quieran trabajar en banca de inversión, private equity o M&A. También señal para estrategias de crecimiento inorgánico de empresas locales.",
    contenido: `La conferencia LatAm Private Equity de São Paulo de marzo 2026 marcó un punto de inflexión: por primera vez desde 2012, los tres mayores gestores de activos alternativos del mundo —Blackstone, KKR y Apollo— presentaron estrategias dedicadas específicamente a la región.

**Los fondos anunciados**

- **Blackstone LatAm Opportunities Fund**: USD 5.000M, enfocado en infraestructura, retail y servicios financieros en Brasil y México
- **KKR Americas Growth III**: USD 4.000M, con 30% de asignación para LATAM ex-Brasil
- **Apollo LatAm Credit**: USD 3.000M, especializado en deuda corporativa con opciones de conversión

**¿Por qué ahora?**

El nearshoring —la relocalización de manufactura de Asia a América para estar cerca del mercado americano— está generando una demanda acelerada de parques industriales, infraestructura logística y servicios empresariales en México y Colombia.

**Chile en el mapa**

El interés en Chile se concentra en energías renovables (solar, eólica, hidrógeno verde), infraestructura de datos y el sector de servicios financieros. La estabilidad regulatoria chilena es un diferenciador positivo frente a economías más volátiles de la región.`,
    categoria: "finanzas",
    fuente: "Financial Times",
    fuenteUrl: "https://www.ft.com/companies",
    fecha: "2026-04-09",
    tiempoLectura: 5,
    destacada: false,
    principal: false,
    tags: ["private equity", "LATAM", "inversión", "KKR"],
  },

  // ── THE ECONOMIST (2) ─────────────────────────────────────────────────────
  {
    slug: "economist-ai-productivity-paradox",
    titulo: "La IA mejora la productividad, pero los datos aún no lo muestran",
    bajada: "El PIB y la productividad total de factores no reflejan el boom de IA. El debate recuerda la paradoja de Solow de los 90 con los computadores.",
    resumen: "A dos años del lanzamiento de ChatGPT y con USD 300.000 millones invertidos en infraestructura de IA, los indicadores de productividad agregada no muestran el salto esperado. The Economist explora el desfase entre adopción tecnológica e impacto macroeconómico.",
    porQueImporta: "Si la IA no se traduce en productividad medida en el PIB, la justificación para las valuaciones billonarias de las big tech y la inversión masiva en data centers queda en entredicho. O los datos están rezagados, o la IA está sobreestimada.",
    impactoIC: "Central para estrategia e innovación: ¿cómo medir el impacto real de la IA en una organización? ¿Cuándo llega el retorno de la inversión? Preguntas que todo consultor o estratega enfrenta hoy.",
    contenido: `Robert Solow dijo en 1987 que "puedes ver la era de las computadoras en todas partes excepto en las estadísticas de productividad". Casi 40 años después, la misma paradoja amenaza con repetirse con la inteligencia artificial.

**Los números que confunden**

El crecimiento de la productividad total de factores (PTF) en EE.UU. fue de 1,1% en 2025, apenas por encima del promedio histórico de 0,9%. Esto ocurre pese a que:
- 78% de las empresas Fortune 500 reportan uso activo de IA generativa
- La inversión en IA superó USD 300.000 millones en 2025
- Los ingresos de Nvidia crecieron 120% anual

**¿Por qué el desfase?**

Tres hipótesis compiten:
1. **El rezago de Brynjolfsson**: las tecnologías transformadoras toman 20–30 años en impactar la PTF porque requieren reorganización organizacional
2. **El problema de medición**: el PIB no captura bien los beneficios de herramientas digitales gratuitas o de difícil valoración
3. **La hipótesis pesimista**: la IA actual solo automatiza tareas de bajo valor agregado y no toca el núcleo productivo

**La señal de los mercados laborales**

El sector donde más se esperaba desplazamiento —servicios profesionales, legales y contables— ha mostrado caída de solo 0,3% en empleo. Las firmas de servicios reportan que la IA aumenta la cantidad de trabajo que pueden entregar, no que reduce personal.`,
    categoria: "innovacion",
    fuente: "The Economist",
    fuenteUrl: "https://www.economist.com",
    fecha: "2026-04-13",
    tiempoLectura: 5,
    destacada: false,
    principal: false,
    tags: ["IA", "productividad", "macroeconomía", "tecnología"],
  },
  {
    slug: "economist-chile-democracia-economia",
    titulo: "Chile como caso de estudio: cómo la inestabilidad política frena el crecimiento",
    bajada: "The Economist analiza cómo tres procesos constitucionales en cuatro años han afectado la inversión extranjera directa y la confianza empresarial en Chile.",
    resumen: "Un análisis de The Economist ubica a Chile como ejemplo del costo económico de la incertidumbre política prolongada. La inversión extranjera directa cayó de un promedio de USD 12.500M anuales (2015-2019) a USD 8.200M (2022-2025).",
    porQueImporta: "La incertidumbre institucional tiene costos económicos reales y medibles. Chile pasó de ser el modelo a seguir en LATAM a un caso de advertencia sobre cómo la inestabilidad política afecta la trayectoria económica.",
    impactoIC: "Fundamental para entender la interacción entre entorno político, instituciones y decisiones económicas. Relevante para análisis de riesgo país, inversión extranjera y estrategia corporativa en Chile.",
    contenido: `The Economist dedicó su análisis central de América Latina a Chile, país que en cinco años pasó de ser el ejemplo de desarrollo exitoso de la región a un caso de estudio sobre los costos de la inestabilidad política.

**El dato central**

La inversión extranjera directa (IED) en Chile cayó desde un promedio de USD 12.500 millones anuales en el quinquenio 2015-2019 a USD 8.200 millones en el período 2022-2025, una caída del 34%.

**Los tres procesos constitucionales**

La convención constitucional de 2021-2022 (rechazada en plebiscito), el proceso de la comisión experta de 2023 (también rechazado) y el debate actual sobre reformas parciales han creado un estado de incertidumbre jurídica que afecta principalmente a sectores intensivos en capital como minería, energía e infraestructura.

**La percepción de las multinacionales**

Según encuestas de AMCHAM Chile, el 67% de las empresas multinacionales consultadas identifican "incertidumbre regulatoria" como su principal preocupación al evaluar nuevas inversiones en Chile, frente al 31% en 2018.

**El contraste regional**

Mientras Chile lucha por atraer IED, Colombia, Perú y México han aprovechado el nearshoring para capturar inversión que antes iba a Asia. La ventaja competitiva chilena de estabilidad institucional —que justificaba el "Chile premium" en tasas— se ha erosionado.`,
    categoria: "estrategia",
    fuente: "The Economist",
    fuenteUrl: "https://www.economist.com",
    fecha: "2026-04-11",
    tiempoLectura: 5,
    destacada: false,
    principal: false,
    tags: ["Chile", "inversión", "riesgo país", "política"],
  },

  // ── REUTERS (2) ──────────────────────────────────────────────────────────
  {
    slug: "reuters-cobre-record-china",
    titulo: "El cobre toca USD 4.80/lb ante repunte de demanda industrial china",
    bajada: "Los futuros del cobre alcanzaron su nivel más alto en 14 meses mientras los datos de producción industrial china superaron expectativas.",
    resumen: "El cobre spot cerró en USD 4.78/lb, acercándose al récord histórico, impulsado por datos de manufactura en China con PMI en 51.3 y por la apuesta de largo plazo en electrificación global.",
    porQueImporta: "Chile es el mayor productor mundial de cobre. El precio determina directamente los ingresos fiscales, el tipo de cambio y el PIB. Una apreciación sostenida cambia el escenario macro completo.",
    impactoIC: "El precio del cobre tiene efectos directos en IED, tipo de cambio en Chile, cuentas fiscales y expansión de Codelco. Todo modelo macroeconómico para Chile debe considerarlo.",
    contenido: `El cobre cerró en USD 4.78 por libra en el LME, su nivel más alto desde febrero de 2025.

**¿Qué impulsa el precio?**

**Demanda China** — El PMI manufacturero subió a 51.3 en marzo (sobre 50 indica expansión), impulsado por el plan de estímulo de 2 billones de yuan. Las importaciones de cobre en China subieron 12% interanual en Q1.

**Transición energética** — Cada vehículo eléctrico usa 4 veces más cobre que uno de combustión interna. Los cables para redes inteligentes y data centers elevan estructuralmente la demanda.

**Restricciones de oferta** — Codelco enfrenta retrasos en Rajo Inca. Anglo American también reportó menores producciones en sus operaciones chilenas.

**Impacto en Chile**

Cada centavo de aumento en el precio del cobre genera aproximadamente USD 60 millones adicionales para el fisco. Con el precio actual, el impacto fiscal positivo supera los USD 1.800 millones respecto al presupuesto base.`,
    categoria: "mercados",
    fuente: "Reuters Markets",
    fuenteUrl: "https://www.reuters.com/markets/",
    fecha: "2026-04-14",
    tiempoLectura: 3,
    destacada: false,
    principal: false,
    tags: ["cobre", "Chile", "commodities", "China"],
  },
  {
    slug: "reuters-imf-growth-2026",
    titulo: "FMI recorta proyecciones de crecimiento global a 2.8% para 2026",
    bajada: "El Fondo Monetario Internacional revisó a la baja su estimación de crecimiento mundial, citando tensiones comerciales y desaceleración sincronizada.",
    resumen: "El World Economic Outlook del FMI redujo la proyección de crecimiento global de 3.1% a 2.8% para 2026, la estimación más baja desde 2008 excluyendo el período pandémico.",
    porQueImporta: "Las proyecciones del FMI son la referencia macroeconómica global. Un recorte de esta magnitud señala que los riesgos a la baja se están materializando.",
    impactoIC: "Fundamental para análisis macroeconómico, modelos de valoración y tesis de inversión en mercados emergentes.",
    contenido: `El FMI publicó la actualización de su World Economic Outlook marcando la revisión a la baja más significativa desde la pandemia.

**Proyecciones actualizadas**

| Región | Anterior | Nueva |
|--------|----------|-------|
| Global | 3.1% | 2.8% |
| EE.UU. | 2.2% | 1.8% |
| Zona Euro | 1.4% | 1.1% |
| China | 4.5% | 4.2% |
| Chile | 2.4% | 2.1% |

**Factores del recorte**

1. Aranceles de EE.UU.: el FMI estima una reducción del comercio global de 1.5–2.5%
2. Enfriamiento del mercado laboral en economías desarrolladas
3. Crisis inmobiliaria china que pesa sobre el consumo interno

**Mensaje del FMI**

"Los gobiernos deben preservar espacio fiscal para responder a shocks y evitar escalar la guerra arancelaria."`,
    categoria: "economia",
    fuente: "Reuters",
    fuenteUrl: "https://www.reuters.com/markets/econ-world/",
    fecha: "2026-04-12",
    tiempoLectura: 3,
    destacada: false,
    principal: false,
    tags: ["FMI", "crecimiento global", "macroeconomía"],
  },

  // ── MEDIOS LOCALES (3): El Mercurio, La Tercera Pulso, Marketing Brew ─────
  {
    slug: "emercurio-reforma-previsional-avance",
    titulo: "Reforma previsional avanza en el Congreso: cotización adicional al 6%",
    bajada: "La comisión mixta acordó que la cotización adicional del 6% irá en partes iguales a cuentas individuales y a un fondo de reparto. El mercado reacciona con cautela.",
    resumen: "Tras meses de negociación, la comisión mixta del Congreso llegó a un acuerdo de principio sobre el destino de la cotización adicional del 6% del ingreso imponible que incluye la reforma previsional. El 3% iría a cuentas individuales y el 3% a un fondo colectivo de seguro de longevidad.",
    porQueImporta: "La reforma previsional es la ley más importante en tramitación en Chile. Afecta a 12 millones de trabajadores, el mercado de capitales doméstico y el sistema de AFPs. Su diseño final tendrá consecuencias por décadas.",
    impactoIC: "Fundamental para finanzas personales, análisis del mercado de capitales chileno y políticas públicas. El 3% adicional a cuentas individuales implica mayor acumulación de capital en las AFP y presión al alza en el mercado bursátil doméstico.",
    contenido: `El avance en la reforma previsional chilena llega después de más de seis años de debate desde el estallido social de 2019.

**El acuerdo de la comisión mixta**

La fórmula acordada en principio divide la cotización adicional del 6%:
- **3% a cuenta individual** del trabajador, administrada por AFP o un nuevo ente público
- **3% a fondo colectivo** de seguro de longevidad, que complementa la pensión de quienes viven más allá de la expectativa de vida promedio

**Por qué es un acuerdo difícil**

El gobierno originalmente propuso que el 6% fuera completamente al fondo colectivo (reparto), mientras la oposición defendía el 6% a cuentas individuales. El 3/3 es una solución de compromiso que nadie está 100% conforme.

**El impacto en los mercados**

Si se aprueba definitivamente, los fondos de pensiones chilenos recibirán cerca de USD 4.500 millones adicionales anuales para invertir. Dado que los límites de inversión en el extranjero están al tope, parte de esos recursos irán necesariamente al mercado local, empujando al alza la bolsa y el mercado de bonos corporativos.

**El mercado de AFPs**

Las administradoras de fondos de pensiones verán aumentar sus activos bajo gestión, pero también enfrentarán mayor competencia si se crea un ente público administrador del fondo colectivo.`,
    categoria: "finanzas",
    fuente: "El Mercurio Economía",
    fuenteUrl: "https://www.emol.com/economia/",
    fecha: "2026-04-16",
    tiempoLectura: 5,
    destacada: false,
    principal: false,
    tags: ["reforma previsional", "AFP", "Chile", "pensiones"],
  },
  {
    slug: "latercera-pulso-salarios-minimos-chile",
    titulo: "Salario mínimo subirá a $620.000 en julio: impacto en empresas y empleo",
    bajada: "El gobierno propone elevar el mínimo desde $500.000 a $620.000 en un solo ajuste. El debate entre competitividad, inflación y distribución del ingreso vuelve al centro.",
    resumen: "El Ejecutivo envió al Congreso el proyecto de reajuste del salario mínimo que lo llevaría a $620.000 mensuales a partir de julio 2026, un alza del 24% nominal que supera con creces el IPC acumulado de 4,1%. Las organizaciones empresariales alertan sobre impacto en empleo formal.",
    porQueImporta: "El salario mínimo impacta directamente en más de 800.000 trabajadores en Chile y es un referente para negociaciones colectivas en sectores de baja productividad. La magnitud del alza propuesta es inusual.",
    impactoIC: "Tema central en economía laboral, política pública y gestión de empresas con fuerza laboral de baja calificación. Los efectos de empleo de los salarios mínimos son uno de los debates más activos en economía aplicada.",
    contenido: `El debate sobre el salario mínimo en Chile siempre genera tensión entre quienes lo ven como herramienta redistributiva y quienes advierten sus efectos sobre el empleo formal.

**El alza propuesta en contexto**

$620.000 representaría un aumento del 24% nominal sobre los $500.000 actuales, pero solo un 19% real dado el IPC proyectado. Es el mayor ajuste en términos nominales desde la democracia.

**El impacto en las empresas**

Sectores más afectados:
- Retail y supermercados (trabajadores de piso)
- Gastronomía y hotelería
- Seguridad privada
- Construcción (subcontratistas)
- Agricultura temporal

La CPC estima que el alza afectará directamente a 820.000 trabajadores y presionará al alza los precios en sectores intensivos en mano de obra no calificada.

**El debate económico**

La economía laboral moderna sugiere que los salarios mínimos moderados en economías con cierto poder monopsónico del empleador pueden subir sin destruir empleo. Pero un alza del 24% nominal en un año es considerada "fuera del rango seguro" por la mayoría de los economistas laborales consultados.

**La postura del gobierno**

El ministro de Hacienda defendió el proyecto argumentando que el crecimiento de la productividad y las ganancias del sector formal justifican el alza. También anunció subsidios al empleo para pymes que acrediten dificultades de adaptación.`,
    categoria: "economia",
    fuente: "La Tercera Pulso",
    fuenteUrl: "https://www.latercera.com/pulso/",
    fecha: "2026-04-08",
    tiempoLectura: 4,
    destacada: false,
    principal: false,
    tags: ["salario mínimo", "empleo", "Chile", "política económica"],
  },
  {
    slug: "marketing-brew-google-meta-ia-publicidad",
    titulo: "Google y Meta consolidan el 62% del gasto publicitario digital con IA",
    bajada: "Los dos gigantes ampliaron su ventaja gracias a la automatización de campañas. Las agencias replantean su rol en un ecosistema que se gestiona solo.",
    resumen: "Según GroupM, Google y Meta capturaron el 62% del gasto en publicidad digital global en 2025, subiendo desde 56% en 2022. La automatización de campañas basada en IA es el principal driver de esta concentración.",
    porQueImporta: "La consolidación del duopolio tiene implicancias para presupuestos de marketing, independencia estratégica de marcas y el rol de las agencias creativas. El ecosistema publicitario se reorganiza alrededor de las plataformas de IA.",
    impactoIC: "Todo profesional de marketing necesita entender este ecosistema: cómo funciona el bidding automatizado y cómo mantener performance publicitaria cuando la IA gestiona la ejecución.",
    contenido: `El reporte de GroupM confirma lo que muchos en la industria ya sentían: el mercado se divide entre quienes tienen data propia masiva y los que no.

**La concentración aumenta**

| Plataforma | 2022 | 2025 | Δ |
|------------|------|------|---|
| Google | 28.6% | 33.1% | +4.5pp |
| Meta | 17.4% | 18.9% | +1.5pp |
| Amazon Ads | 7.2% | 9.8% | +2.6pp |
| TikTok | 3.1% | 5.4% | +2.3pp |
| Otros | 43.7% | 32.8% | -10.9pp |

**El rol de la IA**

Google Performance Max y Meta Advantage+ son los productos que capturan presupuesto con el pitch: "danos el objetivo y el presupuesto, la IA hace el resto". Funciona para quienes valoran eficiencia sobre control.

**El problema para las marcas**

Más automatización = menos transparencia. Los anunciantes ceden el control sobre placement, audiencias y creative mix.

**Qué hace una agencia hoy**

El trabajo se mueve desde ejecución táctica hacia arquitectura de datos propios (first-party data), construcción de audiencias y creación de assets de alta calidad que "entrenen" bien a los algoritmos.`,
    categoria: "marketing",
    fuente: "Marketing Brew",
    fuenteUrl: "https://www.marketingbrew.com",
    fecha: "2026-04-10",
    tiempoLectura: 4,
    destacada: false,
    principal: false,
    tags: ["publicidad digital", "Google", "Meta", "marketing"],
  },
];

export function getNoticiaBySlug(slug: string): Noticia | undefined {
  return noticias.find((n) => n.slug === slug);
}

export function getNoticiasByCategoria(categoria: string): Noticia[] {
  return noticias.filter((n) => n.categoria === categoria);
}

export function getNoticiasPrincipales(): Noticia[] {
  return noticias.filter((n) => n.principal);
}

export function getNoticiasDestacadas(): Noticia[] {
  return noticias.filter((n) => n.destacada && !n.principal);
}

export function getUltimasNoticias(limit = 8): Noticia[] {
  return [...noticias]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, limit);
}
