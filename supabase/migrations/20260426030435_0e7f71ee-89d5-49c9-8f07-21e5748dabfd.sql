-- fix search_path warning
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin new.updated_at = now(); return new; end;
$$;

-- restringe listagem do bucket: visualizar arquivos individuais funciona via URL pública,
-- mas não permite enumerar todos os arquivos
drop policy "Public can view gallery images" on storage.objects;

create policy "Authenticated can view gallery list"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'gallery');