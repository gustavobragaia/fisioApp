import pandas as pd
import os

# Read the fixed Excel file with updated durations
excel_file = '/Users/gustavobragaia/Documents/fisioApp/exercises-py/fixed_exercicios_with_duration.xlsx'
output_file = '/Users/gustavobragaia/Documents/fisioApp/supabase/migrations/update_exercise_durations.sql'

print(f"Reading Excel file: {excel_file}")
df = pd.read_excel(excel_file)
print(f"Found {len(df)} exercises in the file")

# Generate SQL update statements
sql_content = """-- Migration to update exercise durations
-- Generated on: {date}

""".format(date=pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S'))

# Add update statements for each exercise
for _, row in df.iterrows():
    name = row['name'].replace("'", "''") if pd.notna(row['name']) else ''
    group_id = row['group_id'].replace("'", "''") if pd.notna(row['group_id']) else ''
    duration = int(row['duration']) if pd.notna(row['duration']) else 0
    
    # Generate SQL update statement using name and group_id to identify the exercise
    sql_content += f"""
UPDATE public.exercises 
SET duration = {duration}
WHERE name = '{name}' AND group_id = '{group_id}';
"""

# Create the migrations directory if it doesn't exist
os.makedirs(os.path.dirname(output_file), exist_ok=True)

# Write SQL to file
with open(output_file, 'w') as f:
    f.write(sql_content)

print(f"SQL update script generated: {output_file}")
print(f"Total exercises to update: {len(df)}")
