-- Create the images storage bucket
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- Allow public read of all images
create policy "Public can view images"
  on storage.objects for select
  using (bucket_id = 'images');

-- Allow authenticated users to upload/update/delete images
create policy "Authenticated users can upload images"
  on storage.objects for insert
  with check (bucket_id = 'images' and auth.role() = 'authenticated');

create policy "Authenticated users can update images"
  on storage.objects for update
  using (bucket_id = 'images' and auth.role() = 'authenticated');

create policy "Authenticated users can delete images"
  on storage.objects for delete
  using (bucket_id = 'images' and auth.role() = 'authenticated');
