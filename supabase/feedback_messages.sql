-- Create feedback_messages table
create table feedback_messages (
    id uuid default gen_random_uuid() primary key,
    content text not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table feedback_messages enable row level security;

-- Create policies
create policy "Users can view their own feedback messages"
    on feedback_messages for select
    using (auth.uid() = user_id);

create policy "Users can insert their own feedback messages"
    on feedback_messages for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own feedback messages"
    on feedback_messages for update
    using (auth.uid() = user_id);

-- Create trigger to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language 'plpgsql';

create trigger update_feedback_messages_updated_at
    before update on feedback_messages
    for each row
    execute function update_updated_at_column();
