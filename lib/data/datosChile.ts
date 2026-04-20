export interface DatoOficial {
  indicador: string;
  valor: string;
  variacion: string;
  dir: "up" | "down" | "flat";
  periodo: string;
  fuente: string;
  fuenteUrl: string;
  descripcion: string;
  /** Nota editorial corta. PLACEHOLDER — reemplazar con análisis real cada semana. */
  microNota?: string;
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
    // PLACEHOLDER — reemplazar con nota editorial real cada semana
    microNota: "BCCh mantiene pausa — crédito hipotecario y consumo seguirán caros.",
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
    // PLACEHOLDER — reemplazar con nota editorial real cada semana
    microNota: "Baja mensual por energía — presión inflacionaria cede.",
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
    // PLACEHOLDER — reemplazar con nota editorial real cada semana
    microNota: "Inflación sobre meta BCCh — ajuste de precios sigue activo.",
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
    // PLACEHOLDER — reemplazar con nota editorial real cada semana
    microNota: "Dólar al alza por tensión global — importaciones más caras.",
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
    // PLACEHOLDER — reemplazar con nota editorial real cada semana
    microNota: "Empleo formal estancado — presión sobre salarios y consumo.",
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
    // PLACEHOLDER — reemplazar con nota editorial real cada semana
    microNota: "Crecimiento moderado — inversión privada sigue lenta.",
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
    // PLACEHOLDER — reemplazar con nota editorial real cada semana
    microNota: "UF sigue subiendo — créditos indexados y arriendos encarecen.",
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
    // PLACEHOLDER — reemplazar con nota editorial real cada semana
    microNota: "Bolsa a la baja — incertidumbre global pesa en blue chips.",
  },
];
