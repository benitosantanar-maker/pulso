export interface DatoOficial {
  indicador: string;
  valor: string;
  variacion: string;
  dir: "up" | "down" | "flat";
  periodo: string;
  fuente: string;
  fuenteUrl: string;
  descripcion: string;
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
  },
  {
    indicador: "Tipo de cambio USD/CLP",
    valor: "$950",
    variacion: "+0,3%",
    dir: "up",
    periodo: "18 Abr 2026",
    fuente: "BCCh",
    fuenteUrl: "https://www.bcentral.cl",
    descripcion: "Dólar observado Banco Central de Chile",
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
  },
  {
    indicador: "PIB proyectado",
    valor: "2,1%",
    variacion: "−0,3pp",
    dir: "down",
    periodo: "2026 (FMI)",
    fuente: "FMI / BCCh",
    fuenteUrl: "https://www.imf.org",
    descripcion: "Crecimiento del PIB real proyectado para el año",
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
  },
];
