


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."ai_generations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "date" "date" DEFAULT CURRENT_DATE NOT NULL,
    "count" integer DEFAULT 1,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."ai_generations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."collection_recipes" (
    "collection_id" "uuid" NOT NULL,
    "recipe_id" "uuid" NOT NULL,
    "added_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."collection_recipes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."collections" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "owner_id" "uuid" NOT NULL,
    "is_public" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."collections" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ingredients" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "recipe_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "amount" "text" NOT NULL,
    "unit" "text",
    "order_index" integer DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."ingredients" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "full_name" "text",
    "username" "text",
    "avatar_url" "text",
    "bio" "text",
    "points" integer DEFAULT 0,
    "level" "text" DEFAULT 'pinche'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "profiles_level_check" CHECK (("level" = ANY (ARRAY['pinche'::"text", 'cocinero'::"text", 'souschef'::"text", 'chef'::"text"])))
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."recipes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "author_id" "uuid" NOT NULL,
    "parent_recipe_id" "uuid",
    "title" "text" NOT NULL,
    "description" "text",
    "category" "text" NOT NULL,
    "servings" integer NOT NULL,
    "prep_time" integer,
    "cook_time" integer,
    "is_private" boolean DEFAULT false,
    "is_ai_generated" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "recipes_category_check" CHECK (("category" = ANY (ARRAY['desayuno'::"text", 'comida'::"text", 'cena'::"text", 'postre'::"text", 'snack'::"text", 'bebida'::"text"]))),
    CONSTRAINT "recipes_cook_time_check" CHECK (("cook_time" >= 0)),
    CONSTRAINT "recipes_prep_time_check" CHECK (("prep_time" >= 0)),
    CONSTRAINT "recipes_servings_check" CHECK ((("servings" >= 1) AND ("servings" <= 50)))
);


ALTER TABLE "public"."recipes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."steps" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "recipe_id" "uuid" NOT NULL,
    "instruction" "text" NOT NULL,
    "order_index" integer NOT NULL
);


ALTER TABLE "public"."steps" OWNER TO "postgres";


ALTER TABLE ONLY "public"."ai_generations"
    ADD CONSTRAINT "ai_generations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ai_generations"
    ADD CONSTRAINT "ai_generations_user_id_date_key" UNIQUE ("user_id", "date");



ALTER TABLE ONLY "public"."collection_recipes"
    ADD CONSTRAINT "collection_recipes_pkey" PRIMARY KEY ("collection_id", "recipe_id");



ALTER TABLE ONLY "public"."collections"
    ADD CONSTRAINT "collections_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ingredients"
    ADD CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");



ALTER TABLE ONLY "public"."recipes"
    ADD CONSTRAINT "recipes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."steps"
    ADD CONSTRAINT "steps_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_ai_generations_user_date" ON "public"."ai_generations" USING "btree" ("user_id", "date");



CREATE INDEX "idx_collections_owner_id" ON "public"."collections" USING "btree" ("owner_id");



CREATE INDEX "idx_collections_public" ON "public"."collections" USING "btree" ("is_public") WHERE ("is_public" = true);



CREATE INDEX "idx_ingredients_recipe_id" ON "public"."ingredients" USING "btree" ("recipe_id");



CREATE INDEX "idx_recipes_author_id" ON "public"."recipes" USING "btree" ("author_id");



CREATE INDEX "idx_recipes_category" ON "public"."recipes" USING "btree" ("category");



CREATE INDEX "idx_recipes_created_at" ON "public"."recipes" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_recipes_parent" ON "public"."recipes" USING "btree" ("parent_recipe_id");



CREATE INDEX "idx_recipes_public" ON "public"."recipes" USING "btree" ("is_private", "created_at" DESC) WHERE ("is_private" = false);



CREATE INDEX "idx_steps_recipe_id" ON "public"."steps" USING "btree" ("recipe_id");



ALTER TABLE ONLY "public"."ai_generations"
    ADD CONSTRAINT "ai_generations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."collection_recipes"
    ADD CONSTRAINT "collection_recipes_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."collection_recipes"
    ADD CONSTRAINT "collection_recipes_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."collections"
    ADD CONSTRAINT "collections_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."ingredients"
    ADD CONSTRAINT "ingredients_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."recipes"
    ADD CONSTRAINT "recipes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."recipes"
    ADD CONSTRAINT "recipes_parent_recipe_id_fkey" FOREIGN KEY ("parent_recipe_id") REFERENCES "public"."recipes"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."steps"
    ADD CONSTRAINT "steps_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE CASCADE;



CREATE POLICY "Collection recipes viewable via collection" ON "public"."collection_recipes" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."collections"
  WHERE (("collections"."id" = "collection_recipes"."collection_id") AND (("collections"."is_public" = true) OR ("collections"."owner_id" = "auth"."uid"()))))));



CREATE POLICY "Ingredients are viewable via recipe" ON "public"."ingredients" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."recipes"
  WHERE (("recipes"."id" = "ingredients"."recipe_id") AND (("recipes"."is_private" = false) OR ("recipes"."author_id" = "auth"."uid"()))))));



CREATE POLICY "Public collections are viewable by everyone" ON "public"."collections" FOR SELECT USING ((("is_public" = true) OR ("owner_id" = "auth"."uid"())));



CREATE POLICY "Public profiles are viewable by everyone" ON "public"."profiles" FOR SELECT USING (true);



CREATE POLICY "Public recipes are viewable by everyone" ON "public"."recipes" FOR SELECT USING ((("is_private" = false) OR ("author_id" = "auth"."uid"())));



CREATE POLICY "Steps are viewable via recipe" ON "public"."steps" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."recipes"
  WHERE (("recipes"."id" = "steps"."recipe_id") AND (("recipes"."is_private" = false) OR ("recipes"."author_id" = "auth"."uid"()))))));



CREATE POLICY "Users can create collections" ON "public"."collections" FOR INSERT WITH CHECK (("auth"."uid"() = "owner_id"));



CREATE POLICY "Users can create recipes" ON "public"."recipes" FOR INSERT WITH CHECK (("auth"."uid"() = "author_id"));



CREATE POLICY "Users can delete own collections" ON "public"."collections" FOR DELETE USING (("auth"."uid"() = "owner_id"));



CREATE POLICY "Users can delete own recipes" ON "public"."recipes" FOR DELETE USING (("auth"."uid"() = "author_id"));



CREATE POLICY "Users can insert own ai generations" ON "public"."ai_generations" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can manage collection recipes of own collections" ON "public"."collection_recipes" USING ((EXISTS ( SELECT 1
   FROM "public"."collections"
  WHERE (("collections"."id" = "collection_recipes"."collection_id") AND ("collections"."owner_id" = "auth"."uid"())))));



CREATE POLICY "Users can manage ingredients of own recipes" ON "public"."ingredients" USING ((EXISTS ( SELECT 1
   FROM "public"."recipes"
  WHERE (("recipes"."id" = "ingredients"."recipe_id") AND ("recipes"."author_id" = "auth"."uid"())))));



CREATE POLICY "Users can manage steps of own recipes" ON "public"."steps" USING ((EXISTS ( SELECT 1
   FROM "public"."recipes"
  WHERE (("recipes"."id" = "steps"."recipe_id") AND ("recipes"."author_id" = "auth"."uid"())))));



CREATE POLICY "Users can update own ai generations" ON "public"."ai_generations" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update own collections" ON "public"."collections" FOR UPDATE USING (("auth"."uid"() = "owner_id"));



CREATE POLICY "Users can update own profile" ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can update own recipes" ON "public"."recipes" FOR UPDATE USING (("auth"."uid"() = "author_id"));



CREATE POLICY "Users can view own ai generations" ON "public"."ai_generations" FOR SELECT USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."ai_generations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."collection_recipes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."collections" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."ingredients" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."recipes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."steps" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";


















GRANT ALL ON TABLE "public"."ai_generations" TO "anon";
GRANT ALL ON TABLE "public"."ai_generations" TO "authenticated";
GRANT ALL ON TABLE "public"."ai_generations" TO "service_role";



GRANT ALL ON TABLE "public"."collection_recipes" TO "anon";
GRANT ALL ON TABLE "public"."collection_recipes" TO "authenticated";
GRANT ALL ON TABLE "public"."collection_recipes" TO "service_role";



GRANT ALL ON TABLE "public"."collections" TO "anon";
GRANT ALL ON TABLE "public"."collections" TO "authenticated";
GRANT ALL ON TABLE "public"."collections" TO "service_role";



GRANT ALL ON TABLE "public"."ingredients" TO "anon";
GRANT ALL ON TABLE "public"."ingredients" TO "authenticated";
GRANT ALL ON TABLE "public"."ingredients" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."recipes" TO "anon";
GRANT ALL ON TABLE "public"."recipes" TO "authenticated";
GRANT ALL ON TABLE "public"."recipes" TO "service_role";



GRANT ALL ON TABLE "public"."steps" TO "anon";
GRANT ALL ON TABLE "public"."steps" TO "authenticated";
GRANT ALL ON TABLE "public"."steps" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































drop extension if exists "pg_net";

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


  create policy "INSERT 1uy8qe8_0"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using (((bucket_id = 'recipe-photos'::text) AND (auth.role() = 'authenticated'::text)));



  create policy "SELECT 1uy8qe8_0"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'recipe-photos'::text));



