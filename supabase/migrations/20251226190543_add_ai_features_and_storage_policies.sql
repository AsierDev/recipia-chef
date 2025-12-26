-- Add AI generation function for rate limiting
CREATE OR REPLACE FUNCTION "public"."increment_ai_generation"()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'authentication required';
  END IF;

  INSERT INTO public.ai_generations (user_id, date, count)
  VALUES (auth.uid(), CURRENT_DATE, 1)
  ON CONFLICT (user_id, date)
  DO UPDATE SET count = ai_generations.count + 1;
END;
$$;

-- Grant execute on AI function
GRANT EXECUTE ON FUNCTION "public"."increment_ai_generation"() TO "authenticated";

-- Create public profiles view (hides email)
CREATE OR REPLACE VIEW "public"."public_profiles" AS
SELECT
  id,
  username,
  full_name,
  avatar_url,
  bio,
  points,
  level,
  created_at
FROM "public"."profiles";

-- Grant select on public_profiles view
GRANT SELECT ON TABLE "public"."public_profiles" TO "anon", "authenticated", "service_role";

-- Add policy to view own full profile
DROP POLICY IF EXISTS "Users can view own full profile" ON "public"."profiles";
CREATE POLICY "Users can view own full profile" ON "public"."profiles"
  FOR SELECT USING ("auth"."uid"() = "id");

-- Drop old ai_generations policies (replaced with revoke)
DROP POLICY IF EXISTS "Users can insert own ai generations" ON "public"."ai_generations";
DROP POLICY IF EXISTS "Users can update own ai generations" ON "public"."ai_generations";

-- Revoke update and delete on ai_generations for authenticated users (security)
REVOKE UPDATE, DELETE ON TABLE "public"."ai_generations" FROM "authenticated";

-- Drop old storage policies if they exist
DROP POLICY IF EXISTS "INSERT 1uy8qe8_0" ON "storage"."objects";
DROP POLICY IF EXISTS "SELECT 1uy8qe8_0" ON "storage"."objects";
DROP POLICY IF EXISTS "authenticated_select_recipe_photos" ON "storage"."objects";
DROP POLICY IF EXISTS "public_select_recipe_photos" ON "storage"."objects";
DROP POLICY IF EXISTS "authenticated_insert_recipe_photos" ON "storage"."objects";
DROP POLICY IF EXISTS "authenticated_delete_recipe_photos" ON "storage"."objects";

-- Create improved storage policies for recipe-photos
CREATE POLICY "authenticated_select_recipe_photos"
  ON "storage"."objects"
  FOR SELECT
  TO "authenticated"
  USING ((bucket_id = 'recipe-photos'::text) AND (split_part(name, '/', 1) = auth.uid()::text));

CREATE POLICY "public_select_recipe_photos"
  ON "storage"."objects"
  FOR SELECT
  TO "anon"
  USING ((bucket_id = 'recipe-photos'::text));

CREATE POLICY "authenticated_insert_recipe_photos"
  ON "storage"."objects"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((bucket_id = 'recipe-photos'::text) AND (split_part(name, '/', 1) = auth.uid()::text));

CREATE POLICY "authenticated_delete_recipe_photos"
  ON "storage"."objects"
  FOR DELETE
  TO "authenticated"
  USING ((bucket_id = 'recipe-photos'::text) AND (split_part(name, '/', 1) = auth.uid()::text));
