-- Migration to fix exercise regions and ensure proper mapping
-- Generated on: 2025-06-10

-- First, ensure we have consistent body region names that match the form values
DO $$
DECLARE
    pescoco_id UUID;
    ombros_id UUID;
    coluna_toracica_id UUID;
    lombar_id UUID;
    quadril_id UUID;
    joelhos_id UUID;
    tornozelos_id UUID;
    cotovelos_id UUID;
    punhos_id UUID;
BEGIN
    -- First, identify exercise type regions that need to be handled
    DECLARE
        alivio_id UUID;
        alongamento_id UUID;
        aquecimento_id UUID;
        fortalecimento_id UUID;
    BEGIN
        -- Get IDs of exercise type regions
        SELECT id INTO alivio_id FROM public.exercise_regions WHERE name = 'Alívio';
        SELECT id INTO alongamento_id FROM public.exercise_regions WHERE name = 'Alongamento';
        SELECT id INTO aquecimento_id FROM public.exercise_regions WHERE name = 'Aquecimento';
        SELECT id INTO fortalecimento_id FROM public.exercise_regions WHERE name = 'Fortalecimento';
        
        -- Reassign exercises from these regions to appropriate body regions based on group_id
        -- For exercises with Alívio region
        IF alivio_id IS NOT NULL THEN
            -- Reassign lombar exercises
            UPDATE public.exercises 
            SET region_id = lombar_id 
            WHERE public.exercises.region_id = alivio_id AND (group_id LIKE 'lombar-%' OR group_id LIKE '%lombar%');
            
            -- Reassign quadril exercises
            UPDATE public.exercises 
            SET region_id = quadril_id 
            WHERE public.exercises.region_id = alivio_id AND (group_id LIKE 'quadril-%' OR group_id LIKE '%quadril%');
            
            -- Reassign other exercises based on group_id pattern
            UPDATE public.exercises 
            SET region_id = pescoco_id 
            WHERE public.exercises.region_id = alivio_id AND (group_id LIKE 'pescoco-%' OR group_id LIKE '%pescoco%');
            
            UPDATE public.exercises 
            SET region_id = ombros_id 
            WHERE public.exercises.region_id = alivio_id AND (group_id LIKE 'ombros-%' OR group_id LIKE '%ombros%');
            
            UPDATE public.exercises 
            SET region_id = cotovelos_id 
            WHERE public.exercises.region_id = alivio_id AND (group_id LIKE 'cotovelos-%' OR group_id LIKE '%cotovelos%');
            
            UPDATE public.exercises 
            SET region_id = tornozelos_id 
            WHERE public.exercises.region_id = alivio_id AND (group_id LIKE 'tornozelos-%' OR group_id LIKE '%tornozelos%');
        END IF;
        
        -- Repeat similar reassignments for other exercise type regions
        IF alongamento_id IS NOT NULL THEN
            UPDATE public.exercises 
            SET region_id = lombar_id 
            WHERE public.exercises.region_id = alongamento_id AND (group_id LIKE 'lombar-%' OR group_id LIKE '%lombar%');
            
            UPDATE public.exercises 
            SET region_id = quadril_id 
            WHERE public.exercises.region_id = alongamento_id AND (group_id LIKE 'quadril-%' OR group_id LIKE '%quadril%');
            
            -- And so on for other body regions...
        END IF;
        
        IF aquecimento_id IS NOT NULL THEN
            UPDATE public.exercises 
            SET region_id = lombar_id 
            WHERE public.exercises.region_id = aquecimento_id AND (group_id LIKE 'lombar-%' OR group_id LIKE '%lombar%');
            
            -- And so on for other body regions...
        END IF;
        
        IF fortalecimento_id IS NOT NULL THEN
            UPDATE public.exercises 
            SET region_id = lombar_id 
            WHERE public.exercises.region_id = fortalecimento_id AND (group_id LIKE 'lombar-%' OR group_id LIKE '%lombar%');
            
            -- And so on for other body regions...
        END IF;
        
        -- For any remaining exercises with these regions, assign them to a default region
        UPDATE public.exercises 
        SET region_id = lombar_id 
        WHERE public.exercises.region_id IN (alivio_id, alongamento_id, aquecimento_id, fortalecimento_id);
        
        -- Now we can safely delete the exercise type regions
        IF alivio_id IS NOT NULL THEN
            DELETE FROM public.exercise_regions WHERE id = alivio_id;
        END IF;
        
        IF alongamento_id IS NOT NULL THEN
            DELETE FROM public.exercise_regions WHERE id = alongamento_id;
        END IF;
        
        IF aquecimento_id IS NOT NULL THEN
            DELETE FROM public.exercise_regions WHERE id = aquecimento_id;
        END IF;
        
        IF fortalecimento_id IS NOT NULL THEN
            DELETE FROM public.exercise_regions WHERE id = fortalecimento_id;
        END IF;
    END;
    
    -- Get or create body regions with consistent naming that matches form values
    -- Pescoço region
    SELECT id INTO pescoco_id FROM public.exercise_regions WHERE name ILIKE 'Pescoço' OR name ILIKE 'pescoco';
    IF pescoco_id IS NULL THEN
        INSERT INTO public.exercise_regions (name) VALUES ('Pescoço')
        RETURNING id INTO pescoco_id;
    ELSE
        -- Ensure consistent naming
        UPDATE public.exercise_regions SET name = 'Pescoço' WHERE id = pescoco_id;
    END IF;
    
    -- Ombros region
    SELECT id INTO ombros_id FROM public.exercise_regions WHERE name ILIKE 'Ombros';
    IF ombros_id IS NULL THEN
        INSERT INTO public.exercise_regions (name) VALUES ('Ombros')
        RETURNING id INTO ombros_id;
    END IF;
    
    -- Coluna Torácica region
    SELECT id INTO coluna_toracica_id FROM public.exercise_regions WHERE name ILIKE 'Coluna Torácica' OR name ILIKE 'coluna toracica' OR name ILIKE 'colunaToracica';
    IF coluna_toracica_id IS NULL THEN
        INSERT INTO public.exercise_regions (name) VALUES ('Coluna Torácica')
        RETURNING id INTO coluna_toracica_id;
    ELSE
        UPDATE public.exercise_regions SET name = 'Coluna Torácica' WHERE id = coluna_toracica_id;
    END IF;
    
    -- Lombar region
    SELECT id INTO lombar_id FROM public.exercise_regions WHERE name ILIKE 'Lombar' OR name ILIKE 'lombar-(coluna-baixa)';
    IF lombar_id IS NULL THEN
        INSERT INTO public.exercise_regions (name) VALUES ('Lombar')
        RETURNING id INTO lombar_id;
    ELSE
        UPDATE public.exercise_regions SET name = 'Lombar' WHERE id = lombar_id;
    END IF;
    
    -- Quadril region
    SELECT id INTO quadril_id FROM public.exercise_regions WHERE name ILIKE 'Quadril';
    IF quadril_id IS NULL THEN
        INSERT INTO public.exercise_regions (name) VALUES ('Quadril')
        RETURNING id INTO quadril_id;
    END IF;
    
    -- Joelhos region
    SELECT id INTO joelhos_id FROM public.exercise_regions WHERE name ILIKE 'Joelhos';
    IF joelhos_id IS NULL THEN
        INSERT INTO public.exercise_regions (name) VALUES ('Joelhos')
        RETURNING id INTO joelhos_id;
    END IF;
    
    -- Tornozelos / Pés region
    SELECT id INTO tornozelos_id FROM public.exercise_regions WHERE name ILIKE 'Tornozelos / Pés' OR name ILIKE 'tornozelos' OR name ILIKE 'tornozelos-e-pés';
    IF tornozelos_id IS NULL THEN
        INSERT INTO public.exercise_regions (name) VALUES ('Tornozelos / Pés')
        RETURNING id INTO tornozelos_id;
    ELSE
        UPDATE public.exercise_regions SET name = 'Tornozelos / Pés' WHERE id = tornozelos_id;
    END IF;
    
    -- Cotovelos region
    SELECT id INTO cotovelos_id FROM public.exercise_regions WHERE name ILIKE 'Cotovelos';
    IF cotovelos_id IS NULL THEN
        INSERT INTO public.exercise_regions (name) VALUES ('Cotovelos')
        RETURNING id INTO cotovelos_id;
    END IF;
    
    -- Punhos / Mãos region
    SELECT id INTO punhos_id FROM public.exercise_regions WHERE name ILIKE 'Punhos / Mãos' OR name ILIKE 'punhos';
    IF punhos_id IS NULL THEN
        INSERT INTO public.exercise_regions (name) VALUES ('Punhos / Mãos')
        RETURNING id INTO punhos_id;
    ELSE
        UPDATE public.exercise_regions SET name = 'Punhos / Mãos' WHERE id = punhos_id;
    END IF;

    -- Fix exercises with incorrect region mappings
    -- Update exercises with complex group IDs to have the correct region_id
    
    -- Fix Lombar exercises
    UPDATE public.exercises 
    SET region_id = lombar_id 
    WHERE public.exercises.group_id LIKE 'lombar-%' OR public.exercises.group_id LIKE '%lombar%';
    
    -- Fix Quadril exercises
    UPDATE public.exercises 
    SET region_id = quadril_id 
    WHERE public.exercises.group_id LIKE 'quadril-%' OR public.exercises.group_id LIKE '%quadril%';
    
    -- Fix Cotovelos exercises
    UPDATE public.exercises 
    SET region_id = cotovelos_id 
    WHERE public.exercises.group_id LIKE 'cotovelos-%' OR public.exercises.group_id LIKE '%cotovelos%';
    
    -- Fix Tornozelos exercises
    UPDATE public.exercises 
    SET region_id = tornozelos_id 
    WHERE public.exercises.group_id LIKE 'tornozelos-%' OR public.exercises.group_id LIKE '%tornozelos%';
    
    -- Fix Pescoço exercises
    UPDATE public.exercises 
    SET region_id = pescoco_id 
    WHERE public.exercises.group_id LIKE 'pescoco-%' OR public.exercises.group_id LIKE '%pescoco%';
    
    -- Fix Ombros exercises
    UPDATE public.exercises 
    SET region_id = ombros_id 
    WHERE public.exercises.group_id LIKE 'ombros-%' OR public.exercises.group_id LIKE '%ombros%';
    
    -- Fix Coluna Torácica exercises
    UPDATE public.exercises 
    SET region_id = coluna_toracica_id 
    WHERE public.exercises.group_id LIKE 'coluna%toracica%' OR public.exercises.group_id LIKE '%coluna%toracica%';
    
    -- Fix Joelhos exercises
    UPDATE public.exercises 
    SET region_id = joelhos_id 
    WHERE public.exercises.group_id LIKE 'joelhos-%' OR public.exercises.group_id LIKE '%joelhos%';
    
    -- Fix Punhos exercises
    UPDATE public.exercises 
    SET region_id = punhos_id 
    WHERE public.exercises.group_id LIKE 'punhos-%' OR public.exercises.group_id LIKE '%punhos%' OR public.exercises.group_id LIKE '%maos%';
    
    -- Ensure all exercises have is_published set to true
    UPDATE public.exercises SET is_published = TRUE WHERE public.exercises.is_published IS NULL;
    
    -- Log the count of exercises per region for verification
    RAISE NOTICE 'Exercises per region:';
    RAISE NOTICE 'Pescoço: %', (SELECT COUNT(*) FROM public.exercises WHERE public.exercises.region_id = pescoco_id);
    RAISE NOTICE 'Ombros: %', (SELECT COUNT(*) FROM public.exercises WHERE public.exercises.region_id = ombros_id);
    RAISE NOTICE 'Coluna Torácica: %', (SELECT COUNT(*) FROM public.exercises WHERE public.exercises.region_id = coluna_toracica_id);
    RAISE NOTICE 'Lombar: %', (SELECT COUNT(*) FROM public.exercises WHERE public.exercises.region_id = lombar_id);
    RAISE NOTICE 'Quadril: %', (SELECT COUNT(*) FROM public.exercises WHERE public.exercises.region_id = quadril_id);
    RAISE NOTICE 'Joelhos: %', (SELECT COUNT(*) FROM public.exercises WHERE public.exercises.region_id = joelhos_id);
    RAISE NOTICE 'Tornozelos / Pés: %', (SELECT COUNT(*) FROM public.exercises WHERE public.exercises.region_id = tornozelos_id);
    RAISE NOTICE 'Cotovelos: %', (SELECT COUNT(*) FROM public.exercises WHERE public.exercises.region_id = cotovelos_id);
    RAISE NOTICE 'Punhos / Mãos: %', (SELECT COUNT(*) FROM public.exercises WHERE public.exercises.region_id = punhos_id);
    
END $$;

-- Add sample exercises for any regions that have zero exercises
DO $$
DECLARE
    region_id UUID;
    region_name TEXT;
    exercise_count INTEGER;
BEGIN
    -- Check each region and add sample exercises if needed
    FOR region_name, region_id IN 
        SELECT name, id FROM public.exercise_regions 
        WHERE name IN ('Pescoço', 'Ombros', 'Coluna Torácica', 'Lombar', 'Quadril', 'Joelhos', 'Tornozelos / Pés', 'Cotovelos', 'Punhos / Mãos')
    LOOP
        SELECT COUNT(*) INTO exercise_count FROM public.exercises WHERE public.exercises.region_id = region_id;
        
        IF exercise_count = 0 THEN
            RAISE NOTICE 'Adding sample exercises for region: %', region_name;
            
            -- Insert a basic set of exercises for this region
            INSERT INTO public.exercises (
                name,
                description,
                group_id,
                video_url,
                thumbnail_url,
                duration,
                difficulty,
                region_id,
                group_type,
                steps,
                is_published
            ) VALUES (
                'Alongamento básico - ' || region_name,
                'Exercício simples para aliviar a tensão na região ' || region_name,
                lower(replace(replace(region_name, ' / ', '-'), ' ', '-')) || '-alongamento',
                'https://example.com/videos/alongamento-basico.mp4',
                'https://example.com/thumbnails/alongamento-basico.jpg',
                120,
                'Iniciante',
                region_id,
                'Alongamento',
                '[
                    {"title": "Posição inicial", "description": "Sente-se com a coluna ereta, ombros relaxados."},
                    {"title": "Movimento suave", "description": "Realize o movimento de forma lenta e controlada."},
                    {"title": "Mantenha a posição", "description": "Segure a posição por 15-20 segundos."},
                    {"title": "Retorne ao centro", "description": "Volte à posição inicial com controle."},
                    {"title": "Repita", "description": "Faça 3 repetições para cada lado."}
                ]',
                TRUE
            ), (
                'Fortalecimento básico - ' || region_name,
                'Exercício para fortalecer a musculatura da região ' || region_name,
                lower(replace(replace(region_name, ' / ', '-'), ' ', '-')) || '-fortalecimento',
                'https://example.com/videos/fortalecimento-basico.mp4',
                'https://example.com/thumbnails/fortalecimento-basico.jpg',
                180,
                'Intermediário',
                region_id,
                'Fortalecimento muscular',
                '[
                    {"title": "Posição inicial", "description": "Posicione-se adequadamente para o exercício."},
                    {"title": "Contração muscular", "description": "Contraia os músculos da região de forma controlada."},
                    {"title": "Mantenha a contração", "description": "Segure por 5-10 segundos."},
                    {"title": "Relaxe", "description": "Relaxe os músculos lentamente."},
                    {"title": "Repita", "description": "Faça 10 repetições."}
                ]',
                TRUE
            ), (
                'Alívio de dor - ' || region_name,
                'Exercício para alívio imediato de dor na região ' || region_name,
                lower(replace(replace(region_name, ' / ', '-'), ' ', '-')) || '-alivio',
                'https://example.com/videos/alivio-dor.mp4',
                'https://example.com/thumbnails/alivio-dor.jpg',
                120,
                'Iniciante',
                region_id,
                'Alívio de dor',
                '[
                    {"title": "Posição de conforto", "description": "Encontre uma posição confortável."},
                    {"title": "Respiração profunda", "description": "Respire profundamente enquanto relaxa a região."},
                    {"title": "Movimento suave", "description": "Faça movimentos muito suaves para aliviar a tensão."},
                    {"title": "Mantenha a calma", "description": "Continue respirando normalmente."},
                    {"title": "Repita", "description": "Repita o processo por 2-3 minutos."}
                ]',
                TRUE
            );
        END IF;
    END LOOP;
END $$;

-- Verify that all regions have exercises
SELECT 
    er.name AS region_name, 
    COUNT(e.id) AS exercise_count
FROM 
    public.exercise_regions er
LEFT JOIN 
    public.exercises e ON er.id = e.region_id
WHERE 
    er.name IN ('Pescoço', 'Ombros', 'Coluna Torácica', 'Lombar', 'Quadril', 'Joelhos', 'Tornozelos / Pés', 'Cotovelos', 'Punhos / Mãos')
GROUP BY 
    er.name
ORDER BY 
    er.name;
