<?php
declare(strict_types=1);

$api = file_get_contents(dirname(__DIR__).'/public/index.php');
$admin = file_get_contents(dirname(__DIR__).'/public/admin.php');
$migration = file_get_contents(dirname(__DIR__).'/database/migration.sql');

$contracts = [
    [$api, "prerequisite.status='completed'", 'start must enforce prerequisite completion'],
    [$api, "Api::error('Hint tidak tersedia',404)", 'missing hints must not mutate progress'],
    [$admin, 'Access-Control-Allow-Origin', 'admin API must support configured CORS'],
    [$admin, "if((\$_SERVER['REQUEST_METHOD']??'GET')==='OPTIONS')", 'admin API must handle preflight before authentication'],
    [$migration, 'idx_submission_rate(user_id,created_at)', 'rate-limit query needs a matching index'],
];

foreach ($contracts as [$source, $needle, $description]) {
    if (!str_contains($source, $needle)) {
        fwrite(STDERR, "Contract failed: $description\n");
        exit(1);
    }
}

echo "Workflow contract tests passed\n";
