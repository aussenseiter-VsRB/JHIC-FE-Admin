import { useState } from "react";
import pageData from "./buatBerita.json";
import "./css/buatBerita.css";
import FormBerita from "./components/FormBerita";
import UploadFoto from "./components/UploadFoto";
import RiwayatBerita from "./components/RiwayatBerita";

function BuatBerita() {
  const { page, form, history, riwayat } = pageData;

  const [author, setAuthor] = useState("");
  const [awal, setAwal] = useState("");
  const [orientasi, setOrientasi] = useState("");
  const [penutup, setPenutup] = useState("");

  const handleSubmit = () => {
    console.log({ author, awal, orientasi, penutup });
  };

  return (
    <div className="buat-berita">
      <div className="buat-berita-header">
        <h1 className="buat-berita-title">{page.title}</h1>
      </div>

      <div className="buat-berita-bento">
        <FormBerita
          author={author}
          awal={awal}
          orientasi={orientasi}
          penutup={penutup}
          onAuthorChange={(e) => setAuthor(e.target.value)}
          onAwalChange={(e) => setAwal(e.target.value)}
          onOrientasiChange={(e) => setOrientasi(e.target.value)}
          onPenutupChange={(e) => setPenutup(e.target.value)}
          authorLabel={form.authorLabel}
          authorPlaceholder={form.authorPlaceholder}
          awalLabel={form.awalLabel}
          awalPlaceholder={form.awalPlaceholder}
          orientasiLabel={form.orientasiLabel}
          orientasiPlaceholder={form.orientasiPlaceholder}
          penutupLabel={form.penutupLabel}
          penutupPlaceholder={form.penutupPlaceholder}
          submitLabel={form.submitLabel}
          onSubmit={handleSubmit}
        />
        <UploadFoto label={form.uploadLabel} hint={form.uploadHint} />
      </div>

      <RiwayatBerita
        title={history.title}
        columns={history.columns}
        items={riwayat}
      />
    </div>
  );
}

export default BuatBerita;
