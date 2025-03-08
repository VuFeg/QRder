import { QRCodeSVG } from "qrcode.react";
import { Table } from "../../../types/table.type";

interface QRCodeModalProps {
  table: Table;
  onClose: () => void;
}

const QRCodeModal = ({ table, onClose }: QRCodeModalProps) => {
  const handleDownload = () => {
    const svg = document.querySelector(".qr-code-svg");
    if (svg) {
      const serializer = new XMLSerializer();
      const svgData = serializer.serializeToString(svg);
      const encodedData = window.btoa(unescape(encodeURIComponent(svgData)));
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `Table-${table.table_number}-QR.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = "data:image/svg+xml;base64," + encodedData;
    }
  };

  const currentURL = window.location.origin;
  const queryParams = new URLSearchParams({
    table: table.id,
  }).toString();
  const qrValue = `${currentURL}/order?${queryParams}`;
  console.log(qrValue);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-card p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Table {table.table_number} QR Code
        </h2>
        <div className="flex justify-center mb-4">
          <QRCodeSVG
            title={`Table ${table.table_number} QR Code`}
            value={qrValue}
            size={256}
            className="mx-auto qr-code-svg"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex-1"
          >
            Download
          </button>
          <button
            onClick={onClose}
            className="bg-muted text-muted-foreground px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
