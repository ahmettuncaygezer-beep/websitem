-- Enable the pgvector extension to work with embeddings
create extension if not exists vector;

-- Create a table for products with vector support if it doesn't exist
-- Note: Assuming products table might already exist, so we add the vector column
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price decimal,
  category text,
  image_url text,
  embedding vector(1536) -- Using 1536 for OpenAI text-embedding-3-small
);

-- Function to search for products using vector similarity
create or replace function match_products (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  name text,
  description text,
  price decimal,
  category text,
  image_url text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    products.id,
    products.name,
    products.description,
    products.price,
    products.category,
    products.image_url,
    1 - (products.embedding <=> query_embedding) as similarity
  from products
  where 1 - (products.embedding <=> query_embedding) > match_threshold
  order by products.embedding <=> query_embedding
  limit match_count;
end;
$$;
