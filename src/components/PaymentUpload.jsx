import React, { useCallback, useRef, useState } from 'react';
import { UploadCloud, FileImage, FileText, XCircle, CheckCircle2, AlertCircle } from 'lucide-react';

/*
  Payment proof upload
  - Drag & drop area with preview for JPG/PNG/PDF (max 2MB)
  - Dummy submit handler
*/
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

const PaymentUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const inputRef = useRef(null);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  }, []);

  const handleFile = (f) => {
    setError('');
    setSuccess('');
    if (!f) return;
    const isValidType = ['image/jpeg', 'image/png', 'application/pdf'].includes(f.type);
    if (!isValidType) return setError('Format harus JPG, PNG, atau PDF.');
    if (f.size > MAX_SIZE) return setError('Ukuran file maksimal 2MB.');
    setFile(f);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!file) return setError('Pilih file terlebih dahulu.');
    setSuccess('Bukti pembayaran berhasil diunggah (simulasi).');
  };

  const clear = () => {
    setFile(null);
    setError('');
    setSuccess('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <section className="py-16 bg-slate-50" aria-labelledby="upload-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="upload-title" className="text-2xl font-bold text-slate-800">Upload Bukti Pembayaran</h2>
        <p className="text-slate-600 mt-2">Tarik dan letakkan file atau klik area untuk memilih. Maks 2MB.</p>

        <form onSubmit={onSubmit} className="mt-8">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-blue-300 rounded-2xl p-8 bg-white text-center cursor-pointer hover:bg-blue-50 transition"
            role="button"
            aria-label="Area upload"
          >
            <UploadCloud className="mx-auto text-blue-600" size={36} />
            <p className="mt-2 text-slate-700">Seret & letakkan file di sini atau klik untuk memilih</p>
            <p className="text-sm text-slate-500">Format: JPG, PNG, PDF (maks 2MB)</p>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>

          {file && (
            <div className="mt-4 flex items-center justify-between bg-white rounded-xl border p-4">
              <div className="flex items-center gap-3">
                {file.type === 'application/pdf' ? (
                  <FileText className="text-blue-600" />
                ) : (
                  <FileImage className="text-blue-600" />
                )}
                <div>
                  <p className="font-medium text-slate-800">{file.name}</p>
                  <p className="text-sm text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button type="button" onClick={clear} className="text-red-600 hover:text-red-700 flex items-center gap-1">
                <XCircle size={18} /> Hapus
              </button>
            </div>
          )}

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow inline-flex items-center gap-2">
              <CheckCircle2 size={18} /> Submit Bukti Pembayaran
            </button>
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-full">
                <AlertCircle size={16} /> {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-full">
                <CheckCircle2 size={16} /> {success}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default PaymentUpload;
