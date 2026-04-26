-- ============= ROLES =============
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users can view own roles"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Admins can view all roles"
  on public.user_roles for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- ============= ORÇAMENTOS =============
create type public.orcamento_status as enum ('novo', 'em_contato', 'fechado', 'perdido');

create table public.orcamentos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  cidade text not null,
  tipo text not null,
  medida text,
  obs text,
  telefone text,
  email text,
  status public.orcamento_status not null default 'novo',
  notas_admin text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orcamentos enable row level security;

-- Qualquer visitante pode criar (form público)
create policy "Anyone can submit orcamento"
  on public.orcamentos for insert
  to anon, authenticated
  with check (true);

-- Apenas admin lê / edita
create policy "Admins can view orcamentos"
  on public.orcamentos for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update orcamentos"
  on public.orcamentos for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete orcamentos"
  on public.orcamentos for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger orcamentos_updated_at
  before update on public.orcamentos
  for each row execute function public.set_updated_at();

-- ============= GALERIA =============
create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_path text not null,
  category text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.gallery_items enable row level security;

create policy "Anyone can view gallery"
  on public.gallery_items for select
  to anon, authenticated
  using (true);

create policy "Admins can insert gallery"
  on public.gallery_items for insert
  to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update gallery"
  on public.gallery_items for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete gallery"
  on public.gallery_items for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- ============= STORAGE =============
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true);

create policy "Public can view gallery images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'gallery');

create policy "Admins can upload gallery images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'gallery' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can update gallery images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'gallery' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete gallery images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'gallery' and public.has_role(auth.uid(), 'admin'));