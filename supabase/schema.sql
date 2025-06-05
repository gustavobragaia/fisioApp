-- Create custom types
CREATE TYPE triagem_type AS ENUM ('pain', 'mental');

-- Create tables
-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  cpf TEXT,
  empresa TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Triagem table
CREATE TABLE public.triagens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users NOT NULL,
  type triagem_type NOT NULL,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Pain symptoms table
CREATE TABLE public.pain_symptoms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  triagem_id UUID REFERENCES public.triagens NOT NULL,
  dor_com_mais_freq TEXT NOT NULL,
  dor_aparece_em_qual_situacao TEXT NOT NULL,
  tipo_de_dor TEXT NOT NULL,
  quando_dor_comecou TEXT NOT NULL,
  nivel_de_dor TEXT NOT NULL,
  como_afeta_minha_vida TEXT NOT NULL,
  o_que_gostaria_de_alcancar_com_alivio TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Mental health symptoms table
CREATE TABLE public.mental_health_symptoms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  triagem_id UUID REFERENCES public.triagens NOT NULL,
  como_esta_sentindo TEXT NOT NULL,
  frequencia_sentimento TEXT NOT NULL,
  dificuldade_frequente TEXT NOT NULL,
  impacto_rotina TEXT NOT NULL,
  buscou_ajuda TEXT NOT NULL,
  objetivo_alivio TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Exercises table
CREATE TABLE public.exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  group_id TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INTEGER NOT NULL,
  steps JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User exercises table (for tracking progress)
CREATE TABLE public.user_exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users NOT NULL,
  exercise_id UUID REFERENCES public.exercises NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completion_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, exercise_id)
);

-- Set up Row Level Security (RLS)
-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.triagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pain_symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mental_health_symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_exercises ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can only read/write their own data
CREATE POLICY users_policy ON public.users
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can only read/write their own triagens
CREATE POLICY triagens_policy ON public.triagens
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can only read/write pain symptoms related to their triagens
CREATE POLICY pain_symptoms_policy ON public.pain_symptoms
  USING (EXISTS (
    SELECT 1 FROM public.triagens
    WHERE public.triagens.id = public.pain_symptoms.triagem_id
    AND public.triagens.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.triagens
    WHERE public.triagens.id = public.pain_symptoms.triagem_id
    AND public.triagens.user_id = auth.uid()
  ));

-- Users can only read/write mental health symptoms related to their triagens
CREATE POLICY mental_health_symptoms_policy ON public.mental_health_symptoms
  USING (EXISTS (
    SELECT 1 FROM public.triagens
    WHERE public.triagens.id = public.mental_health_symptoms.triagem_id
    AND public.triagens.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.triagens
    WHERE public.triagens.id = public.mental_health_symptoms.triagem_id
    AND public.triagens.user_id = auth.uid()
  ));

-- All users can read exercises
CREATE POLICY exercises_read_policy ON public.exercises
  FOR SELECT USING (true);

-- Users can only read/write their own exercise progress
CREATE POLICY user_exercises_policy ON public.user_exercises
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create functions for user management
-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, email, cpf, empresa)
  VALUES (new.id, new.raw_user_meta_data->>'name', new.email, new.raw_user_meta_data->>'cpf', new.raw_user_meta_data->>'empresa');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_triagens_user_id ON public.triagens(user_id);
CREATE INDEX idx_pain_symptoms_triagem_id ON public.pain_symptoms(triagem_id);
CREATE INDEX idx_mental_health_symptoms_triagem_id ON public.mental_health_symptoms(triagem_id);
CREATE INDEX idx_user_exercises_user_id ON public.user_exercises(user_id);
CREATE INDEX idx_user_exercises_exercise_id ON public.user_exercises(exercise_id);
