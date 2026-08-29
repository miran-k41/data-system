import { LetterRecord } from "./types";
import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  WidthType,
  BorderStyle,
  Packer,
  ImageRun,
  VerticalAlign,
  HeightRule,
} from "docx";
import { saveAs } from "file-saver";
import { KRG_LOGO_BASE64 } from "./logoBase64";

export const WORD_TEMPLATE_PLACEHOLDERS = [
  { tag: '{Name}', description: 'ناوی تەواوی نێرەر / داواکار', example: 'د. سارا مەحموود' },
  { tag: '{Code}', description: 'کۆدی ژمارەیی تایبەت', example: '٩٤٠٢١' },
  { tag: '{ReceivingMinistry}', description: 'وەزارەت یاخود لایەنی وەرگر', example: 'وەزارەتی تەندروستی' },
  { tag: '{LetterNumber}', description: 'ژمارەی فەرمی نووسراو', example: '٧٨٤٢' },
  { tag: '{Date}', description: 'بەرواری دەرچوون', example: '2026-08-25' },
  { tag: '{Subject}', description: 'بابەتی سەرەکی نووسراو', example: 'داواکاری دابینکردنی پێداویستی پزیشکی' },
  { tag: '{Details}', description: 'دەق و وردەکاری تەواوی نووسراو', example: 'داواکارین لە بەڕێزتان بە مەبەستی پەرەپێدانی...' },
  { tag: '{DirectedTo}', description: 'وەزارەت یاخود لایەنی ئاڕاستەکراو', example: 'وەزارەتی دارایی و ئابووری' },
  { tag: '{Purpose}', description: 'مەبەست و ئامانجی سەرەکی', example: 'ڕەزامەندی دارایی و تۆمارکردن' },
  { tag: '{ForwardingDate}', description: 'بەرواری ئاڕاستەکردن', example: '2026-08-28' },
];

/**
 * Helper to convert Base64 string to Uint8Array safely in Browser and Node environments.
 */
function base64ToUint8Array(base64: string): Uint8Array {
  try {
    if (typeof window !== "undefined" && window.atob) {
      const binaryString = window.atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    } else if (typeof Buffer !== "undefined") {
      return Uint8Array.from(Buffer.from(base64, "base64"));
    }
  } catch (err) {
    console.error("Error converting base64 to Uint8Array:", err);
  }
  return new Uint8Array();
}

/**
 * Helper to format date cleanly as DD/MM/YYYY or original
 */
function formatHeaderDate(dateStr?: string): string {
  if (!dateStr) return "14/08/2026";
  if (dateStr.includes("-")) {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
  }
  return dateStr;
}

/**
 * Generate and download a formatted Microsoft Word (.docx) document strictly in A5 size matching
 * the official Kurdistan Regional Government Council of Ministers template screenshot.
 */
export async function downloadDocxLetter(data: LetterRecord) {
  const borderDef = {
    style: BorderStyle.SINGLE,
    size: 6,
    color: "000000",
  };

  const cellBorders = {
    top: borderDef,
    bottom: borderDef,
    left: borderDef,
    right: borderDef,
  };

  const headerBgColor = "A4C2E6";
  const logoBytes = base64ToUint8Array(KRG_LOGO_BASE64);

  // A5 Page dimensions: 148 mm x 210 mm -> 8390 dxa x 11906 dxa
  // Margins: 450 dxa left & right -> Net table width = 7490 dxa
  const totalTableWidth = 7490;
  const col1Width = 2600;
  const col2Width = 2290;
  const col3Width = 2600;

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 8390, // A5 width (148mm)
              height: 11906, // A5 height (210mm)
            },
            margin: {
              top: 450,
              bottom: 450,
              left: 450,
              right: 450,
            },
          },
        },
        children: [
          new Table({
            width: { size: totalTableWidth, type: WidthType.DXA },
            alignment: AlignmentType.CENTER,
            rows: [
              // ─── ROW 1: Header Banner (Blue Background - 1600 dxa) ───────
              new TableRow({
                height: { value: 1600, rule: HeightRule.ATLEAST },
                children: [
                  // Arabic Top Header (Left column in table)
                  new TableCell({
                    width: { size: col1Width, type: WidthType.DXA },
                    shading: { fill: headerBgColor },
                    borders: cellBorders,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 40, after: 20 },
                        children: [
                          new TextRun({
                            text: "حكومة اقليم كوردستان",
                            bold: true,
                            size: 22,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 40 },
                        children: [
                          new TextRun({
                            text: "مجلس الوزراء",
                            bold: true,
                            size: 20,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                    ],
                  }),

                  // Official Emblem (Center column)
                  new TableCell({
                    width: { size: col2Width, type: WidthType.DXA },
                    shading: { fill: headerBgColor },
                    borders: cellBorders,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          ...(logoBytes.length > 0
                            ? [
                                new ImageRun({
                                  data: logoBytes,
                                  transformation: { width: 70, height: 65 },
                                  type: "png",
                                }),
                              ]
                            : [
                                new TextRun({
                                  text: "★",
                                  size: 28,
                                  bold: true,
                                }),
                              ]),
                        ],
                      }),
                    ],
                  }),

                  // Kurdish Top Header (Right column in table)
                  new TableCell({
                    width: { size: col3Width, type: WidthType.DXA },
                    shading: { fill: headerBgColor },
                    borders: cellBorders,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 40, after: 20 },
                        children: [
                          new TextRun({
                            text: "حکومەتی هەرێمی کوردستان",
                            bold: true,
                            size: 22,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 40 },
                        children: [
                          new TextRun({
                            text: "ئەنجومەنی وەزیران",
                            bold: true,
                            size: 20,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),

              // ─── ROW 2: Salutation / Recipient (1000 dxa) ─────────────────
              new TableRow({
                height: { value: 1000, rule: HeightRule.ATLEAST },
                children: [
                  new TableCell({
                    columnSpan: 3,
                    width: { size: totalTableWidth, type: WidthType.DXA },
                    borders: cellBorders,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        spacing: { before: 60, after: 40 },
                        children: [
                          new TextRun({
                            text: "بەڕێز سەرۆکی دیوانی ئەنجومەنی وەزیران",
                            bold: true,
                            size: 22,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        spacing: { before: 0, after: 60 },
                        children: [
                          new TextRun({
                            text: "سڵاو و ڕێز....",
                            bold: true,
                            size: 22,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),

              // ─── ROW 3: Reference Numbers & Date Row (650 dxa) ────────────
              new TableRow({
                height: { value: 650, rule: HeightRule.ATLEAST },
                children: [
                  new TableCell({
                    width: { size: 2200, type: WidthType.DXA },
                    borders: cellBorders,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: `له : ${formatHeaderDate(data.date)}`,
                            bold: true,
                            size: 19,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 2000, type: WidthType.DXA },
                    borders: cellBorders,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: `ژمارە : ${data.letterNumber ?? 0}`,
                            bold: true,
                            size: 19,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 3290, type: WidthType.DXA },
                    borders: cellBorders,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: `نووسراوی : ${data.receivingMinistry || "---"}`,
                            bold: true,
                            size: 19,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),

              // ─── ROW 4: Subject Title Bar (Blue - 380 dxa) ────────────────
              new TableRow({
                height: { value: 380, rule: HeightRule.ATLEAST },
                children: [
                  new TableCell({
                    columnSpan: 3,
                    width: { size: totalTableWidth, type: WidthType.DXA },
                    shading: { fill: headerBgColor },
                    borders: cellBorders,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        spacing: { before: 20, after: 20 },
                        children: [
                          new TextRun({
                            text: "بابەت :",
                            bold: true,
                            size: 19,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),

              // ─── ROW 5: Subject Content Box (700 dxa) ─────────────────────
              new TableRow({
                height: { value: 700, rule: HeightRule.ATLEAST },
                children: [
                  new TableCell({
                    columnSpan: 3,
                    width: { size: totalTableWidth, type: WidthType.DXA },
                    borders: cellBorders,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        spacing: { before: 40, after: 40 },
                        children: [
                          new TextRun({
                            text: `${data.subject || "0"}`,
                            size: 20,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),

              // ─── ROW 6: Details Title Bar (Blue - 380 dxa) ────────────────
              new TableRow({
                height: { value: 380, rule: HeightRule.ATLEAST },
                children: [
                  new TableCell({
                    columnSpan: 3,
                    width: { size: totalTableWidth, type: WidthType.DXA },
                    shading: { fill: headerBgColor },
                    borders: cellBorders,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        spacing: { before: 20, after: 20 },
                        children: [
                          new TextRun({
                            text: "ووردەکاری :",
                            bold: true,
                            size: 19,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),

              // ─── ROW 7: Details Content Box (2400 dxa) ────────────────────
              new TableRow({
                height: { value: 2400, rule: HeightRule.ATLEAST },
                children: [
                  new TableCell({
                    columnSpan: 3,
                    width: { size: totalTableWidth, type: WidthType.DXA },
                    borders: cellBorders,
                    verticalAlign: VerticalAlign.TOP,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        spacing: { before: 60, after: 60 },
                        children: [
                          new TextRun({
                            text: `${data.details || "0"}`,
                            size: 20,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),

              // ─── ROW 8: Directed To Title Bar (Blue - 380 dxa) ────────────
              new TableRow({
                height: { value: 380, rule: HeightRule.ATLEAST },
                children: [
                  new TableCell({
                    columnSpan: 3,
                    width: { size: totalTableWidth, type: WidthType.DXA },
                    shading: { fill: headerBgColor },
                    borders: cellBorders,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        spacing: { before: 20, after: 20 },
                        children: [
                          new TextRun({
                            text: "ئاراستە بکریت بۆ :",
                            bold: true,
                            size: 19,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),

              // ─── ROW 9: Directed To Content & Signatures (3200 dxa) ───────
              new TableRow({
                height: { value: 3200, rule: HeightRule.ATLEAST },
                children: [
                  new TableCell({
                    columnSpan: 3,
                    width: { size: totalTableWidth, type: WidthType.DXA },
                    borders: cellBorders,
                    verticalAlign: VerticalAlign.TOP,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        spacing: { before: 60, after: 40 },
                        children: [
                          new TextRun({
                            text: `${data.directedTo || "0"}`,
                            size: 20,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 60, after: 80 },
                        children: [
                          new TextRun({
                            text: `${data.purpose ? data.purpose : "0"}`,
                            size: 20,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 100, after: 200 },
                        children: [
                          new TextRun({
                            text: "...لەگەڵ ڕێزدا",
                            bold: true,
                            size: 22,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                      // Signatory name and date (bottom left in RTL)
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        spacing: { before: 80, after: 10 },
                        children: [
                          new TextRun({
                            text: `${data.name || "چنار اسماعیل"}`,
                            bold: true,
                            size: 21,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        spacing: { before: 0, after: 40 },
                        children: [
                          new TextRun({
                            text: `${data.dateOfForwarding || data.date || "2026-08-26"}`,
                            size: 19,
                            font: "Calibri",
                            color: "000000",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const safeFilename = `Nusraw_${data.letterNumber ?? 'New'}.docx`;
  saveAs(blob, safeFilename);
}
