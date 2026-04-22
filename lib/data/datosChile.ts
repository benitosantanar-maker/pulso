/**
 * INDICATOR_INSIGHTS — capa editorial de indicadores de Chile.
 *
 * Contiene SOLO los textos interpretativos (insights) y metadatos fijos.
 * Los VALORES reales (valor, variación, fecha) vienen de mindicador.cl
 * a través de lib/api/indicators.ts.
 *
 * Claves = códigos de mindicador.cl
 * PLACEHOLDER — revisar microNota e insights cada semana con datos actuales.
 */

export interface IndicatorInsight {
  /** Nombre completo del indicador */
  name: string;
  /** Código corto para display */
  code: string;
  /** Descripción técnica */
  description: string;
  source: string;
  sourceUrl: string;
  /** Nota editorial de 1 línea — PLACEHOLDER, actualizar semanalmente */
  microNota?: string;
  // ── Insights por persona — PLACEHOLDER, actualizar semanalmente ──
  /** Cómo aparece en ramos, qué concepto conecta */
  insight_student: string;
  /** Impacto en empresas, sectores, decisiones profesionales */
  insight_worker: string;
  /** Impacto en vida cotidiana: bolsillo, créditos, empleo */
  insight_citizen: string;
  /** Slug del glosario en /recursos */
  relatedConceptSlug?: string;
  relatedConceptLabel?: string;
}

export const INDICATOR_INSIGHTS: Record<string, IndicatorInsight> = {
  tpm: {
    name: "Tasa de Política Monetaria",
    code: "TPM",
    description: "Tasa de referencia que fija el Banco Central para influir en el costo del crédito y la inflación",
    source: "BCCh",
    sourceUrl: "https://www.bcentral.cl",
    microNota: "BCCh mantiene pausa — crédito hipotecario y consumo seguirán caros.",
    insight_student:
      "La TPM es el eje de los modelos de política monetaria en Macro. Con ella explicas la transmisión al consumo y la inversión (canal tasa de interés). Cuando el BCCh pausa, la brecha respecto a la meta de inflación se cierra — úsalo para discutir el IPoM en tus ramos.",
    insight_worker:
      "Determina el costo de financiamiento corporativo: deuda flotante, líneas de crédito, factoring. Una pausa prolongada justifica renegociar deuda flotante a tasa fija y postergar capex no urgente. En banca, el spread de créditos cambia con cada movimiento.",
    insight_citizen:
      "Si tienes crédito hipotecario o de consumo, la TPM define el piso de tu tasa. Mientras no baje, tus cuotas no mejoran. Si ahorras en depósito a plazo, tasas del 7–8% anuales siguen siendo atractivas frente a la inflación.",
    relatedConceptSlug: "tasa-de-politica-monetaria",
    relatedConceptLabel: "TPM",
  },

  ipc: {
    name: "IPC (inflación anual)",
    code: "IPC",
    description: "Índice de Precios al Consumidor — variación porcentual acumulada en 12 meses",
    source: "INE",
    sourceUrl: "https://www.ine.gob.cl",
    microNota: "Inflación sobre meta BCCh — presión de precios activa.",
    insight_student:
      "El IPC anual vs la meta del BCCh (3% ±1%) es el dato central para discutir política monetaria. Cuando el IPC supera la banda, el BCCh tiene presión para no recortar la TPM — así se conectan ambos indicadores en Macro.",
    insight_worker:
      "Las negociaciones salariales, contratos en UF y márgenes en empresas con costos importados se calibran contra el IPC real. Si el IPC baja más rápido que los salarios, el poder adquisitivo real sube — dato clave para RRHH y análisis de consumo.",
    insight_citizen:
      "El IPC mide cuánto se encarece la canasta que consumes. Si tu sueldo no subió al menos lo que subió el IPC en el año, perdiste poder de compra. Monitoréalo para calibrar negociaciones salariales o renovaciones de arriendo.",
  },

  dolar: {
    name: "Dólar observado",
    code: "USD/CLP",
    description: "Tipo de cambio dólar-peso chileno, publicado diariamente por el Banco Central",
    source: "BCCh",
    sourceUrl: "https://www.bcentral.cl",
    microNota: "Dólar al alza — importaciones más caras, poder de compra en USD comprimido.",
    insight_student:
      "El tipo de cambio conecta con Economía Internacional (modelos Mundell-Fleming, paridad de tasas de interés). Úsalo para explicar por qué un dólar más caro encarece la inflación importada y qué puede hacer el BCCh al respecto sin sacrificar el crecimiento.",
    insight_worker:
      "Importadores ven costos subir directamente. Exportadoras (cobre, fruta, vino) mejoran márgenes en pesos. En consultoría y banca, el tipo de cambio es el contexto macro que hay que tener claro antes de cualquier análisis de empresa con operaciones internacionales.",
    insight_citizen:
      "Un dólar más caro encarece electrónica, combustible, viajes y productos con componentes importados. Si tienes ahorros en USD, tu poder de compra en pesos sube. Si debes en dólares, tu deuda real aumenta.",
  },

  uf: {
    name: "Unidad de Fomento",
    code: "UF",
    description: "Unidad de cuenta indexada a la inflación, publicada diariamente por la CMF",
    source: "CMF",
    sourceUrl: "https://www.cmfchile.cl",
    microNota: "UF sigue subiendo — créditos indexados y arriendos se encarecen.",
    insight_student:
      "La UF es un instrumento de indexación único en Chile que aparece en créditos hipotecarios, contratos de arriendo y emisiones de bonos. En Finanzas, úsala para calcular el costo real de un crédito hipotecario: si el IPC proyectado es 4%, una tasa UF+3% equivale a ~7% nominal.",
    insight_worker:
      "La mayoría de los contratos de arrendamiento de oficinas, leasing y contratos B2B de largo plazo se pactan en UF. Una UF en alza encarece esos compromisos en pesos — argumento para revisar contratos o fijar precios en UF cuando el proveedor eres tú.",
    insight_citizen:
      "Si tu dividendo hipotecario o arriendo está en UF, sube cada mes mientras haya inflación. Calcula cuánto ha subido tu UF en el año y súmalo a tu presupuesto mensual. Si puedes renegociar a tasa fija en pesos, evalúalo.",
  },

  euro: {
    name: "Euro",
    code: "EUR/CLP",
    description: "Tipo de cambio euro-peso chileno",
    source: "BCCh",
    sourceUrl: "https://www.bcentral.cl",
    microNota: "Euro sigue la dinámica del dólar — relevante para importaciones europeas.",
    insight_student:
      "El euro vs peso ilustra la dependencia del tipo de cambio chileno a factores externos: dólar global, precios del cobre y riesgo político local. Úsalo para discutir determinantes del tipo de cambio en Economía Internacional.",
    insight_worker:
      "Chile importa maquinaria, autos y vinos europeos. Un euro más caro encarece esas importaciones. Para empresas con proveedores europeos, es señal para revisar contratos o buscar proveedores alternativos.",
    insight_citizen:
      "Si viajas a Europa o compras productos de marcas europeas, el tipo de cambio EUR/CLP determina cuánto pagas en pesos. También afecta el costo de estudios o programas en Europa.",
  },

  libra_cobre: {
    name: "Cobre (LME)",
    code: "Cobre",
    description: "Precio internacional del cobre en USD por libra, en el London Metal Exchange",
    source: "LME / BCCh",
    sourceUrl: "https://www.bcentral.cl",
    microNota: "Cobre sobre USD 4,7/lb — impacto fiscal positivo para Chile.",
    insight_student:
      "El precio del cobre es el commodity más relevante para Chile: cada centavo adicional genera ~USD 60M en ingresos fiscales. En Macro, úsalo para calcular el impacto en la regla fiscal, el PIB y el tipo de cambio (el peso chileno es una 'moneda cuprícola').",
    insight_worker:
      "Empresas proveedoras de Codelco, fondos con exposición minera y bancos con crédito al sector ajustan sus modelos cuando el cobre se mueve. Si trabajas en esos sectores, el precio del cobre es el primer dato que revisas en la mañana.",
    insight_citizen:
      "Un cobre caro llena las arcas del Estado — más margen para gasto en salud, educación y pensiones, o para reducir deuda. El impacto en tu vida cotidiana es indirecto pero real: depende de si el gobierno ahorra el excedente o lo gasta.",
  },

  tasa_desempleo: {
    name: "Desempleo",
    code: "Desempleo",
    description: "Tasa de desocupación trimestral móvil del Gran Santiago y total nacional",
    source: "INE",
    sourceUrl: "https://www.ine.gob.cl",
    microNota: "Empleo formal estancado — mercado laboral más competitivo.",
    insight_student:
      "El desempleo es un indicador rezagado del ciclo económico — cuando el PIB cae, el desempleo sube meses después. En Macro, úsalo junto al PIB y la brecha de producto para analizar el ciclo completo. En Economía Laboral, discute por qué el desempleo estructural en Chile se mantiene sobre 7% incluso en expansión.",
    insight_worker:
      "Más desempleo implica mayor oferta de trabajo, lo que reduce el poder negociador de los empleados y puede frenar alzas salariales. Para empresas en sectores con alta rotación (retail, servicios), más desempleo baja los costos de contratación pero también puede indicar menor demanda futura.",
    insight_citizen:
      "Si estás buscando trabajo o pensando en cambiarte, el mercado laboral más competitivo significa más candidatos por cada vacante. Invierte en diferenciarte. Si tienes trabajo, menos presión salarial significa que los aumentos serán más difíciles de negociar en el corto plazo.",
  },

  bitcoin: {
    name: "Bitcoin",
    code: "BTC/USD",
    description: "Precio del Bitcoin en dólares estadounidenses",
    source: "Referencia de mercado",
    sourceUrl: "https://www.bcentral.cl",
    microNota: "Bitcoin volátil — activo de riesgo que sigue el ciclo global.",
    insight_student:
      "Bitcoin es el caso de estudio más vigente para discutir teoría monetaria, la definición de dinero y los activos de riesgo. En Finanzas, úsalo para hablar de volatilidad, correlación con otros activos de riesgo y regulación de criptomonedas (que Chile aún debate).",
    insight_worker:
      "Empresas de servicios financieros, exchanges y algunas tesorerías corporativas monitorean Bitcoin como proxy del apetito global por riesgo. Una correlación alta con el Nasdaq en ciclos de alza/baja hace que sea indicador de sentimiento para activos de mayor riesgo.",
    insight_citizen:
      "Si tienes ahorro en Bitcoin, es un activo altamente volátil — no recomendable como fondo de emergencia. Úsalo solo si tienes horizonte largo y tolerancia a caídas del 50% o más. La regulación en Chile aún es difusa, así que considera los riesgos de custodia.",
  },
};

/** Indicadores que se muestran en el dashboard, en ese orden */
export const DASHBOARD_INDICATOR_IDS = [
  "tpm",
  "ipc",
  "dolar",
  "uf",
  "libra_cobre",
  "tasa_desempleo",
  "euro",
  "bitcoin",
] as const;
