import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dpmywxtwzxttiekjfphb.supabase.co";
const supabaseKey = "sb_publishable_F92L2BhubhwO_DEXIaUh8A_aW7NMovU";

export const supabase = createClient(supabaseUrl, supabaseKey);