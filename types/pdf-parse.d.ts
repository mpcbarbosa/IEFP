declare module "pdf-parse" {
  type PdfParseResult = {
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    version: string;
    text: string;
  };

  function pdfParse(dataBuffer: Buffer | Uint8Array, options?: any): Promise<PdfParseResult>;

  export default pdfParse;
}
