// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yqbndgldamzbzkaipftq.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxYm5kZ2xkYW16YnprYWlwZnRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ0MTc2MDUsImV4cCI6MjAzOTk5MzYwNX0.IWwvq3hsO8yvzxFEfFppjN_vDgUxoVsyApQxpLAibR4'; // Replace with your Supabase Anon Key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
