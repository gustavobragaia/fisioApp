-- Add mental health values to exercise_group_type enum
ALTER TYPE exercise_group_type ADD VALUE IF NOT EXISTS 'Ansioso(a)';
ALTER TYPE exercise_group_type ADD VALUE IF NOT EXISTS 'Estressado(a)';
ALTER TYPE exercise_group_type ADD VALUE IF NOT EXISTS 'Com dificuldade para dormir';
ALTER TYPE exercise_group_type ADD VALUE IF NOT EXISTS 'Triste ou desanimado(a)';
ALTER TYPE exercise_group_type ADD VALUE IF NOT EXISTS 'Irritado(a)';
ALTER TYPE exercise_group_type ADD VALUE IF NOT EXISTS 'Quero manter meu bem-estar';

-- Update schema.sql to include these new values
COMMENT ON TYPE exercise_group_type IS 'Includes both physical and mental health exercise categories';
