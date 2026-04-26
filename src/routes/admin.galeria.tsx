import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Trash2, ImagePlus } from "lucide-react";

export const Route = createFileRoute("/admin/galeria")({
  component: GaleriaAdmin,
});

interface Item {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  image_path: string;
  display_order: number;
}

function GaleriaAdmin() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Pivotante");
  const [description, setDescription] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("gallery_items")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (data) setItems(data as Item[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function publicUrl(path: string) {
    return supabase.storage.from("gallery").getPublicUrl(path).data.publicUrl;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file || !title.trim()) {
      alert("Adicione título e imagem.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Imagem deve ter até 5MB.");
      return;
    }
    setUploading(true);

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("gallery").upload(filename, file);
    if (upErr) {
      alert("Erro no upload: " + upErr.message);
      setUploading(false);
      return;
    }

    const { error: dbErr } = await supabase.from("gallery_items").insert({
      title: title.trim(),
      description: description.trim() || null,
      category: category.trim() || null,
      image_path: filename,
    });

    if (dbErr) {
      alert("Erro ao salvar: " + dbErr.message);
    } else {
      setTitle("");
      setDescription("");
      if (fileRef.current) fileRef.current.value = "";
      await load();
    }
    setUploading(false);
  }

  async function remove(item: Item) {
    if (!confirm(`Excluir "${item.title}"?`)) return;
    await supabase.storage.from("gallery").remove([item.image_path]);
    await supabase.from("gallery_items").delete().eq("id", item.id);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display text-gold">Galeria de Trabalhos</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Adicione fotos das instalações que aparecerão no site.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-card border border-gold/20 rounded-xl p-6 mb-10 grid gap-4"
      >
        <div className="flex items-center gap-2 text-gold">
          <ImagePlus size={18} /> <span className="font-medium">Nova foto</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gold mb-2">Título *</label>
            <input
              required
              maxLength={120}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-md bg-input border border-border outline-none focus:border-gold"
              placeholder="Ex: Porta pivotante em mogno"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gold mb-2">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-md bg-input border border-border outline-none focus:border-gold"
            >
              <option>Pivotante</option>
              <option>Correr</option>
              <option>Esquadria</option>
              <option>Blindada</option>
              <option>Outros</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-gold mb-2">Descrição</label>
          <textarea
            maxLength={300}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-4 py-2.5 rounded-md bg-input border border-border outline-none focus:border-gold resize-none"
            placeholder="Detalhes do projeto (opcional)"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-gold mb-2">
            Imagem * (até 5MB)
          </label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            required
            className="text-sm file:mr-3 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-gold file:text-primary-foreground file:font-medium"
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-gold text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50"
        >
          <Upload size={16} /> {uploading ? "Enviando..." : "Adicionar foto"}
        </button>
      </form>

      {loading ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-10 border border-dashed border-gold/20 rounded-xl">
          Nenhuma foto ainda.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div key={item.id} className="bg-card border border-gold/15 rounded-xl overflow-hidden group">
              <div className="aspect-[4/3] overflow-hidden bg-background">
                <img
                  src={publicUrl(item.image_path)}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    {item.category && (
                      <span className="text-[10px] uppercase tracking-widest text-gold">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => remove(item)}
                    className="p-1.5 rounded-md text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-2">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
