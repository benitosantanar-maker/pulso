export interface DatoOficial {
  indicador: string;
  valor: string;
  variacion: string;
  dir: "up" | "down" | "flat";
  periodo: string;
  fuente: string;
  fuenteUrl: string;
  descripcion: string;
  /** Nota editorial breve (1 línea). PLACEHOLDER — reemplazar cada semana. */
  microNota?: string;
  /**
   * Explicación pedagógica: qué significa este indicador para estudiantes,
   * profesionales y ciudadanos. PLACEHOLDER — reemplazar con contexto real.
   */
  contextoParaTi?: string;
  /** Slug del glosario en /recursos — para linkear el concepto relacionado */
  conceptoSlug?: string;
  /** Nombre visible del concepto en el glosario */
  conceptoLabel?: string;
}

export const datosChile: DatoOficial[] = [
  // Banco Central
  {
    indicador: "TPM",
    valor: "5,00%",
    variacion: "Sin cambios",
    dir: "flat",
    periodo: "Abril 2026",
    fuente: "BCCh",
    fuenteUrl: "https://www.bcentral.cl",
    descripcion: "Tasa de Política Monetaria del Banco Central de Chile",
    microNota: "BCCh mantiene pausa — crédito hipotecario y consumo seguirán caros.",
    // PLACEHOLDER — reemplazar con análisis real cada semana
    contextoParaTi:
      "Para el estudiante: la TPM es el eje de los modelos de política monetaria en Macro — úsala para explicar la transmisión al consumo y la inversión. Para el profesional: determina el costo de financiamiento de empresas y proyectos. Para el ciudadano: si tienes crédito hipotecario o de consumo, la TPM afecta directamente tu dividendo o cuota.",
    conceptoSlug: "tasa-de-politica-monetaria",
    conceptoLabel: "TPM",
  },
  {
    indicador: "IPC mensual",
    valor: "−0,1%",
    variacion: "−0,3pp",
    dir: "down",
    periodo: "Marzo 2026",
    fuente: "INE / BCCh",
    fuenteUrl: "https://www.ine.gob.cl",
    descripcion: "Índice de Precios al Consumidor, variación mensual",
    microNota: "Baja mensual por energía — presión inflacionaria cede.",
    // PLACEHOLDER — reemplazar con análisis real cada semana
    contextoParaTi:
      "Para el estudiante: el IPC mensual es el dato central en macroeconomía — úsalo para discutir la brecha de inflación respecto a la meta del BCCh. Para el profesional: empresas ajustan precios de lista y contratos en UF según la inflación real. Para el ciudadano: una baja mensual significa que la canasta básica no se encareció este mes.",
  },
  {
    indicador: "IPC anual",
    valor: "3,8%",
    variacion: "+0,2pp",
    dir: "up",
    periodo: "Marzo 2026",
    fuente: "INE",
    fuenteUrl: "https://www.ine.gob.cl",
    descripcion: "Inflación acumulada en 12 meses",
    microNota: "Inflación sobre meta BCCh — ajuste de precios sigue activo.",
    // PLACEHOLDER — reemplazar con análisis real cada semana
    contextoParaTi:
      "Para el estudiante: la meta de inflación del BCCh es 3% ± 1%. Que el IPC anual esté en 3,8% justifica la pausa en la TPM — buen caso de política monetaria en acción. Para el profesional: negociaciones salariales y contratos de largo plazo se indexan a la inflación real. Para el ciudadano: tu poder adquisitivo se erosiona si tu sueldo no subió al menos un 3,8% este año.",
  },
  {
    indicador: "USD/CLP",
    valor: "$950",
    variacion: "+0,3%",
    dir: "up",
    periodo: "18 Abr 2026",
    fuente: "BCCh",
    fuenteUrl: "https://www.bcentral.cl",
    descripcion: "Dólar observado Banco Central de Chile",
    microNota: "Dólar al alza por tensión global — importaciones más caras.",
    // PLACEHOLDER — reemplazar con análisis real cada semana
    contextoParaTi:
      "Para el estudiante: el tipo de cambio afecta la balanza comercial, la inflación importada y la competitividad exportadora — conecta con modelos Mundell-Fleming. Para el profesional: importadores ven costos subir; exportadoras (cobre, fruta, vino) mejoran márgenes en pesos. Para el ciudadano: electrónica, combustible y viajes al extranjero se encarecen cuando sube el dólar.",
  },
  // INE
  {
    indicador: "Desempleo",
    valor: "8,1%",
    variacion: "+0,4pp",
    dir: "up",
    periodo: "Ene–Mar 2026",
    fuente: "INE",
    fuenteUrl: "https://www.ine.gob.cl",
    descripcion: "Tasa de desocupación trimestral",
    microNota: "Empleo formal estancado — presión sobre salarios y consumo.",
    // PLACEHOLDER — reemplazar con análisis real cada semana
    contextoParaTi:
      "Para el estudiante: la tasa de desempleo es un indicador rezagado del ciclo económico — úsala junto al PIB para analizar el mercado laboral en Macro. Para el profesional: más desempleo reduce el poder negociador de los trabajadores y puede presionar salarios a la baja en sectores con alta rotación. Para el ciudadano: mercado laboral más difícil = más competencia por empleos formales.",
  },
  {
    indicador: "PIB 2026",
    valor: "2,1%",
    variacion: "−0,3pp",
    dir: "down",
    periodo: "2026 (FMI)",
    fuente: "FMI / BCCh",
    fuenteUrl: "https://www.imf.org",
    descripcion: "Crecimiento del PIB real proyectado para el año",
    microNota: "Crecimiento moderado — inversión privada sigue lenta.",
    // PLACEHOLDER — reemplazar con análisis real cada semana
    contextoParaTi:
      "Para el estudiante: el PIB real es la base de modelos de crecimiento en Macro y de valoración de mercados en Finanzas. Un 2,1% es crecimiento modesto para Chile. Para el profesional: economías lentas implican menor demanda interna, presupuestos de inversión más conservadores y menos espacio para alzas de precio. Para el ciudadano: crecimiento bajo se traduce en menos creación de empleo y menores alzas de sueldo.",
    conceptoSlug: "imf-world-economic-outlook",
    conceptoLabel: "IMF WEO",
  },
  // CMF
  {
    indicador: "UF",
    valor: "$38.420",
    variacion: "+0,01%",
    dir: "up",
    periodo: "18 Abr 2026",
    fuente: "CMF",
    fuenteUrl: "https://www.cmfchile.cl",
    descripcion: "Unidad de Fomento — valor diario",
    microNota: "UF sigue subiendo — créditos indexados y arriendos encarecen.",
    // PLACEHOLDER — reemplazar con análisis real cada semana
    contextoParaTi:
      "Para el estudiante: la UF es un instrumento de indexación única en Chile — aparece en contratos, créditos hipotecarios y análisis de política de vivienda. Para el profesional: muchos contratos B2B, arriendos de oficinas y proyectos inmobiliarios se pactan en UF. Para el ciudadano: si tu arriendo o dividendo está en UF, sube todos los meses junto a la inflación.",
  },
  {
    indicador: "IPSA",
    valor: "7.218 pts",
    variacion: "−0,8%",
    dir: "down",
    periodo: "18 Abr 2026",
    fuente: "Bolsa de Santiago / CMF",
    fuenteUrl: "https://www.bolsadesantiago.com",
    descripcion: "Índice de Precio Selectivo de Acciones",
    microNota: "Bolsa a la baja — incertidumbre global pesa en blue chips.",
    // PLACEHOLDER — reemplazar con análisis real cada semana
    contextoParaTi:
      "Para el estudiante: el IPSA es el benchmark de la bolsa chilena — úsalo en Finanzas para calcular retornos del mercado, betas y el costo del equity (CAPM). Para el profesional: el IPSA refleja expectativas sobre la economía y empresas chilenas; una baja sostenida puede afectar planes de IPO o emisión de deuda. Para el ciudadano: si tienes APV en fondos de acciones, el IPSA incide en tu rentabilidad.",
  },
];
