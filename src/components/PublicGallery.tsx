import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImageIcon } from "lucide-react";

interface Item {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  image_path: string;
}

export function PublicGallery({ limit = 6 }: { limit?: number }) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase
      .from("gallery_items")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(limit)
      .then(({ data }) => {
        if (active && data) setItems(data as Item[]);
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [limit]);

  if (loading || items.length === 0) return null;

  function publicUrl(path: string) {
    return supabase.storage.from("gallery").getPublicUrl(path).data.publicUrl;
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3 inline-flex items-center gap-2 justify-center">
            <ImageIcon size={12} /> Nossos trabalhos
          </p>
          <h2 className="text-4xl md:text-5xl font-display">Projetos realizados</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-gold/15 hover:border-gold/40 transition"
            >
              <img
                src={publicUrl(item.image_path)}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {item.category && (
                  <span className="text-[10px] uppercase tracking-widest text-gold">
                    {item.category}
                  </span>
                )}
                <h3 className="text-lg font-medium">{item.title}</h3>
                {item.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
