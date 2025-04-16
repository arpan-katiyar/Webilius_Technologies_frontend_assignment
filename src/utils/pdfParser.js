export const parseResumeFromPDF = async (file) => {
  try {
    // Import PDF.js with proper worker configuration
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    // Alternative local worker path (if you prefer not using CDN)
    // pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    //   'pdfjs-dist/build/pdf.worker.min.js',
    //   import.meta.url
    // ).toString();

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ");
    }

    return text;
  } catch (error) {
    console.error("PDF parsing error:", error);
    throw new Error(
      "Could not read PDF file. Please ensure: 1) It's not password protected, 2) Contains selectable text, 3) Is a valid PDF file."
    );
  }
};
