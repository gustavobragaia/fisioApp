-- Create the difficulty_level enum type
CREATE TYPE difficulty_level AS ENUM ('Iniciante', 'Intermediário', 'Avançado');

-- Add the difficulty column to the exercises table
ALTER TABLE public.exercises 
ADD COLUMN difficulty difficulty_level NOT NULL DEFAULT 'Iniciante';
