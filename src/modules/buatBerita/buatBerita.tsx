import { useState } from "react";
import pageData from "./buatBerita.json";
import "./css/buatBerita.css";
import FormBerita from "./components/FormBerita";
import UploadFoto from "./components/UploadFoto";
import RiwayatBerita from "./components/RiwayatBerita";

function BuatBerita() {
  const { page, form, history, riwayat } = pageData;

  const [author, setAuthor] = useState(form.authorOptions[0]);
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    console.log({ author, content });
  };

  return (
    <div className="buat-berita">
      <div className="buat-berita-header">
        <h1 className="buat-berita-title">{page.title}</h1>
      </div>

      <div className="buat-berita-bento">
        <FormBerita
          author={author}
          content={content}
          onAuthorChange={(e) => setAuthor(e.target.value)}
          onContentChange={(e) => setContent(e.target.value)}
          authorLabel={form.authorLabel}
          authorOptions={form.authorOptions}
          contentLabel={form.contentLabel}
          contentPlaceholder={form.contentPlaceholder}
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
