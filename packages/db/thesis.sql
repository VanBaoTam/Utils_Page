PGDMP      7                {            thesis    16.1    16.0 -    *           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            +           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ,           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            -           1262    16451    thesis    DATABASE     ~   CREATE DATABASE thesis WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Vietnamese_Vietnam.1258';
    DROP DATABASE thesis;
                root    false            U           1247    16470    e_task_status    TYPE     n   CREATE TYPE public.e_task_status AS ENUM (
    'activated',
    'suspended',
    'expired',
    'finished'
);
     DROP TYPE public.e_task_status;
       public          postgres    false            ^           1247    16553    e_timers_repeater    TYPE     X   CREATE TYPE public.e_timers_repeater AS ENUM (
    'once',
    '5m 3t',
    'always'
);
 $   DROP TYPE public.e_timers_repeater;
       public          postgres    false            R           1247    16453    e_user_status    TYPE     Q   CREATE TYPE public.e_user_status AS ENUM (
    'activated',
    'deactivated'
);
     DROP TYPE public.e_user_status;
       public          postgres    false            �            1255    16575    check_date_order()    FUNCTION     �  CREATE FUNCTION public.check_date_order() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW.created_date IS NOT NULL AND
     NEW.started_date IS NOT NULL AND
     NEW.noting_date IS NOT NULL AND
     NEW.finished_date IS NOT NULL AND
     NEW.created_date <= NEW.started_date AND
     NEW.started_date <= NEW.noting_date AND
     NEW.noting_date <= NEW.finished_date THEN
    RETURN NEW;
  ELSE
    RAISE EXCEPTION 'Invalid date order';
  END IF;
END;
$$;
 )   DROP FUNCTION public.check_date_order();
       public          postgres    false            �            1259    16676    Calendars_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Calendars_id_seq"
    START WITH 100
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 )   DROP SEQUENCE public."Calendars_id_seq";
       public          postgres    false            �            1259    16698 	   Calendars    TABLE     �  CREATE TABLE public."Calendars" (
    id integer DEFAULT nextval('public."Calendars_id_seq"'::regclass) NOT NULL,
    user_id integer NOT NULL,
    name character varying(30) NOT NULL,
    choosen_date character varying(20) DEFAULT '01/01/2023'::character varying NOT NULL,
    notification character varying(50) NOT NULL,
    noting_time character varying(5) DEFAULT '00:00'::character varying NOT NULL
);
    DROP TABLE public."Calendars";
       public         heap    postgres    false    223            �            1259    16525    Notes    TABLE       CREATE TABLE public."Notes" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    name character varying(30) DEFAULT 'Untitled'::character varying NOT NULL,
    updated_date date DEFAULT CURRENT_DATE NOT NULL,
    status boolean DEFAULT true NOT NULL,
    content text
);
    DROP TABLE public."Notes";
       public         heap    postgres    false            �            1259    16524    Notes_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Notes_id_seq"
    AS integer
    START WITH 100
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Notes_id_seq";
       public          postgres    false    220            .           0    0    Notes_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Notes_id_seq" OWNED BY public."Notes".id;
          public          postgres    false    219            �            1259    16510    Tasks    TABLE     �  CREATE TABLE public."Tasks" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    name character varying(30) NOT NULL,
    created_date timestamp without time zone DEFAULT CURRENT_DATE NOT NULL,
    started_date timestamp without time zone NOT NULL,
    noting_date timestamp without time zone NOT NULL,
    finished_date timestamp without time zone NOT NULL,
    status public.e_task_status DEFAULT 'activated'::public.e_task_status NOT NULL,
    description text
);
    DROP TABLE public."Tasks";
       public         heap    postgres    false    853    853            �            1259    16509    Tasks_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Tasks_id_seq"
    AS integer
    START WITH 100
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Tasks_id_seq";
       public          postgres    false    218            /           0    0    Tasks_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Tasks_id_seq" OWNED BY public."Tasks".id;
          public          postgres    false    217            �            1259    16651    Timers_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Timers_id_seq"
    START WITH 100
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 &   DROP SEQUENCE public."Timers_id_seq";
       public          postgres    false            �            1259    16652    Timers    TABLE     }  CREATE TABLE public."Timers" (
    id integer DEFAULT nextval('public."Timers_id_seq"'::regclass) NOT NULL,
    user_id integer NOT NULL,
    choosen_days character(9)[] NOT NULL,
    repeater public.e_timers_repeater DEFAULT 'once'::public.e_timers_repeater NOT NULL,
    title character varying(30) NOT NULL,
    noting_time character varying(5) DEFAULT CURRENT_TIME NOT NULL
);
    DROP TABLE public."Timers";
       public         heap    postgres    false    221    862    862            �            1259    16458    User    TABLE     :  CREATE TABLE public."User" (
    id integer NOT NULL,
    username character varying(30) NOT NULL,
    email character varying(30) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(30) NOT NULL,
    status public.e_user_status DEFAULT 'activated'::public.e_user_status NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false    850    850            �            1259    16457    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    216            0           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."User".id;
          public          postgres    false    215            s           2604    16528    Notes id    DEFAULT     h   ALTER TABLE ONLY public."Notes" ALTER COLUMN id SET DEFAULT nextval('public."Notes_id_seq"'::regclass);
 9   ALTER TABLE public."Notes" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            p           2604    16513    Tasks id    DEFAULT     h   ALTER TABLE ONLY public."Tasks" ALTER COLUMN id SET DEFAULT nextval('public."Tasks_id_seq"'::regclass);
 9   ALTER TABLE public."Tasks" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            n           2604    16461    User id    DEFAULT     d   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            '          0    16698 	   Calendars 
   TABLE DATA           a   COPY public."Calendars" (id, user_id, name, choosen_date, notification, noting_time) FROM stdin;
    public          postgres    false    224   �6       #          0    16525    Notes 
   TABLE DATA           S   COPY public."Notes" (id, user_id, name, updated_date, status, content) FROM stdin;
    public          postgres    false    220   �7       !          0    16510    Tasks 
   TABLE DATA           �   COPY public."Tasks" (id, user_id, name, created_date, started_date, noting_date, finished_date, status, description) FROM stdin;
    public          postgres    false    218   �:       %          0    16652    Timers 
   TABLE DATA           [   COPY public."Timers" (id, user_id, choosen_days, repeater, title, noting_time) FROM stdin;
    public          postgres    false    222   w;                 0    16458    User 
   TABLE DATA           M   COPY public."User" (id, username, email, password, name, status) FROM stdin;
    public          postgres    false    216   <       1           0    0    Calendars_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Calendars_id_seq"', 105, true);
          public          postgres    false    223            2           0    0    Notes_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Notes_id_seq"', 101, true);
          public          postgres    false    219            3           0    0    Tasks_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Tasks_id_seq"', 105, true);
          public          postgres    false    217            4           0    0    Timers_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Timers_id_seq"', 101, true);
          public          postgres    false    221            5           0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 4, true);
          public          postgres    false    215            �           2606    16705    Calendars Calendars_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Calendars"
    ADD CONSTRAINT "Calendars_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Calendars" DROP CONSTRAINT "Calendars_pkey";
       public            postgres    false    224            �           2606    16533    Notes Notes_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Notes"
    ADD CONSTRAINT "Notes_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Notes" DROP CONSTRAINT "Notes_pkey";
       public            postgres    false    220            �           2606    16518    Tasks Tasks_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Tasks"
    ADD CONSTRAINT "Tasks_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Tasks" DROP CONSTRAINT "Tasks_pkey";
       public            postgres    false    218            �           2606    16661    Timers Timers_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Timers"
    ADD CONSTRAINT "Timers_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Timers" DROP CONSTRAINT "Timers_pkey";
       public            postgres    false    222            ~           2606    16468    User user_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT user_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public."User" DROP CONSTRAINT user_email_key;
       public            postgres    false    216            �           2606    16464    User user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."User" DROP CONSTRAINT user_pkey;
       public            postgres    false    216            �           2606    16466    User user_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT user_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public."User" DROP CONSTRAINT user_username_key;
       public            postgres    false    216            �           2606    16706     Calendars Calendars_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Calendars"
    ADD CONSTRAINT "Calendars_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON DELETE CASCADE;
 N   ALTER TABLE ONLY public."Calendars" DROP CONSTRAINT "Calendars_user_id_fkey";
       public          postgres    false    224    216    4736            �           2606    16534    Notes Notes_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Notes"
    ADD CONSTRAINT "Notes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public."Notes" DROP CONSTRAINT "Notes_user_id_fkey";
       public          postgres    false    220    4736    216            �           2606    16519    Tasks Tasks_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Tasks"
    ADD CONSTRAINT "Tasks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public."Tasks" DROP CONSTRAINT "Tasks_user_id_fkey";
       public          postgres    false    218    4736    216            �           2606    16662    Timers Timers_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Timers"
    ADD CONSTRAINT "Timers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public."Timers" DROP CONSTRAINT "Timers_user_id_fkey";
       public          postgres    false    4736    216    222            '   �   x�m�=n�@���)�P�]��G)@�\�8f�g^#�B�#�"�sn��O��4Ӽ�}�ʨ'^!��k�U�`c�Xm'�0��#p�X����B��n'���q6M�'��=�	�T;ɺ�`���)�>,#� ��+���gZ�vz[��;s~:~G��c�����;���ݾ�dp���JE�\�l:�<�@Z������!I�_��V�      #   2  x��T]KQ}��b�6k6����GѪ�X)����do�ܛn�ӧ�"B�R)���$[��]J6��?�������&wgΜ9sf팝�Sq��9P��c	��%ԕ�1�yKo�T6��H�ٴ}/����6$}W]Q�`O����)X��0'<��8|˘�N�֕�(2�㠭A:c|�y�gjN�Ҡ=<ݑ�����ᡬ@)�I�����WQKZ=$G��oU�ُ����x�N�����@(1��ؠ���7��̑�U�&�m�\�qF�sc	���'rAJ���*��M�q��Z�8Z��S��=���*ܒ\��X.�+���ź��$`|���2�^�<���P;Q�C���'������WT��t�WI:�E�
�k�US��\�Q0;��
�B�۷aM
��YR�z��y��Qw�� ���3�`q�|����Ԫ�1v_?�D�8�ay��*"�Э҉N%lEG�&I�.(�`�*�4�cLq���������9AV~�i`�a*\���!�V�	�>?�(�{�3=�c��Y!7��"�͐`�!8������,�, C{Pm����4"d��M�}ۖz�WA��U��/�m�����'�OX�4���5Y��.\�(A$ٵ��t��dj0��uu��]��F�c��L��B׻C�.�&<��{��+���J�bj�u��ۢ;���|�����P26��Ā�:��4p�׵��}W��MҢwHb��2L������	�Wbq���1	7�ҏB��LB����A:����lxa�7}`&��4_/A>�\������ܘ7�a�����:z/      !   �   x�uα� ����(�.�0���Qb;4M������i\��������EĔ'�@�U�� 큼B	�mHRK��ϫu��+?�{?�G0s=�s�r<��n��y�<�t�nAZ�W�<�W_O�2�S�,��*9��;      %   ~   x�340�4�VR�%%�����J;�4���3J�� ۭ(�&8���"����P˙�S�XY��_����������Z�Y�ihdel�eh`H��pC�qB-g~^r*�Oi^r��!Ȫ=... F�@�         =  x�m�On�@�5��)�⮠���
Z�͈��?EpP�ޤ�E��Ez�&666v��{���BE��,�o㔰Dy*�e҆R{ɍ���71��gp����jT�,n4�-���eh?���U����E���ύr-I��;R45_�:a㐦��І �'Df�f���s�����߽

d���'���f>6xIb�;�y��d��B5�sK�47� M ��Y��Y�5���1�^H��lE�P��9�Q[�r�<�ùz8DR�mow�X�Yc�>���������S$H��?�YK�z�[���%�DQ�Q��D     