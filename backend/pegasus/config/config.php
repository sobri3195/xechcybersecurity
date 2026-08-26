<?php
declare(strict_types=1);
return ['dsn'=>getenv('CTF_DB_DSN') ?: 'mysql:host=127.0.0.1;dbname=xech;charset=utf8mb4','user'=>getenv('CTF_DB_USER') ?: 'xech','password'=>getenv('CTF_DB_PASSWORD') ?: '','allowed_origin'=>getenv('CTF_ALLOWED_ORIGIN') ?: 'http://localhost:5173','pepper'=>getenv('CTF_SECURITY_PEPPER') ?: throw new RuntimeException('CTF_SECURITY_PEPPER is required'),'resource_dir'=>getenv('CTF_RESOURCE_DIR') ?: dirname(__DIR__).'/storage/resources'];
