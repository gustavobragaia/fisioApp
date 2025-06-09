-- Create exercise group type enum
CREATE TYPE exercise_group_type AS ENUM (
  'Alívio imediato da dor',
  'Alongamento',
  'Aquecimento',
  'Fortalecimento muscular'
);

-- Create table for exercise regions
CREATE TABLE public.exercise_regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add columns to exercises table
ALTER TABLE public.exercises
ADD COLUMN region_id UUID REFERENCES public.exercise_regions(id),
ADD COLUMN group_type exercise_group_type,
ADD COLUMN is_published BOOLEAN DEFAULT TRUE;

-- Create index for better performance
CREATE INDEX idx_exercises_region_id ON public.exercises(region_id);

-- Enable RLS on new table
ALTER TABLE public.exercise_regions ENABLE ROW LEVEL SECURITY;

-- Create policy for exercise_regions
-- All users can read exercise regions
CREATE POLICY exercise_regions_read_policy ON public.exercise_regions
  FOR SELECT USING (true);

-- Insert common anatomical regions
INSERT INTO public.exercise_regions (name) VALUES
  ('Tornozelos e Pés'),
  ('Joelhos'),
  ('Quadril'),
  ('Coluna Lombar'),
  ('Coluna Torácica'),
  ('Coluna Cervical'),
  ('Ombros'),
  ('Cotovelos'),
  ('Punhos e Mãos');
