import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

import { documentFiles } from "@/constants/documents";
import type { LandingContent } from "@/types/content";
import { extractCapture, normalizeTextBlock } from "@/utils/text";

/**
 * Reads one source document from project root and decodes it defensively for mixed encodings.
 */
async function readDocument(fileName: string) {
  const absolutePath = path.join(process.cwd(), fileName);
  const buffer = await fs.readFile(absolutePath);
  const utf8Text = buffer.toString("utf8");
  const replacementCount = (utf8Text.match(/�/g) ?? []).length;

  if (replacementCount > 20) {
    return buffer.toString("latin1");
  }

  return utf8Text;
}

/**
 * Tries multiple regex alternatives and returns the first captured value.
 */
function firstCapture(text: string, patterns: RegExp[], fallback: string) {
  for (const pattern of patterns) {
    const value = extractCapture(text, pattern);
    if (value) {
      return normalizeTextBlock(value);
    }
  }

  return fallback;
}

/**
 * Builds a content model for the landing by synthesizing key facts from local legal documents.
 */
export async function buildLandingContent(): Promise<LandingContent> {
  const [fiscalCode, taxLaw, regularizationDecree, extensionDecree] = await Promise.all([
    readDocument(documentFiles.fiscalCode),
    readDocument(documentFiles.taxLaw),
    readDocument(documentFiles.regularizationDecree),
    readDocument(documentFiles.extensionDecree)
  ]);

  const article6Snippet = firstCapture(
    fiscalCode,
    [/Art.{0,3}culo\s*6[^:]*:\s*([\s\S]{40,340})/i, /C[óo]mputo de los plazos\s*Art.{0,3}culo\s*6[:\s]*([\s\S]{40,340})/i],
    "Los plazos tributarios se computan por días hábiles administrativos y, salvo previsión expresa, son improrrogables."
  );

  const generalAliquot = firstCapture(
    taxLaw,
    [/al[ií]cuota general[\s\S]*?(\d+\s*%)/i],
    "3 %"
  );

  const multasRange = firstCapture(
    taxLaw,
    [/Art[íi]culo\s*56:\s*graduable entre la suma de\s*(\$[0-9\.\,]+\s+y la de\s+\$[0-9\.\,]+)/i],
    "$84.400 a $963.200"
  );

  const maxInstallments = firstCapture(
    regularizationDecree,
    [/Planes de 37 a (\d+)\s*cuotas/i],
    "60"
  );

  const regularizationCutoffDate = firstCapture(
    regularizationDecree,
    [/anterioridad al\s*(31\/01\/2022)/i, /anterior al\s*(31 de enero de 2022)/i],
    "31/01/2022"
  );

  const extensionStartDate = firstCapture(
    extensionDecree,
    [/a partir del\s*(04 de noviembre de 2024)/i],
    "04 de noviembre de 2024"
  );

  return {
    hero: {
      badge: "Demo institucional para consultas tributarias provinciales",
      title: "Asistencia fiscal clara en Neuquén",
      subtitle:
        "Landing y chat full screen enfocados en Código Fiscal, Ley Impositiva y regímenes de regularización. Enfoque jurídico, tono sobrio y respuestas orientadas a gestión tributaria real.",
      promptHint: "Hazme una pregunta dificil"
    },
    trustStrip: [
      "Código Fiscal Ley 2680 (modificaciones al 2024)",
      "Ley Impositiva 3479",
      "Decreto 390/2022 - Regularización",
      "DECTO-2024-1474 - Prórroga vigente",
      "Dirección Provincial de Rentas"
    ],
    value: {
      eyebrow: "Propuesta de valor",
      title: "Una interfaz única para interpretar normativa compleja sin fricción operativa",
      description:
        "El contenido de esta demo se sintetiza desde los documentos oficiales incluidos en el proyecto y se transforma en bloques accionables para equipos legales, contables y administrativos.",
      pillars: [
        {
          title: "Marco legal trazable",
          description:
            "Cada respuesta y bloque visual se vincula con normas concretas para reducir ambigüedad en la toma de decisiones.",
          source: "Código Fiscal 2025 y Ley Impositiva 3479"
        },
        {
          title: "Foco en cumplimiento",
          description:
            "Se priorizan obligaciones, plazos, regularización y criterios de liquidación sobre explicaciones abstractas.",
          source: "Código Fiscal, arts. 6, 84, 87 y 89"
        },
        {
          title: "Lectura operativa",
          description:
            "Las normas se reescriben en lenguaje claro para convertir texto legal extenso en pasos concretos de gestión.",
          source: "Documentación fiscal incluida en el repositorio"
        }
      ]
    },
    capabilities: [
      {
        title: "Consulta por artículo y criterio aplicable",
        description:
          "Permite plantear dudas normativas y obtener una respuesta estructurada con enfoque técnico-jurídico.",
        source: "Código Fiscal, Título de Consultas"
      },
      {
        title: "Guía para regularización de deudas",
        description:
          `Incluye el esquema de planes con tramos desde 1 hasta ${maxInstallments} cuotas para deudas vencidas con anterioridad al ${regularizationCutoffDate}.`,
        source: "Decreto 390/2022"
      },
      {
        title: "Resumen de alícuotas críticas",
        description:
          `Destaca la alícuota general de Ingresos Brutos (${generalAliquot}) y variantes de tratamiento por actividad.`,
        source: "Ley Impositiva 3479, art. 4"
      },
      {
        title: "Escenarios MiPyME y personas humanas",
        description:
          "Consolida beneficios diferenciales para MiPyMEs y regularización inmobiliaria de personas humanas.",
        source: "Decreto 390/2022, arts. 5 y 6"
      },
      {
        title: "Alertas de plazos y caducidad",
        description:
          "Destaca condiciones de caducidad de planes y criterios de cómputo administrativo para evitar incumplimientos.",
        source: "Código Fiscal art. 6 y Decreto 390/2022 art. 11"
      },
      {
        title: "Historial conversacional persistente",
        description:
          "Mantiene contexto entre sesiones y navegación para continuidad en análisis y seguimiento de casos.",
        source: "Diseño funcional de esta demo frontend"
      }
    ],
    normativeHighlights: [
      {
        title: "Cómputo de plazos administrativos",
        detail: article6Snippet,
        source: "Código Fiscal 2025, art. 6"
      },
      {
        title: "Parámetro general de Ingresos Brutos",
        detail: `La Ley Impositiva fija alícuota general en ${generalAliquot}, con alícuotas específicas según actividad y un marco de multas que arranca en ${multasRange}.`,
        source: "Ley 3479, arts. 2 y 4"
      },
      {
        title: "Condiciones para regularizar deuda vencida",
        detail:
          `El régimen especial contempla beneficios sobre intereses, multas y recargos con financiamiento por tramos de cuotas, alcanzando hasta ${maxInstallments} cuotas.`,
        source: "Decreto 390/2022, arts. 4 a 11"
      },
      {
        title: "Vigencia extendida del régimen permanente",
        detail:
          `El decreto de prórroga extiende el régimen por cuatro años contados desde el ${extensionStartDate}.`,
        source: "DECTO-2024-1474-E-NEU-GPN, art. 1"
      }
    ],
    visualPanels: [
      {
        badge: "Placeholder 01",
        title: "Panel de trazabilidad normativa",
        description:
          "Área reservada para un mockup de auditoría con artículos consultados, fecha y fuente documental."
      },
      {
        badge: "Placeholder 02",
        title: "Panel de estado fiscal consolidado",
        description:
          "Espacio para una futura visualización de deuda, obligaciones activas y recomendaciones de regularización."
      },
      {
        badge: "Placeholder 03",
        title: "Panel de flujo conversacional",
        description:
          "Zona para mostrar una captura real del chat con continuidad de contexto y exportación de respuestas."
      }
    ],
    faq: [
      {
        question: "¿Qué tributos cubre esta demo en el flujo de consulta?",
        answer:
          "Se priorizan Ingresos Brutos, Inmobiliario y Sellos porque son los ejes de regularización y gestión más frecuentes en la documentación cargada.",
        source: "Decreto 390/2022, art. 1"
      },
      {
        question: "¿Cómo se computan los plazos tributarios?",
        answer:
          "Como regla general se computan por días hábiles administrativos y son improrrogables salvo norma expresa en sentido contrario.",
        source: "Código Fiscal 2025, art. 6"
      },
      {
        question: "¿Existe un tratamiento diferencial para MiPyMEs?",
        answer:
          "Sí. El régimen especial contempla beneficios superiores de condonación de intereses para contribuyentes categorizados como MiPyME.",
        source: "Decreto 390/2022, art. 5"
      },
      {
        question: "¿Cuál es la referencia general de alícuota en Ingresos Brutos?",
        answer:
          `La ley impositiva fija una alícuota general de ${generalAliquot}, y luego abre excepciones por actividades específicas.`,
        source: "Ley 3479, art. 4"
      },
      {
        question: "¿Cuál es la vigencia actual de la prórroga del régimen permanente?",
        answer:
          "Se prorrogó por cuatro años contados desde el 04 de noviembre de 2024, según el decreto provincial correspondiente.",
        source: "DECTO-2024-1474-E-NEU-GPN, art. 1"
      }
    ],
    finalCta: {
      title: "Ingresá al chat y validá un caso concreto en segundos",
      description:
        "La conversación mantiene historial e id único para continuar análisis al volver a la landing.",
      primaryButton: "Abrir chat fiscal"
    },
    legalSources: [
      {
        name: "Código Fiscal de la Provincia del Neuquén (Ley 2680, texto con modificaciones a 2024)",
        note: "Base de obligaciones, sujetos, plazos y facultades de administración."
      },
      {
        name: "Ley Impositiva 3479",
        note: "Escala de multas y alícuotas vigentes por actividad."
      },
      {
        name: "Decreto 390/2022 con Anexo I",
        note: "Régimen especial de regularización, cuotas, beneficios y caducidad."
      },
      {
        name: "DECTO-2024-1474-E-NEU-GPN",
        note: "Prórroga del régimen de regularización desde noviembre de 2024."
      }
    ]
  };
}
