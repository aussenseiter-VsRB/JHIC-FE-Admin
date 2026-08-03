import { useEffect, useState } from "react";
import pageData from "./buatBerita.json";
import "./css/buatBerita.css";
import FormBerita from "./components/FormBerita";
import UploadFoto from "./components/UploadFoto";
import RiwayatBerita from "./components/RiwayatBerita";
import EditBeritaModal from "./components/EditBeritaModal";
import type { Berita } from "../../api/types";
import {
  createBerita,
  deleteBerita,
  listBerita,
  updateBerita,
  uploadCoverImage,
} from "./services/beritaService";
import { getUser } from "../login/services/loginService";

function BuatBerita() {
  const { page, form, history } = pageData;

  const [authorName] = useState(() => getUser()?.name ?? "");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [beritas, setBeritas] = useState<Berita[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [editingBerita, setEditingBerita] = useState<Berita | null>(null);
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const [targetId, setTargetId] = useState<string | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    void (async () => {
      setListLoading(true);
      const res = await listBerita();
      if (res.ok) {
        setBeritas((res.data as Berita[] | null) ?? []);
        setListError(null);
      } else {
        setListError(res.error);
      }
      setListLoading(false);
    })();
  }, []);

  const refreshBerita = async () => {
    const res = await listBerita();
    if (res.ok) {
      setBeritas((res.data as Berita[] | null) ?? []);
      setListError(null);
    } else {
      setListError(res.error);
    }
  };

  const handleSubmit = async () => {
    setFormError(null);
    if (!title.trim() || !content.trim()) {
      setFormError("Judul dan isi berita wajib diisi.");
      return;
    }

    setSaving(true);
    const res = await createBerita(title.trim(), content.trim());
    if (res.ok) {
      setTitle("");
      setContent("");
      setTargetId((res.data as Berita).id);
      setCoverUrl(null);
      void refreshBerita();
    } else {
      setFormError(res.error);
    }
    setSaving(false);
  };

  const handleEdit = (berita: Berita) => {
    setTargetId(berita.id);
    setCoverUrl(berita.image_url ?? null);
    setEditError(null);
    setEditingBerita(berita);
  };

  const handleSaveEdit = async (editTitle: string, editContent: string) => {
    if (!editingBerita) return;

    setEditSaving(true);
    setEditError(null);
    const res = await updateBerita(editingBerita.id, editTitle, editContent);
    if (res.ok) {
      setEditingBerita(null);
      void refreshBerita();
    } else {
      setEditError(res.error);
    }
    setEditSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Hapus berita ini?")) return;

    setDeletingId(id);
    const res = await deleteBerita(id);
    if (res.ok) {
      setBeritas((prev) => prev.filter((b) => b.id !== id));
      if (editingBerita?.id === id) {
        setEditingBerita(null);
      }
    } else {
      setListError(res.error);
    }
    setDeletingId(null);
  };

  const handleUpload = async (file: File) => {
    if (!targetId) return;

    setUploading(true);
    const res = await uploadCoverImage(targetId, file);
    if (res.ok) {
      const { image_url } = res.data as { image_url: string };
      setCoverUrl(image_url);
    } else {
      setFormError(res.error);
    }
    setUploading(false);
  };

  return (
    <div className="buat-berita">
      <div className="buat-berita-header">
        <h1 className="buat-berita-title">{page.title}</h1>
      </div>

      <div className="buat-berita-bento">
        <FormBerita
          authorName={authorName}
          title={title}
          content={content}
          error={formError}
          loading={saving}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onSubmit={() => void handleSubmit()}
        />
        <UploadFoto
          label={form.uploadLabel}
          hint={form.uploadHint}
          imageUrl={coverUrl}
          disabled={!targetId}
          disabledHint="Simpan berita terlebih dahulu untuk mengunggah foto"
          uploading={uploading}
          onUpload={(file) => void handleUpload(file)}
        />
      </div>

      <RiwayatBerita
        title={history.title}
        columns={history.columns}
        items={beritas}
        loading={listLoading}
        error={listError}
        deletingId={deletingId}
        onEdit={handleEdit}
        onDelete={(id) => void handleDelete(id)}
      />

      <EditBeritaModal
        key={editingBerita?.id ?? "closed"}
        berita={editingBerita}
        saving={editSaving}
        apiError={editError}
        onSave={(t, c) => void handleSaveEdit(t, c)}
        onClose={() => setEditingBerita(null)}
      />
    </div>
  );
}

export default BuatBerita;
